import { Component } from 'react';
import './LevelOne.css';
import  Header  from '../../components/Header';
import Tablero from '../../components/Tablero';
import construirBaraja from '../LevelOne/Construir_Baraja'


class LevelTwo extends Component {
  constructor(props) {
    super(props);
    this.state = getEstadoInicial();
  }

  seleccionarCarta(carta) {
    if (
      this.state.estaComparando ||
      this.state.parejaSeleccionada.indexOf(carta) > -1 ||
      carta.fueAdivinada
    ) {
      return;
    }
    const parejaSeleccionada = [...this.state.parejaSeleccionada, carta];
    this.setState({
      parejaSeleccionada
    })

    if (parejaSeleccionada.length === 2) {
      this.compararPareja(parejaSeleccionada);
      console.log(parejaSeleccionada)
    }
  }
  compararPareja(parejaSeleccionada) {
    this.setState({estaComparando: true});

    setTimeout(() => {
      const [primeraCarta, segundaCarta] = parejaSeleccionada;
      let baraja = this.state.baraja;

      if (primeraCarta.icono === segundaCarta.icono) {
        baraja = baraja.map((carta) => {
          if (carta.icono !== primeraCarta.icono) {
            return carta;
          }

          return {...carta, fueAdivinada: true};
        });
      }

      this.verificarSiHayGanador(baraja);
      this.setState({
        parejaSeleccionada: [],
        baraja,
        estaComparando: false,
        numeroDeIntentos: this.state.numeroDeIntentos - 1
      })
    }, 1000)
  }

  verificarSiHayGanador(baraja) {
    if (
      baraja.filter((carta) => !carta.fueAdivinada).length === 0
    ) {
      alert(`Ganaste en ${this.state.numeroDeIntentos} intentos!`);
    }
  }

  resetearPartida() {
    this.setState(
      getEstadoInicial()
    );
  }

  render() {
    return (
      <div className="App">
        <Header
          numeroDeIntentos={this.state.numeroDeIntentos}
          resetearPartida={() => this.resetearPartida()}
        />
        <Tablero
          baraja={this.state.baraja}
          parejaSeleccionada={this.state.parejaSeleccionada}
          seleccionarCarta={(carta) => this.seleccionarCarta(carta)}
        />
      </div>
    );
  }
}

const getEstadoInicial = () => {
    const baraja = construirBaraja();
    return {
      baraja,
      parejaSeleccionada: [],
      estaComparando: false,
      numeroDeIntentos: 15
    };
  }
  
export default LevelTwo;



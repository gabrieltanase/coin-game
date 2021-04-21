import React, { Component } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// STYLES
import './App.css';

// CONSTANTS
import { COINS, STATUS } from './constants/coin';

// CHILD COMPONENTS
import SetupGame from './components/SetupGame';
import CoinsContainer from './components/CoinsContainer';
import DropBox from './components/DropBox';
import Message from './components/Message';
import RestartGame from './components/RestartGame';

class App extends Component {
  constructor(props) {
    super(props);
    this.setGameValues = this.setGameValues.bind(this);
    this.generateCoins = this.generateCoins.bind(this);
    this.handleOnDrop = this.handleOnDrop.bind(this);
    this.checkForWin = this.checkForWin.bind(this);
    this.restartGame = this.restartGame.bind(this);

    this.state = {
      startGame: false,
      startingCoins: 0,
      requiredValue: 0,
      availableCoins: [],
      dropedCoins: [],
      message: ''
    };

  }

  coins = COINS;
  status = STATUS;

  setGameValues(values) {
    if (!values) {
      return;
    }
    this.setState({
      ...values,
      startGame: true,
      availableCoins: this.generateCoins(values.startingCoins)
    });
  }

  restartGame() {
    const gameInit = {
      startGame: false,
      startingCoins: 0,
      requiredValue: 0,
      availableCoins: [],
      dropedCoins: [],
      message: ''
    }
    this.setState({
      ...gameInit
    })
  }

  /**
   * 
   * @param {number} amount - number of coins to be generated
   * @returns {Array} Collection of coins items
   */
  generateCoins(amount) {
    const min = Math.ceil(0),
      max = Math.floor(this.coins.length - 1),
      coinsSet = [];

    for (let i = 0; i < amount; i++) {
      const coinIdx = Math.floor(Math.random() * (max - min + 1) + min);
      coinsSet.push(
        {
          ...this.coins[coinIdx],
          id: i + 1
        }
      );
    }
    return coinsSet;
  }

  handleOnDrop(id) {
    // find the choosed coin in the available coins collection
    const coin = this.state.availableCoins.filter((coin, i) => coin.id === id);
    // update the state 
    this.setState({
      availableCoins: this.state.availableCoins.filter((c, i) => c.id !== id),
      dropedCoins: this.state.dropedCoins.filter((c, i) => c.id !== id).concat(coin[0])
    });
    // calculate the total value of droped coins and check for win
    let totalValue = this.calculateTotalValue(this.state.dropedCoins);
    this.checkForWin(totalValue);
  }

  /**
   * Calulates the total value of coins collection
   * @param {Array} coins - collection of coins items
   * @returns {number} - total value 
   */
  calculateTotalValue(coins) {
    let totalValue = 0;
    coins.forEach(coin => {
      totalValue = totalValue + coin.value
    });

    return totalValue;
  }

  /**
   * Checks for the win condition and sets the final messages 
   * @param {number} value - the required value to check agains
   */
  checkForWin(value) {
    const reqValue = Number(this.state.requiredValue);
    if (value > reqValue) {
      this.setState({
        message: 'Oops! Too many coins :)',
        startGame: false
      })
      return;
    }

    if (value === reqValue) {
      this.setState({ message: 'Congrats!! Your math is great!' })
    }

    if (this.state.availableCoins.length === 0) {
      this.setState({ message: ':( No more coins left, Try again!' })
    }
  }

  render() {
    let gameInit, message, restartBtn;
    if (!this.state.startGame && !this.state.message) {
      gameInit = <SetupGame onSubmit={this.setGameValues} />
    }

    if (this.state.message) {
      message = <Message message={this.state.message} />
      restartBtn = <RestartGame handleOnClick={this.restartGame} />
    }

    return (
      <div className="container my-5">
        <DndProvider backend={HTML5Backend}>
          <div className="row mb-5">
            <CoinsContainer coins={this.state.availableCoins} />
            <DropBox
              requiredValue={this.state.requiredValue}
              coins={this.state.dropedCoins}
              onDrop={this.handleOnDrop}
            />
          </div>
        </DndProvider>
        {gameInit}
        {message}
        {restartBtn}
      </div>
    );
  }
}

export default App;

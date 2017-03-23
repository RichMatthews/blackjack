import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Deck from '../deck/index';
import Player from '../participants/index';
import Dealer from '../participants/index';
import _ from 'underscore';
import './index.scss';
require('es6-promise').polyfill();
require('isomorphic-fetch');

class Blackjack extends React.Component{

  constructor(props) {
    super(props);
    this.props.Deck.shuffle();
    this.state = {
      deck: this.props.Deck,
      player: this.props.Player,
      dealer: this.props.Dealer,
      resultOutcome: '',
      revealCards: false,
      startGameButtonDisabled: false
    }
  }

  dealToPlayer = () => {
    this.state.player.addToHand(this.state.deck.take());
    this.forceUpdate();
  }

  dealToDealer = () => {
    this.state.dealer.addToHand(this.state.deck.take());
    this.forceUpdate();
  }

  doesHandHaveAce = () => {
    this.state.player.hand.forEach(function(card){
      if (card.rankKey == 'A' && this.state.player.handTotal() > 11){
        this.state.player.handTotal() - 10;
      }
    });
  };

  handleClickStick = () => {
    this.dealerTwisted();
  };

  handleClickTwist = () => {
    this.dealToPlayer();
    this.playerTwisted();
  };

  playerTwisted = () => {
    if(this.state.player.handTotal() > 21){
      this.setState({resultOutcome: 'dealer wins!'});
      this.revealCards();
    }
  };

  revealCards = () => {
    this.setState({revealCards: true});
  }

  whoWon = (dealer, player) => {
    let outcome = '';
    if (dealer >  21){
      outcome = 'player wins!'
    }
    else if(dealer > player){
      outcome = 'dealer wins!';
    }
    else if (dealer == player){
      outcome = 'tie!';
    }
    else if (dealer < player){
      outcome = 'player wins!';
    }
    this.setState({resultOutcome: outcome});
  }

  dealerTwisted = () => {
    let dealer = this.state.dealer;
    let player = this.state.player;
    while(dealer.handTotal() < 17){
      this.dealToDealer();
    }
    this.whoWon(dealer.handTotal(), player.handTotal());
    this.revealCards();
  };

  startGame = () => {
    setTimeout(()=>{this.dealToPlayer();}, 500);
    setTimeout(()=>{this.dealToDealer();}, 1000);
    setTimeout(()=>{this.dealToPlayer();}, 1500);
    setTimeout(()=>{this.dealToDealer();}, 2000);
    this.setState({startGameButtonDisabled: true});
  }

  render(){
    return (
      <div>
          <button onClick={this.handleClickStick.bind(this)}>Stick</button>
          <button onClick={this.handleClickTwist.bind(this)}>Twist</button>
          <button onClick={this.startGame.bind(this)} disabled={this.state.startGameButtonDisabled}>Start Game</button>
          <br />
          Cards Left : {this.props.Deck.cards.length}
          <br />
          <span id="outcome"> {this.state.resultOutcome} </span>
          <br />
          <p className="participants" > Player: </p>
            <div>
              {this.state.player.hand.map(function(card, index){
                  if (card.suit == 'D' || card.suit == 'H'){
                    return <div className="cardFormatDH" key={ index }> {card.rank}{card.suit} </div>;
                  }
                  else if (card.suit == 'C' || card.suit == 'S'){
                    return <div className="cardFormatCS" key={ index }> {card.rank}{card.suit} </div>;
                  }
              }, this)}
              <span id="scores"> {this.state.player.handTotal()} </span>
            </div>
        <br />
          <div>
              <div>
              <p className="participants" > Dealer: </p>
              {this.state.dealer.hand.map(function(card, index){
                if (index == 1){
                  if (this.state.revealCards === true){
                    return <div className="cardFormatDH" key={ index }> {card.rank}{card.suit} </div>;
                    <span id="scores"> {this.state.dealer.handTotal()} </span>
                  }
                  else {
                    return <div className="cardFormatCS" key={ index }> {'-'}{'-'} </div>;
                  }
                }
                else{
                  if (card.suit == 'D' || card.suit == 'H'){
                    return <div className="cardFormatDH" key={ index }> {card.rank}{card.suit} </div>;
                  }
                  else if (card.suit == 'C' || card.suit == 'S'){
                    return <div className="cardFormatCS" key={ index }> {card.rank}{card.suit} </div>;
                  }
                }
              }, this)}
        </div>
     </div>
  </div>
  )
 }
};

  ReactDOM.render(
    <Blackjack Deck={new Deck()} Player={new Player()} Dealer={new Dealer()}/>, document.getElementById('content')
  );

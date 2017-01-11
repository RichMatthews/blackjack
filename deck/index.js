import React from 'react';
import _ from 'underscore';
import './index.scss';
require('es6-promise').polyfill();

export default class Deck extends React.Component{

  constructor() {
    super();
    this.state = {
      capturedDeck: this.shuffleDeck(),
      playersDeck: [],
      dealersDeck: []
    }
  }

  buildDeck = () => {
    let suit = ['C', 'D', 'H', 'S'];
    let rank = {
      'A': {
        aceOne: 1,
        aceEleven: 11
      },
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      '10': 10,
      'J': 10,
      'Q': 10,
      'K': 10
    };
    let deck = [];
    Object.keys(rank).forEach(function(key) {
        for (var k=0; k < suit.length; k++){
          deck.push({ rankKey: key, rankValue: rank[key], suit: suit[k]})
        }
    });
    return deck;
  }

  shuffleDeck = () => {
    return _.shuffle(this.buildDeck());
  }

  removeCardsFromDeck = () => {
    this.state.capturedDeck.shift();
  }

  render(){
    return (
  )
 }
};

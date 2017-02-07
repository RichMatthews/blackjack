import _ from 'underscore';

class Card {
  constructor(rank, rankValue, suit) {
    this.rank = rank;
    this.rankValue = rankValue;
    this.suit = suit;
  }

  value = () => {
    return this.rankValue[0];
  }
}

export default class Deck {

  constructor(){
    this.cards = this.buildDeck();
  }

  buildDeck = () => {
    let suit = ['C', 'D', 'H', 'S'];
    let rank = {
      'A': [11,1],
      '2': [2],
      '3': [3],
      '4': [4],
      '5': [5],
      '6': [6],
      '7': [7],
      '8': [8],
      '9': [9],
      '10': [10],
      'J': [10],
      'Q': [10],
      'K': [10]
    };
    let deck = [];
    Object.keys(rank).forEach(function(key) {
        for (var k=0; k < suit.length; k++){
          deck.push(new Card(key, rank[key], suit[k]))
          // console.log(key, 'key*');
          // console.log(rank[key], 'rank*');
          // console.log(suit[k], 'suit*');
        }
    });
    return deck;
  }

  shuffle = () => {
    this.cards = _.shuffle(this.cards);
  }

  take = () => {
    return this.cards.shift();
  }
};

export default class Participants {

  constructor(){
    this.hand = [];
  }

  addToHand(card) {
    this.hand.push(card);
  }

  handTotal() {
    let total = 0;
    for (var i=0; i < this.hand.length; i++){
      total += this.hand[i].rankValue;
    }
    return total;
  }

};

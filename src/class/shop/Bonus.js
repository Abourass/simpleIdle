export default class Bonus {
  constructor(bonusTarget, bonusAmount, text, repetition) {
    this._bonusTarget = bonusTarget;
    this._bonusAmount = bonusAmount;
    this._text = text;
    this._repetition = repetition;
  }

  get bonus(){return this._bonusTarget}
  get amount(){return this._bonusAmount}
  get text(){return this._text}
  get repetition(){return this._repetition}
}

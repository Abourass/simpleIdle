export default class Position {
  constructor({title, salary, btnText, altText, requirements} = {}) {
    this._title = title;
    this._requirements = requirements;
    this._salary = salary;
    this._btnText = btnText;
    this._altText = altText;
  }
  get title() { return this._title }
  get requirements(){ return this._requirements}
  get salary(){ return this._salary}
  get btnText(){ return this._btnText; }
  get altText(){ return this._altText; }
}

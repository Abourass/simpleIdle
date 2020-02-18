export default class Item {
  constructor(title, id, bonusArray, requirement) {
    this.id = id;
    this.title = title;
    this.bonus = bonusArray;
    this.requirement = requirement;
  }
}

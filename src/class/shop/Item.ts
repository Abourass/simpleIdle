import Bonus from './Bonus.js';

export declare interface iRequirement {
  jobCategory: string,
  jobLevel: number,
  cost: number
}

export default class Item {
  title: string;
  id: string;
  bonus: Bonus[];
  requirement: iRequirement;

  constructor(title: string, id: string, bonusArray: Array<Bonus>, requirement: iRequirement) {
    this.title = title;
    this.id = id;
    this.bonus = bonusArray;
    this.requirement = requirement;
  }
}

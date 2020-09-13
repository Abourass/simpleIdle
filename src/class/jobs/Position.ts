export interface iPostion {
  title: string,
  salary: number,
  expPerClick: number,
  btnText: string,
  altText: string
  requirements: {
    int?: number,
    dex?: number,
    char?: number,
    perc?: number,
    karma?: number,
    creativity?: number,
  }
}

export default class Position {
  title: string;
  requirements: object;
  salary: number;
  expPerClick: number;
  btnText: string;
  altText: string;
  level: number;

  constructor({title, salary, expPerClick, btnText, altText, requirements}: iPostion) {
    this.title = title;
    this.requirements = requirements;
    this.salary = salary;
    this.expPerClick = expPerClick;
    this.btnText = btnText;
    this.altText = altText;
    this.level = 0
  }
}

class JobLevel {
  constructor(expRequirement) {
    this.requirements = expRequirement;
    this._level = 1;
    this._points = 0;
    this._bonus = {salaryIncrease: 0}
  }
  get level(){ return this._level; }

  get points(){ return this._points; }
  set points(amount){
    this._points += amount;
    if (this.points >= this.requirements[this.level + 1].min){
      this._level += 1;
      this._bonus.salaryIncrease += this.requirements[this.level].addSalary;
      console.log('bonus', this._bonus)
    }
  }
  loadExp(experienceObj){
    console.log('expObj', experienceObj);
    this.requirements = experienceObj.requirements;
    this._level = experienceObj._level;
    this._points = experienceObj._points;
    this._bonus = experienceObj._bonus;
  }
}

class Job {
  constructor(title, category, requirements, salary, btnText, altText, expRequirements) {
    this.title = title;
    this.category = category;
    this.requirements = requirements;
    this.salary = salary;
    this.btnText = btnText;
    this.altText = altText;
    this.experience = new JobLevel(expRequirements);
  }

  addExp(amountToIncreaseBy){
    const lvlWas = this.experience.level;
    this.experience.points = amountToIncreaseBy;
    document.getElementById('jobExp').innerText = this.experience.points;
    if (this.experience.level > lvlWas){
      this.salary += this.experience.requirements[this.experience.level].addSalary;
      document.getElementById('jobControl').innerText = `${this.btnText} - $${this.salary}`;
      document.getElementById('jobLvl').innerText = this.experience.level;
    }
  }

  loadExp(expObj){ this.experience.loadExp(expObj); this.salary += this.experience._bonus.salaryIncrease; }
}

const expReq = {
  1: {min: 0},
  2: {min: 100, addSalary: 1},
  3: {min: 240, addSalary: 1},
  4: {min: 1000, addSalary: 1}
};

const listOfJobs = () => [
  new Job('Fry Cook', 'food', {int: 3, dex: 3, char: 3, perc: 3}, 1, 'Flip Burgers', 'Get greasy', expReq),
  new Job('Barista', 'food', {int: 3, dex: 4, char: 4, perc: 3}, 1, 'Brew Coffee', 'Get steamy', expReq),
  new Job('Bank Teller', 'service', {int: 3, dex: 3, char: 5, perc: 3}, 2, 'Handle Money', 'Paper Cuts are a real worry', expReq),
  new Job('Shoplifter', 'crime', {int: 3, dex: 5, char: 3, perc: 4}, 2, 'Steal pokemon cards', 'This can\'t be a great idea', expReq),
  new Job('Youtube Blogger', 'fame', {int: 3, dex: 3, char: 6, perc: 3}, 2, 'Vlog', 'This is somehow a job now', expReq),
  new Job('Code Monkey', 'computer', {int: 5, dex: 3, char: 3, perc: 3}, 2, 'Slam Keyboard', 'Crush your imagination', expReq),
  new Job('Freelance Coder', 'computer', {int: 6, dex: 3, char: 3, perc: 3}, 3, 'Code Idle Games', 'Make those numbers go up', expReq),
];
export default listOfJobs;

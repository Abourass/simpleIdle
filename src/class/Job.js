class JobLevel {
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

class Job {
  constructor({title, requirements, salary, btnText, altText, expRequirements} = {}) {
    this.title = title;
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

class JobPath{
  constructor({category} = {}) {
    this._category = category;
    this._levels = [];
    this._curLevel = 'none';
    this._exp = 0;
  }

  get category(){ return this._category }

  addLevel(arrayOfJobLevel, jobLevel){
    this._levels.push({number: jobLevel, levels: arrayOfJobLevel})
  }

  addExp(amountToIncreaseBy){
    let amountToMax = this._levels.filter(level => level._title === this._curLevel)[0].requirements.maxExp - this._exp;
    if (amountToIncreaseBy <= amountToMax){
      this._exp += amountToIncreaseBy;
      amountToMax = this._levels.filter(level => level._title === this._curLevel)[0].requirements.maxExp - this._exp
    } else {
      this._exp += amountToMax;
      amountToMax = 0;
    }

    document.getElementById('jobExp').innerText = this._exp;

    if (amountToMax === 0){
      // loadPotentialJobs
    }
  }

  openJobs(stats){
    return this._levels.filter(careerLevel => careerLevel.levels.filter(level =>
      level.requirements.int <= stats.int
      && level.requirements.dex <= stats.dex
      && level.requirements.char <= stats.char
      && level.requirements.perc <= stats.perc));
  }
}

const computerPath = new JobPath({category: 'computer'});
computerPath.addLevel([
  new JobLevel({title: 'Code Monkey', salary: 1, btnText: 'Slam Keyboard', altText: 'Crush your imagination', requirements: {int: 5, dex: 3, char: 3, perc: 3, minExp: 0, maxExp: 200}}),
  new JobLevel({title: 'Freelance Coder', salary: 2, btnText: 'Code Idle Games', altText: 'Make those numbers go up', requirements: {int: 6, dex: 3, char: 3, perc: 3, minExp: 0, maxExp: 200}})
], 0);

const foodPath = new JobPath({category: 'food'});
foodPath.addLevel([
  new JobLevel({title: 'Fry Cook', salary: 1, btnText: 'Flip Burgers', altText: 'Get greasy', requirements: {int: 3, dex: 3, char: 3, perc: 3, minExp: 0, maxExp: 200}}),
  new JobLevel({title: 'Barista', salary: 1, btnText: 'Brew Coffee', altText: 'Get steamy', requirements: {int: 3, dex: 4, char: 4, perc: 3, minExp: 0, maxExp: 200}})
], 0);

const famePath = new JobPath({category: 'fame'});
famePath.addLevel([
  new JobLevel({title: 'Youtube Blogger', salary: 1, btnText: 'Vlog', altText: 'This is somehow a job now', requirements: {int: 3, dex: 3, char: 6, perc: 3, minExp: 0, maxExp: 200}})
], 0);

const servicePath = new JobPath({category: 'service'});
servicePath.addLevel([
  new JobLevel({title: 'Bank Teller', salary: 1, btnText: 'Handle Money', altText: 'Paper Cuts are a real worry', requirements: {int: 3, dex: 3, char: 5, perc: 3, minExp: 0, maxExp: 200}})
], 0);

const crimePath = new JobPath({category: 'crime'});
crimePath.addLevel([
  new JobLevel({title: 'Shoplifter', salary: 1, btnText: 'Steal pokemon cards', altText: 'This can\'t be a great idea', requirements: {int: 3, dex: 5, char: 3, perc: 4, minExp: 0, maxExp: 200}})
], 0);

const listOfJobPaths = (stats) => {
  const paths = [];

  if (computerPath.openJobs(stats)[0].levels.filter(lvl => lvl.requirements.int <= stats.int && lvl.requirements.dex <= stats.dex && lvl.requirements.char <= stats.char && lvl.requirements.perc <= stats.perc).length >= 1){
    paths.push({computer: computerPath.openJobs(stats)[0].levels.filter(lvl => lvl.requirements.int <= stats.int && lvl.requirements.dex <= stats.dex && lvl.requirements.char <= stats.char && lvl.requirements.perc <= stats.perc)})
  }

  if (foodPath.openJobs(stats)[0].levels.filter(lvl => lvl.requirements.int <= stats.int && lvl.requirements.dex <= stats.dex && lvl.requirements.char <= stats.char && lvl.requirements.perc <= stats.perc).length >= 1){
    paths.push({computer: foodPath.openJobs(stats)[0].levels.filter(lvl => lvl.requirements.int <= stats.int && lvl.requirements.dex <= stats.dex && lvl.requirements.char <= stats.char && lvl.requirements.perc <= stats.perc)})
  }

  if (famePath.openJobs(stats)[0].levels.filter(lvl => lvl.requirements.int <= stats.int && lvl.requirements.dex <= stats.dex && lvl.requirements.char <= stats.char && lvl.requirements.perc <= stats.perc).length >= 1){
    paths.push({computer: famePath.openJobs(stats)[0].levels.filter(lvl => lvl.requirements.int <= stats.int && lvl.requirements.dex <= stats.dex && lvl.requirements.char <= stats.char && lvl.requirements.perc <= stats.perc)})
  }

  if (servicePath.openJobs(stats)[0].levels.filter(lvl => lvl.requirements.int <= stats.int && lvl.requirements.dex <= stats.dex && lvl.requirements.char <= stats.char && lvl.requirements.perc <= stats.perc).length >= 1){
    paths.push({computer: servicePath.openJobs(stats)[0].levels.filter(lvl => lvl.requirements.int <= stats.int && lvl.requirements.dex <= stats.dex && lvl.requirements.char <= stats.char && lvl.requirements.perc <= stats.perc)})
  }

  if (crimePath.openJobs(stats)[0].levels.filter(lvl => lvl.requirements.int <= stats.int && lvl.requirements.dex <= stats.dex && lvl.requirements.char <= stats.char && lvl.requirements.perc <= stats.perc).length >= 1){
    paths.push({computer: crimePath.openJobs(stats)[0].levels.filter(lvl => lvl.requirements.int <= stats.int && lvl.requirements.dex <= stats.dex && lvl.requirements.char <= stats.char && lvl.requirements.perc <= stats.perc)})
  }

  return paths;
};

export default listOfJobPaths;

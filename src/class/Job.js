class Position {
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
  constructor({category, levelsWithExpRequirements} = {}) {
    this._category = category;
    this._levels = levelsWithExpRequirements;
    this._curLevel = 'none';
    this._curPosition = 'none';
    this._exp = 0;
  }

  get category(){ return this._category }
  get levels(){ return this._levels }
  get currentLevel(){ return this._curLevel }
  get currentPosition(){ return this._curPosition }
  get experience() {return this._exp }

  addPositions(arrayOfPositions, jobLevel){
    this._levels[jobLevel].positions = arrayOfPositions;
  }

  addExp(amountToIncreaseBy){
    let amountToMax = this.levels[this.currentLevel].maxExp - this._exp;
    if (amountToIncreaseBy <= amountToMax){
      this._exp += amountToIncreaseBy;
      amountToMax = this.levels[this.currentLevel].maxExp - this._exp
    } else {
      this._exp += amountToMax;
      amountToMax = 0;
    }

    document.getElementById('jobExp').innerText = this._exp;

    if (amountToMax === 0){
      // loadPotentialJobs
    }
  }


  openJobs(stats, firstRun = null) {
    let levels;
    if (firstRun){
      levels =  {
        [0]: this._levels[0].positions.filter(job => {
          Object.keys(job.requirements).forEach(req => {
            if (!stats[req]){ return false; }
            if (stats[req] < job.requirements[req]){ return false; }
          });
          return true;
        }),
        [1]: this._levels[1].positions.filter(job => {
          Object.keys(job.requirements).forEach(req => {
            if (!stats[req]){ return false; }
            if (stats[req] < job.requirements[req]){ return false; }
          });
          return true;
        })
      }
    } else {
      levels = {
        [this._curLevel]: this._levels[this._curLevel].positions.filter(job => {
          Object.keys(job.requirements).forEach(req => {
            if (!stats[req]){ return false; }
            if (stats[req] < job.requirements[req]){ return false; }
          });
          return true;
        }),
        [this._curLevel + 1]: this._levels[this._curLevel + 1].positions.filter(job => {
          Object.keys(job.requirements).forEach(req => {
            if (!stats[req]){ return false; }
            if (stats[req] < job.requirements[req]){ return false; }
          });
          return true;
        })
      }
    }
    return levels;
  }
}

const defaultLevelRequirements = {
  0: {minExp: 0, maxExp: 200, positions: []},
  1: {minExp: 200, maxExp: 500, positions: []},
  2: {minExp: 500, maxExp: 1200, positions: []},
};

const computerPath = new JobPath({category: 'computer', levelsWithExpRequirements: defaultLevelRequirements});
computerPath.addPositions([new Position({title: 'Freelance Coder', salary: 1, btnText: 'Code Idle Games', altText: 'Make those numbers go up', requirements: {int: 5, dex: 3, char: 3, perc: 3}})], 0);
computerPath.addPositions([new Position({title: 'Code Monkey', salary: 2, btnText: 'Code Login Page', altText: 'Crush your imagination', requirements: {int: 6, dex: 3, char: 3, perc: 3}})], 1);
computerPath.addPositions([
  new Position({title: 'Jr. Front End Dev', salary: 3, btnText: 'Make divs', altText: 'Use your imagination... on business UI..', requirements: {int: 6, dex: 3, char: 3, perc: 3, creativity: 10}}),
  new Position({title: 'Jr. Back End Dev', salary: 3, btnText: 'Make database schema', altText: '{firstName: String}', requirements: {int: 7, dex: 3, char: 3, perc: 4}}),
], 2);

const foodPath = new JobPath({category: 'food', levelsWithExpRequirements: defaultLevelRequirements});
foodPath.addPositions([
  new Position({title: 'Fry Cook', salary: 1, btnText: 'Flip Burgers', altText: 'Get greasy', requirements: {int: 3, dex: 3, char: 3, perc: 3}}),
  new Position({title: 'Barista', salary: 1, btnText: 'Brew Coffee', altText: 'Get steamy', requirements: {int: 3, dex: 4, char: 4, perc: 3}})
], 0);

const famePath = new JobPath({category: 'fame', levelsWithExpRequirements: defaultLevelRequirements});
famePath.addPositions([new Position({title: 'Video Game Streamer', salary: 1, btnText: 'Play Super Mario Odyssey', altText: 'It\'sa me.. carpal tunnel', requirements: {int: 3, dex: 3, char: 6, perc: 3}})], 0);
famePath.addPositions([new Position({title: 'Make a speedrunning series', salary: 2, btnText: 'Go fast', altText: 'Don\'t forget to use the bounce hack', requirements: {int: 3, dex: 3, char: 7, perc: 3}})], 1);

const servicePath = new JobPath({category: 'service', levelsWithExpRequirements: defaultLevelRequirements});
servicePath.addPositions([
  new Position({title: 'Bank Teller', salary: 1, btnText: 'Handle Money', altText: 'Paper Cuts are a real worry', requirements: {int: 3, dex: 3, char: 5, perc: 3}})
], 0);

const crimePath = new JobPath({category: 'crime', levelsWithExpRequirements: defaultLevelRequirements});
crimePath.addPositions([
  new Position({title: 'Shoplifter', salary: 1, btnText: 'Steal pokemon cards', altText: 'This can\'t be a great idea', requirements: {int: 3, dex: 5, char: 3, perc: 4}})
], 0);

export const listOfJobPaths = (stats) => {
  const paths = [];

  if (computerPath.openJobs(stats)[0].levels.filter(lvl => lvl.requirements.int <= stats.int && lvl.requirements.dex <= stats.dex && lvl.requirements.char <= stats.char && lvl.requirements.perc <= stats.perc).length >= 1){
    paths.push({computer: computerPath.openJobs(stats)[0].levels.filter(lvl => lvl.requirements.int <= stats.int && lvl.requirements.dex <= stats.dex && lvl.requirements.char <= stats.char && lvl.requirements.perc <= stats.perc)})
  }

  if (foodPath.openJobs(stats)[0].levels.filter(lvl => lvl.requirements.int <= stats.int && lvl.requirements.dex <= stats.dex && lvl.requirements.char <= stats.char && lvl.requirements.perc <= stats.perc).length >= 1){
    paths.push({food: foodPath.openJobs(stats)[0].levels.filter(lvl => lvl.requirements.int <= stats.int && lvl.requirements.dex <= stats.dex && lvl.requirements.char <= stats.char && lvl.requirements.perc <= stats.perc)})
  }

  if (famePath.openJobs(stats)[0].levels.filter(lvl => lvl.requirements.int <= stats.int && lvl.requirements.dex <= stats.dex && lvl.requirements.char <= stats.char && lvl.requirements.perc <= stats.perc).length >= 1){
    paths.push({fame: famePath.openJobs(stats)[0].levels.filter(lvl => lvl.requirements.int <= stats.int && lvl.requirements.dex <= stats.dex && lvl.requirements.char <= stats.char && lvl.requirements.perc <= stats.perc)})
  }

  if (servicePath.openJobs(stats)[0].levels.filter(lvl => lvl.requirements.int <= stats.int && lvl.requirements.dex <= stats.dex && lvl.requirements.char <= stats.char && lvl.requirements.perc <= stats.perc).length >= 1){
    paths.push({service: servicePath.openJobs(stats)[0].levels.filter(lvl => lvl.requirements.int <= stats.int && lvl.requirements.dex <= stats.dex && lvl.requirements.char <= stats.char && lvl.requirements.perc <= stats.perc)})
  }

  if (crimePath.openJobs(stats)[0].levels.filter(lvl => lvl.requirements.int <= stats.int && lvl.requirements.dex <= stats.dex && lvl.requirements.char <= stats.char && lvl.requirements.perc <= stats.perc).length >= 1){
    paths.push({crime: crimePath.openJobs(stats)[0].levels.filter(lvl => lvl.requirements.int <= stats.int && lvl.requirements.dex <= stats.dex && lvl.requirements.char <= stats.char && lvl.requirements.perc <= stats.perc)})
  }

  return paths;
};

export const listOfInitialJobPaths = (stats) => {
  const paths = [];

  const compJobs = computerPath.openJobs(stats, true);
  const foodJobs = foodPath.openJobs(stats, true);
  const fameJobs = famePath.openJobs(stats, true);
  const serviceJobs = servicePath.openJobs(stats, true);
  const crimeJobs = crimePath.openJobs(stats, true);

  if (compJobs[0].positions.length >= 1){ paths.push({computer: {0: compJobs[0].positions}}) }
  if (foodJobs[0].position.length >= 1){ paths.push({food: {0: foodJobs[0].positions}}) }
  if (fameJobs[0].position.length >= 1){ paths.push({fame: {0: fameJobs[0].positions}}) }
  if (serviceJobs[0].position.length >= 1){ paths.push({service: {0: serviceJobs[0].positions}}) }
  if (crimeJobs[0].position.length >= 1){ paths.push({crime: {0: crimeJobs[0].positions}}) }

  return paths;
};

export default {listOfJobPaths, listOfInitialJobPaths};

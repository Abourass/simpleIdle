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
    arrayOfPositions.forEach(pos => this._levels[jobLevel].positions.push(pos))
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
        0: [],
        1: []
      };

      this.levels[0].positions.forEach(job => {
        Object.keys(job.requirements).forEach(req => {
          if (stats[req]){ return false; }
          console.log(job, `${req}`, job.requirements[req], 'you', stats[req]);
          if (stats[req] < job.requirements[req]){ console.log('you fail', 'job'); return false; }
        });
       return levels[0].push(job);
      });
      this._levels[1].positions.filter(job => {
        Object.keys(job.requirements).forEach(req => {
          if (!stats[req]){ return false; }
          if (stats[req] < job.requirements[req]){ return false; }
        });
        return levels[1].push(job);
      });
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

const computerPath = new JobPath({category: 'computer', levelsWithExpRequirements: {
    0: {minExp: 0, maxExp: 200, positions: []},
    1: {minExp: 200, maxExp: 500, positions: []},
    2: {minExp: 500, maxExp: 1200, positions: []},
  }});
computerPath.addPositions([new Position({title: 'Freelance Coder', salary: 1, btnText: 'Code Idle Games', altText: 'Make those numbers go up', requirements: {int: 5, dex: 3, char: 3, perc: 3}})], 0);
computerPath.addPositions([new Position({title: 'Code Monkey', salary: 2, btnText: 'Code Login Page', altText: 'Crush your imagination', requirements: {int: 6, dex: 3, char: 3, perc: 3}})], 1);
computerPath.addPositions([
  new Position({title: 'Jr. Front End Dev', salary: 3, btnText: 'Make divs', altText: 'Use your imagination... on business UI..', requirements: {int: 6, dex: 3, char: 3, perc: 3, creativity: 10}}),
  new Position({title: 'Jr. Back End Dev', salary: 3, btnText: 'Make database schema', altText: '{firstName: String}', requirements: {int: 7, dex: 3, char: 3, perc: 4}}),
], 2);

const foodPath = new JobPath({category: 'food', levelsWithExpRequirements: {
    0: {minExp: 0, maxExp: 200, positions: []},
    1: {minExp: 200, maxExp: 500, positions: []},
    2: {minExp: 500, maxExp: 1200, positions: []},
  }});
foodPath.addPositions([
  new Position({title: 'Fry Cook', salary: 1, btnText: 'Flip Burgers', altText: 'Get greasy', requirements: {int: 3, dex: 3, char: 3, perc: 3}}),
  new Position({title: 'Barista', salary: 1, btnText: 'Brew Coffee', altText: 'Get steamy', requirements: {int: 3, dex: 4, char: 4, perc: 3}})
], 0);

const famePath = new JobPath({category: 'fame', levelsWithExpRequirements: {
    0: {minExp: 0, maxExp: 200, positions: []},
    1: {minExp: 200, maxExp: 500, positions: []},
    2: {minExp: 500, maxExp: 1200, positions: []},
  }});
famePath.addPositions([new Position({title: 'Video Game Streamer', salary: 1, btnText: 'Play Super Mario Odyssey', altText: 'It\'sa me.. carpal tunnel', requirements: {int: 3, dex: 3, char: 6, perc: 3}})], 0);
famePath.addPositions([new Position({title: 'Make a speedrunning series', salary: 2, btnText: 'Go fast', altText: 'Don\'t forget to use the bounce hack', requirements: {int: 3, dex: 3, char: 7, perc: 3}})], 1);

const servicePath = new JobPath({category: 'service', levelsWithExpRequirements: {
    0: {minExp: 0, maxExp: 200, positions: []},
    1: {minExp: 200, maxExp: 500, positions: []},
    2: {minExp: 500, maxExp: 1200, positions: []},
  }});
servicePath.addPositions([
  new Position({title: 'Bank Teller', salary: 1, btnText: 'Handle Money', altText: 'Paper Cuts are a real worry', requirements: {int: 3, dex: 3, char: 5, perc: 3}})
], 0);

const crimePath = new JobPath({category: 'crime', levelsWithExpRequirements: {
    0: {minExp: 0, maxExp: 200, positions: []},
    1: {minExp: 200, maxExp: 500, positions: []},
    2: {minExp: 500, maxExp: 1200, positions: []},
  }});
crimePath.addPositions([
  new Position({title: 'Shoplifter', salary: 1, btnText: 'Steal pokemon cards', altText: 'This can\'t be a great idea', requirements: {int: 3, dex: 5, char: 3, perc: 4}})
], 0);

const listOfJobPaths = (stats, firstRun = null) => {
  const paths = [];

  const compJobs = computerPath.openJobs(stats, (firstRun == null ? null : true));
  const foodJobs = foodPath.openJobs(stats, (firstRun == null ? null : true));
  const fameJobs = famePath.openJobs(stats, (firstRun == null ? null : true));
  const serviceJobs = servicePath.openJobs(stats, (firstRun == null ? null : true));
  const crimeJobs = crimePath.openJobs(stats, (firstRun == null ? null : true));

  if (compJobs[firstRun == null ? Object.keys(compJobs)[0] : 0].length >= 1){ paths.push({computer: compJobs}) }
  if (foodJobs[firstRun == null ? Object.keys(foodJobs)[0] : 0].length >= 1){ paths.push({food: foodJobs}) }
  if (fameJobs[firstRun == null ? Object.keys(fameJobs)[0] : 0].length >= 1){ paths.push({fame: fameJobs}) }
  if (serviceJobs[firstRun == null ? Object.keys(serviceJobs)[0] : 0].length >= 1){ paths.push({service: serviceJobs}) }
  if (crimeJobs[firstRun == null ? Object.keys(crimeJobs)[0] : 0].length >= 1){ paths.push({crime: crimeJobs}) }
  return paths
};

export default listOfJobPaths;

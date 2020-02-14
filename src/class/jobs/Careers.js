import JobPath from './JobPath.js';
import Position from './Position.js';

class Careers{
  constructor(paths) {
    this._paths = paths;
    this._currentPath = 'none';
  }

  get paths(){return this._paths}
  get currentPath(){ return this._currentPath}
  get currentPosition(){return this._currentPath._curPosition}
  get currentLevel(){return this._currentPath._curLevel}


  listOfJobPaths = (stats, firstRun = null) => {
    const paths = [];

    const compJobs = this._paths.computerPath.openJobs(stats, (firstRun == null ? null : true));
    const foodJobs = this._paths.foodPath.openJobs(stats, (firstRun == null ? null : true));
    const fameJobs = this._paths.famePath.openJobs(stats, (firstRun == null ? null : true));
    const serviceJobs = this._paths.servicePath.openJobs(stats, (firstRun == null ? null : true));
    const crimeJobs = this._paths.crimePath.openJobs(stats, (firstRun == null ? null : true));

    if (compJobs[firstRun == null ? Object.keys(compJobs)[0] : 0].length >= 1){ paths.push({computer: compJobs}) }
    if (foodJobs[firstRun == null ? Object.keys(foodJobs)[0] : 0].length >= 1){ paths.push({food: foodJobs}) }
    if (fameJobs[firstRun == null ? Object.keys(fameJobs)[0] : 0].length >= 1){ paths.push({fame: fameJobs}) }
    if (serviceJobs[firstRun == null ? Object.keys(serviceJobs)[0] : 0].length >= 1){ paths.push({service: serviceJobs}) }
    if (crimeJobs[firstRun == null ? Object.keys(crimeJobs)[0] : 0].length >= 1){ paths.push({crime: crimeJobs}) }
    return paths
  };

  searchPath(category){
    let path;
    switch (category){
      case 'computer': { path = this._paths.computerPath; break; }
      case 'food': { path = this._paths.foodPath; break; }
      case 'fame': { path = this._paths.famePath; break;}
      case 'service': { path = this._paths.servicePath; break; }
      case 'crime': { path = this._paths.crimePath; break; }
    }
    return path;
  };

  searchJobs(category, level, title){
    return this.searchPath(category)._levels[level].positions.filter(job => job.title === title)[0]
  };
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

export const careers = () => {
  const obj = {};
  obj.createNew = () => {
    return new Careers({
      computerPath: computerPath,
      foodPath: foodPath,
      famePath: famePath,
      servicePath: servicePath,
      crimePath: crimePath
    });
  };

  obj.load = (careers) => { return new Careers(careers) };

  return obj
};

export default careers;

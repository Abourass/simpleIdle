import {listJobs} from '../Actions.js';

export default class JobPath{
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

  addExp(amountToIncreaseBy, player){
    let amountToMax = this._levels[this._curLevel].maxExp - this._exp; // Calculate Exp needed to achieve next level
    let leftOverExp;
    if (amountToIncreaseBy <= amountToMax){ // Check if the amount we would increase by is less than what we need to hit the next level
      this._exp += amountToIncreaseBy;
      amountToMax = this._levels[this._curLevel].maxExp - this._exp;
    } else {
      leftOverExp = amountToIncreaseBy - amountToMax;
      this._exp += amountToMax;
      amountToMax = 0;
    }
    document.getElementById('jobExp').innerHTML = `<span style="text-transform:capitalize;">${player.careers.currentPath.category}</span> Exp - ${player.careers.currentPath._exp}`;
    if (amountToMax === 0){ listJobs(player) }
  }

  openJobs(stats) {
    let levels;
    let nextLvl;
    if (this._curLevel === 'none'){
      levels =  { 0: [] };
    } else {
      levels = { [this._curLevel]: [] };
      if (this._curLevel !== 'none'){
        nextLvl = parseInt(this._curLevel + 1, 10);
        levels[nextLvl] = [];
      }
    }

    this.levels[this._curLevel === 'none' ? 0 : this._curLevel].positions.forEach(job => {
      let canAdd = true;
      if (stats.jobTitle === job.title){ canAdd = false; }
      Object.keys(job.requirements).forEach(req => {
        if (!stats[req]){ canAdd = false; }
        if (stats[req] < job.requirements[req]){ canAdd = false; }
      });
      if (canAdd){
        levels[this._curLevel === 'none' ? 0 : this._curLevel].push(job);
        console.log(`Current Job Level => ${job._title} => canAdd was true so let's add ${job.title} to level[${this._curLevel === 'none' ? 0 : this._curLevel}]`);
        console.log('Levels currently looks like => ', levels);
      }
    });

    if (this._curLevel !== 'none' && this._exp === this._levels[nextLvl].minExp){
      this._levels[nextLvl].positions.filter(job => {
        let canAdd = true;
        if (stats.jobTitle === job.title){ canAdd = false; }
        Object.keys(job.requirements).forEach(req => {
          if (!stats[req]){ canAdd = false; }
          if (stats[req] < job.requirements[req]){ canAdd = false; }
        });
        if (canAdd){
          levels[nextLvl].push(job);
          console.log(`Next Job Level => ${job._title} => canAdd was true so let's add ${job.title} to level[${nextLvl}]`);
          console.log('Levels currently looks like => ', levels);
        }
      });
    }

    return levels;
  }
}

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
    document.getElementById('jobExp').innerText = this._exp;
    console.log('Exp now', this._exp);
    console.log('amountToMax now', amountToMax);

    if (amountToMax === 0){ listJobs(player) }
  }

  openJobs(stats) {
    let levels;
    if (this._curLevel === 'none'){
      levels =  { 0: [] };
    } else {
      levels = { [this._curLevel]: []}
    }

    this.levels[this._curLevel === 'none' ? 0 : this._curLevel].positions.forEach(job => {
      let canAdd = true;
      if (stats.jobTitle === job.title){ canAdd = false }
      Object.keys(job.requirements).forEach(req => {
        if (!stats[req]){ canAdd = false; }
        if (stats[req] < job.requirements[req]){ canAdd = false; }
      });
      if (canAdd){
        return levels[this._curLevel === 'none' ? 0 : this._curLevel].push(job)
      }
    });

    if (this._curLevel !== 'none'){
      let nextLvl = parseInt(this._curLevel + 1, 10);

      if (this._exp === this._levels[nextLvl].minExp){
        levels[nextLvl] = [];
        this._levels[nextLvl].positions.filter(job => {
          let canAdd = true;
          if (stats.jobTitle === job.title){ canAdd = false }
          Object.keys(job.requirements).forEach(req => {
            if (!stats[req]){ canAdd = false; }
            if (stats[req] < job.requirements[req]){ canAdd = false; }
          });
          if (canAdd){
            levels[nextLvl].push(job)
          }
        });
      }
    }

    return levels;
  }
}

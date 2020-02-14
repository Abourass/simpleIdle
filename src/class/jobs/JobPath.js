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

  addExp(amountToIncreaseBy){
    let amountToMax = this._levels[this._curLevel].maxExp - this._exp;
    if (amountToIncreaseBy <= amountToMax){
      this._exp += amountToIncreaseBy;
      amountToMax = this._levels[this._curLevel].maxExp - this._exp
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
      levels =  { 0: [] };
    } else {
      levels = { [this.currentLevel]: []}
    }
    this.levels[firstRun == null ? Object.keys(levels)[0] : 0].positions.forEach(job => {
      let canAdd = true;
      Object.keys(job.requirements).forEach(req => {
        if (!stats[req]){ canAdd = false; }
        if (stats[req] < job.requirements[req]){ canAdd = false; }
      });
      if (canAdd){
        return levels[firstRun == null ? Object.keys(levels)[0] : 0].push(job)
      }
    });

    if (this.currentLevel !== 'none' && this.experience >= this.levels[this.currentLevel + 1].requirements.minExp){
      firstRun == null ? levels[this.currentLevel + 1] = [] : levels[1] = [];
      this._levels[!firstRun ? Object.keys(levels)[1] : 1].positions.filter(job => {
        let canAdd = true;
        Object.keys(job.requirements).forEach(req => {
          if (!stats[req]){ canAdd = false; }
          if (stats[req] < job.requirements[req]){ canAdd = false; }
        });
        if (canAdd){
          levels[!firstRun ? Object.keys(levels)[1] : 1].push(job)
        }
      });
    }
    return levels;
  }
}

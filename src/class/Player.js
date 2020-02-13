import listOfJobs from './ListOfJobs.js';

class Player {
  constructor() {
    this._money = 0;
    this._health = 20;
    this._statPoints = 5;
    this._int = 3;
    this._dex = 3;
    this._char = 3;
    this._perc = 3;
    this._job = 'none';
  }

  get money(){ return this._money; }

  get health(){ return this._health; }

  get statPoints(){return this._statPoints}

  get int(){return this._int}

  get dex(){return this._dex}

  get char(){return this._char}

  get perc(){return this._perc}

  get job(){return this._job}

  update(prop, operation, amount){
    const property = `_${prop}`;
    operation === 'add' ? this[property] += amount : this[property] -= amount;
    document.getElementById(prop).innerText = this[property];
  }

  increaseStat(stat, fn){
    if (this.statPoints > 0){
      this.update('statPoints', 'sub', 1);
      this.update(stat, 'add', 1)
    } else {
      fn();
    }
  }

  chooseFirstJob(){
    const potentialJobs = listOfJobs().filter(job => job.requirements.int <= this.int && job.requirements.dex <= this.dex && job.requirements.char <= this.char && job.requirements.perc <= this.perc);
    document.getElementById('statPointBlock').style.display = 'none';

    let btnBlockHTML = '';

    potentialJobs.forEach(job => btnBlockHTML += ` <button class="btn button is-primary">${job.title} - ${job.salary}</button>`);

    document.getElementById('controls').innerHTML = btnBlockHTML;
  }

  init(){
    this.update('money', 'add', 0);
    this.update('health', 'add', 0);
    this.update('statPoints', 'add', 0);
    this.update('int', 'add', 0);
    this.update('dex', 'add', 0);
    this.update('char', 'add', 0);
    this.update('perc', 'add', 0);
    document.getElementById('controls').innerHTML = `
      <button class="btn button is-primary" id="incIntelligence">Increase Intelligence</button>
      <button class="btn button is-primary" id="incDexterity">Increase Dexterity</button>
      <button class="btn button is-primary" id="incCharisma">Increase Charisma</button>
      <button class="btn button is-primary" id="incPerception">Increase Perception</button>
    `;
    document.getElementById('incIntelligence').onclick = () => this.increaseStat('int', () => this.chooseFirstJob());
    document.getElementById('incDexterity').onclick = () => this.increaseStat('dex', () => this.chooseFirstJob());
    document.getElementById('incCharisma').onclick = () => this.increaseStat('char', () => this.chooseFirstJob());
    document.getElementById('incPerception').onclick = () => this.increaseStat('perc', () => this.chooseFirstJob());
  }
}

export default new Player();

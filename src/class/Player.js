import {listOfInitialJobPaths} from './Job.js';
import {chooseAJob} from './Actions.js'

class Player {
  constructor() {
    this._money = 0;
    this._health = 20;
    this._statPoints = 4;
    this._int = 3;
    this._dex = 3;
    this._char = 3;
    this._perc = 3;
    this._jobPath = 'none';
    this._karma = 50;
    this._creativity = 0;
    this._items = [];
    this.newTick = [];
  }

  get money(){ return this._money; }

  get health(){ return this._health; }

  get statPoints(){return this._statPoints}

  get int(){return this._int}

  get dex(){return this._dex}

  get char(){return this._char}

  get perc(){return this._perc}

  get jobPath(){return this._jobPath}

  get karma(){return this._karma}

  get creativity(){return this._creativity}

  get items(){return this._items}

  addItem(item){
    this._items.push(item);
    this.newTick.push({money: item.bonus.moneyPerSecond});
    console.log(item);
  }

  update(prop, operation, amount){
    const property = `_${prop}`;
    operation === 'add' ? this[property] += amount : this[property] -= amount;
    document.getElementById(prop).innerText = this[property];
  }

  increaseStat(stat, fn){
    if (this.statPoints > 0){
      this.update('statPoints', 'sub', 1);
      this.update(stat, 'add', 1);
      if (this.statPoints === 0){ fn() }
    }
  }

  addJobExp(amount){
    if (this.jobPath === 'none'){ return }
    this.jobPath.addExp(amount);
  }

  chooseFirstJob(){
    const potentialJobPaths = listOfInitialJobPaths({int: this.int, dex: this.dex, char: this.char, perc: this.perc, creativity: this.creativity});
    document.getElementById('statPointBlock').style.display = 'none';

    console.log(potentialJobPaths);
    let btnBlockHTML = '';

    potentialJobPaths.forEach(jobPath => {
      console.log(jobPath);
      const key = Object.keys(jobPath)[0];
      const jobs = jobPath[key];
      let btnMarkup = '';
      jobs.forEach(job => btnMarkup +=`<button class="button is-primary jobBtn" title="${job.altText}" data-job="${job.title}" data-jobCategory="${jobPath.category}">${job.title} - ${job.salary}</button>`);
      btnBlockHTML += `
      <div class="pathCategory buttons">${key}
        ${btnMarkup}
      </div>
      `;
    });

    document.getElementById('controls').innerHTML = btnBlockHTML;

    document.querySelectorAll('.jobBtn').forEach(el => el.onclick = (e) => chooseAJob(e, this) )
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

  load(playerObj){
    Object.keys(playerObj).forEach(key => {
      switch (key){
        case '_job': {
          this._job = listOfJobs().filter(job => job.title === playerObj._job.title)[0];
          if (!isNaN(playerObj._job.experience._points)){
            this.job.loadExp(playerObj._job.experience)
          } else {
            this.job.addExp(0)
          }
          break;
        }
        default: { this[key] = playerObj[key] }
      }
    });
    this.update('health', 'add', 0);
    this.update('statPoints', 'add', 0);
    this.update('int', 'add', 0);
    this.update('dex', 'add', 0);
    this.update('char', 'add', 0);
    this.update('perc', 'add', 0);
    return this;
  }
}

export default Player;

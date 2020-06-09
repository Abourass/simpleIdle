import careers from './jobs/Careers.js';
import {listJobs} from './Actions.js';
import {µ} from '../tools/micro.mjs';

class Player {
  constructor() {
    this._money = 0;
    this._health = 20;
    this._statPoints = 4;
    this._int = 3;
    this._dex = 3;
    this._char = 3;
    this._perc = 3;
    this._careers = careers().createNew();
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

  get careers(){return this._careers}
  set careers(career){return this._careers = careers().load(career)}

  get karma(){return this._karma}

  get creativity(){return this._creativity}

  get items(){return this._items}

  addItem(item){
    this._items.push(item);
    this.newTick.push(item.bonus);
    console.log('New Item', item);
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
    if (this.careers._currentPath === 'none'){ return }
    this.careers._currentPath.addExp(amount, this);
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
    µ('#incIntelligence').on('click', () => this.increaseStat('int', () => listJobs(this)));
    µ('#incDexterity').on('click', () => this.increaseStat('dex', () => listJobs(this)));
    µ('#incCharisma').on('click',() => this.increaseStat('char', () => listJobs(this)));
    µ('#incPerception').on('click', () => this.increaseStat('perc', () => listJobs(this)));
  }

  load(playerObj){
    Object.keys(playerObj).forEach(key => {
      switch (key){
        case '_careers': {
          this._careers = careers().load(playerObj.careers);
          if (!isNaN(playerObj._careers._jobPath.experience)){
            this.jobPath.loadExp(playerObj._jobPath.experience)
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

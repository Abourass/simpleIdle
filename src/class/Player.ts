import careers, {Careers, iPath} from './jobs/Careers.js';
import {listJobs} from './JobActions.js';
import tools from '../tools/index.js';
import Item from './shop/Item.js';

const {el} = tools;

export type stats = 'int' | 'dex' | 'char' | 'perc' | 'karma' | 'creativity' | 'money' | 'statPoints' | 'health';

export default class Player {
  money: number;
  items: Item[];
  private health: number;
  private statPoints: number;
  int: number;
  dex: number;
  char: number;
  perc: number;
  private karma: number;
  creativity: number;
  careers: Careers;
  newTick: Item["bonus"][];

  constructor() {
    this.money = 0;
    this.health = 20;
    this.statPoints = 4;
    this.int = 3;
    this.dex = 3;
    this.char = 3;
    this.perc = 3;
    this.karma = 50;
    this.creativity = 0;
    this.careers = careers().createNew();
    this.items = [];
    this.newTick = [];
  }

  loadCareer(career: iPath){ this.careers = careers().load(career) }

  addItem(item: Item){
    this.items.push(item);
    this.newTick.push(item.bonus);
    console.log('New Item', item);
  }

  update(prop: stats, operation: 'add' | 'sub', amount: number){
    operation === 'add' ? this[prop] += amount : this[prop] -= amount;
    if (document.getElementById(prop)) el(`#${prop}`).text(this[prop]);
  }

  increaseStat(stat: stats, fn: () => void){
    if (this.statPoints > 0){
      this.statPoints -= 1;
      if (document.getElementById('statPoints')) el('#statPoints').text(this.statPoints);
      this[stat] += 1;
      if (document.getElementById(stat)) el(`#${stat}`).text(this[stat]);
      if (this.statPoints === 0){ fn(); console.log('Called CB FN()') }
    }
  }

  addJobExp(amount: number): void {
    if (this.careers.currentPath === 'none'){ return }
    this.careers.currentPath.addExp(amount, this);
  }

  init(): void {
    const initTypes: stats[] = ['int', 'dex', 'char', 'perc', 'money', 'statPoints', 'health']
    const curPlayer = this;
    initTypes.forEach(function(type){
      el(`#${type}`).text(curPlayer[type])
    })

    el('#controls').html(`
      <button class="btn button is-primary" id="incIntelligence">Increase Intelligence</button>
      <button class="btn button is-primary" id="incDexterity">Increase Dexterity</button>
      <button class="btn button is-primary" id="incCharisma">Increase Charisma</button>
      <button class="btn button is-primary" id="incPerception">Increase Perception</button>
    `);
    el('#incIntelligence').on('click', () => this.increaseStat('int', () => listJobs(this)));
    el('#incDexterity').on('click', () => this.increaseStat('dex', () => listJobs(this)));
    el('#incCharisma').on('click',() => this.increaseStat('char', () => listJobs(this)));
    el('#incPerception').on('click', () => this.increaseStat('perc', () => listJobs(this)));
  }

  load(playerObj: Player){
    Object.keys(playerObj).forEach(key => {
      switch (key){
        case 'careers': {
          this.careers = careers().load(playerObj.careers);
          /*
          if (!isNaN(playerObj._careers._currentPath._exp)){
            this.jobPath.loadExp(playerObj._careers._currentPath._exp)
          } else {
            this.job.addExp(0)
          }

           */
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

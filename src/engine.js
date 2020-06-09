import Player from './class/Player.js'
import Shop from './class/shop/Shop.js'
import {loadAJob} from './class/Actions.js';
import {µ} from './tools/micro.mjs';

const engine = () => {
  let player;

  const perTick = {
    money: 0,
    jobBonuses: [
      {computer: 0},
      {food: 0},
      {service: 0},
      {fame: 0},
      {crime: 0},
    ],
    exp: 0,
    jobExp: 0,
    tickSpeed: 2000
  };

 if (localStorage.getItem('player')){
   console.log(JSON.parse(localStorage.getItem('player')))
   player = new Player().load(JSON.parse(localStorage.getItem('player')));
   loadAJob(player);
   Shop.loadShop(player);
   if (player.items >= 1){
     player.items.forEach(item => {
       if (item.bonus.moneyPerSecond){ perTick.money += item.bonus.moneyPerSecond }
       if (item.bonus.expPerSecond){ perTick.exp += item.bonus.expPerSecond }
       if (item.bonus.jobExpPerSecond){ perTick.jobExp += item.bonus.jobExpPerSecond}
       if (item.bonus.tickSpeed){ perTick.tickSpeed += item.bonus.tickSpeed}
     })
   }
 } else {

  player = new Player();
   µ('#startBtn').on('click', () => player.init());
  }

  window.setInterval(() => {
    if (typeof player === 'object'){
      if(player.careers.currentPath !== 'none'){ Shop.showItems(player); }                         // show Items in the shop
      if (player.newTick.length >= 1){                                             // Is there new perTick values?
        const valuesToAdd = player.newTick[0];                                     // Grab the first perTick object
        console.log(valuesToAdd);
        if (valuesToAdd.repetition === 'perTick'){
          if (valuesToAdd.requirements.jobCategory) {
            const jobBonusForCategory = perTick.jobBonuses.filter(jobBonus => Object.keys(jobBonus)[0] === valuesToAdd.requirements.jobCategory)[0];
            jobBonusForCategory[valuesToAdd.requirements.jobCategory] += valuesToAdd.amount;
          } else {
            perTick[valuesToAdd.target] += valuesToAdd.amount;
          }
        }
        if (valuesToAdd.repetition === 'once'){ player[valuesToAdd.bonus] += valuesToAdd.amount; }
        player.newTick.unshift();                                                  // Destroy the newTick obj since we've finished processing it
      }

      if(player.careers.currentPath !== 'none'){
        const jobBonusForCategory = perTick.jobBonuses.filter(jobBonus => Object.keys(jobBonus)[0] === player.careers.currentPath.category)[0];
        player.update('money', 'add', perTick.money);
        player.update('money', 'add', jobBonusForCategory[player.careers.currentPath.category]);
        if(player.careers.currentExp !== player.careers.currentPath.levels[player.careers.currentLevel].maxExp){ player.addJobExp(perTick.jobExp); } // perTick.jobExp
      }
    } else {
      console.log(player)
    }
    localStorage.setItem('player', JSON.stringify(player))
  }, perTick.tickSpeed)
};

engine();

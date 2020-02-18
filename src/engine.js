import Player from './class/Player.js'
import Shop from './class/shop/Shop.js'

const engine = () => {
  let player;

  const perTick = {
    money: 0,
    exp: 0,
    jobExp: 0,
    tickSpeed: 2000
  };

  /*
 if (localStorage.getItem('player')){
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

   */
  player = new Player();
  document.getElementById('startBtn').onclick = () => player.init();
  // }

  window.setInterval(() => {
    if (typeof player === 'object'){
      if(player.careers.currentPath !== 'none'){ Shop.showItems(player); }                         // show Items in the shop
      if (player.newTick.length >= 1){                                             // Is there new perTick values?
        const valuesToAdd = player.newTick[0];                                     // Grab the first perTick object
        Object.keys(valuesToAdd).forEach(key => perTick[key] += valuesToAdd[key]); // Increase the values within the perTick obj
        player.newTick.unshift();                                                  // Destroy the newTick obj since we've finished processing it
      }

      if(player.careers.currentPath !== 'none'){
        player.update('money', 'add', perTick.money);
        if(player.careers.currentExp !== player.careers.currentPath.levels[player.careers.currentLevel].maxExp){ player.addJobExp(perTick.jobExp); } // perTick.jobExp
      }
    } else {
      console.log(player)
    }
    localStorage.setItem('player', JSON.stringify(player))
  }, perTick.tickSpeed)
};

engine();

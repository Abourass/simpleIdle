import Player from './class/Player.js'
import Shop from './class/Shop.js'

const engine = () => {
  let player;
  if (localStorage.getItem('player')){
    player = JSON.parse(localStorage.getItem('player'))
  } else {
    player = new Player();
    document.getElementById('startBtn').onclick = () => player.init();
  }

  const perTick = {
    money: 0,
    exp: 0,
    jobExp: 0
  };

  window.setInterval(() => {
    if(player.job !== 'none'){ Shop.showItems(player); }                       // show Items in the shop
    if (player.newTick.length >= 1){                                                 // Is there new perTick values?
      const valuesToAdd = player.newTick[0];                                         // Grab the first perTick object
      Object.keys(valuesToAdd).forEach(key => perTick[key] += valuesToAdd[key]); // Increase the values within the perTick obj
      player.newTick.unshift();                                                     // Destroy the newTick obj since we've finished processing it
    }

    player.update('money', 'add', perTick.money);
    player.addJobExp(perTick.jobExp);
    localStorage.setItem('player', JSON.stringify(player))
  }, 1000)
};

engine();

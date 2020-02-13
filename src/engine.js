import player from './class/Player.js'
import Shop from './class/Shop.js'

const engine = () => {
  const perTick = {
    money: 0,
    exp: 0
  };
  document.getElementById('startBtn').onclick = () => player.init();

  window.setInterval(() => {
    if(player.job !== 'none'){
      Shop.showItems(player);
    }
    if (player.newTick.length >= 1){
      const valuesToAdd = player.newTick[0];
      Object.keys(valuesToAdd).forEach(key => perTick[key] += valuesToAdd[key])
      player.newTick.unshift();
    }

    player.update('money', 'add', perTick.money)
  }, 1000)
};

engine();

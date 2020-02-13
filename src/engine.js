import player from './class/Player.js'
import Shop from './Shop.js'

const engine = () => {
  document.getElementById('startBtn').onclick = () => player.init();

  window.setInterval(() => {
    if(player.job !== 'none'){
      Shop.showItems(player)
    }
  }, 1000)
};

engine();

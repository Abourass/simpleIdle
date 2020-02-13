import player from './class/Player.js'
const engine = () => {
  document.getElementById('startBtn').onclick = () => player.init();

  window.setInterval(() => {

  }, 1000)
};

engine();

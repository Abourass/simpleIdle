import player from './class/Player'

const engine = () => {
  document.getElementById('startBtn').onclick = () => player.init();
};

engine();

const player = require('./class/Player');

const engine = () => {
  document.getElementById('startBtn').onclick = () => player.init();
};

engine();

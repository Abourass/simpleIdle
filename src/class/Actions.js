export const chooseAJob = (e, player) => {
  const target = e.currentTarget;
  player.careers._currentPath = player.careers.searchPath(target.dataset.jobCategory);
  player.careers._currentPath.curLevel = 0;
  player.careers._currentPath._curPosition = player.careers.searchJobs(target.dataset.jobCategory, target.dataset.jobLevel, target.dataset.title);
  player.careers._currentPath._exp = 0;

  console.log('Player =>', player);

  document.getElementById('controls').innerHTML = `
    <button class="btn button is-success" id="jobControl">${player.careers.currentPath.currentPosition.btnText} - $${player.careers.currentPath.currentPosition.salary}</button>
  `;
  document.getElementById('job').innerText = player.careers.currentPath.currentPosition.title;
  document.getElementById('jobLvl').innerText = player.careers.currentLevel;
  document.getElementById('jobExp').innerText = player.careers.currentPath._exp;
  document.getElementById('jobControl').onclick = () => { player.update('money', 'add', player.careers.currentPath.currentPosition.salary); player.careers.currentPath.addExp(10);}
};

export const loadAJob = (player) => {
  document.getElementById('controls').innerHTML = `
    <button class="btn button is-success" id="jobControl">${player.careers._currentPath.currentPosition.btnText} - $${player.careers._currentPath.currentPosition.salary}</button>
    <button class="btn button is-danger" id="deletePlayerControl">Delete Player</button>
  `;
  document.getElementById('job').innerText = player.careers._currentPath.currentPosition.title;
  document.getElementById('jobLvl').innerText = player.careers._currentLevel;
  document.getElementById('jobExp').innerText = player.careers._currentPath._exp;
  document.getElementById('jobControl').onclick = () => { player.update('money', 'add', player.careers._currentPath.currentPosition.salary); player.careers._currentPath.addExp(10);}
  document.getElementById('deletePlayerControl').onclick = () => { localStorage.removeItem('player'); location.reload(); }
};

export default {chooseAJob, loadAJob}

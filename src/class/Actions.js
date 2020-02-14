import {listOfInitialJobPaths} from './Job.js';

export const chooseAJob = (e, player) => {
  const target = e.currentTarget;
  player._jobPath = listOfInitialJobPaths({int: player.int, dex: player.dex, char: player.char, perc: player.perc, creativity: player.creativity}).filter(jobCategory => jobCategory.category === target.dataset.jobCategory);
  player._jobPath._curLevel = 0;
  player._jobPath._curPosition = player._jobPath.position.filter(position => position.title === target.dataset.job)[0];

  document.getElementById('controls').innerHTML = `
    <button class="btn button is-success" id="jobControl">${player.jobPath._curPosition.btnText} - $${player.jobPath._curPosition.salary}</button>
  `;
  document.getElementById('job').innerText = player.jobPath._curPosition.title;
  document.getElementById('jobLvl').innerText = player.jobPath._curLevel;
  document.getElementById('jobExp').innerText = player.jobPath._exp;
  document.getElementById('jobControl').onclick = () => { player.update('money', 'add', player.job.salary); player.job.addExp(10);}
};

export const loadAJob = (player) => {
  document.getElementById('controls').innerHTML = `
    <button class="btn button is-success" id="jobControl">${player.job.btnText} - $${player.job.salary}</button>
    <button class="btn button is-danger" id="deletePlayerControl">Delete Player</button>
  `;
  document.getElementById('job').innerText = player.job.title;
  document.getElementById('jobLvl').innerText = player.job.experience.level;
  document.getElementById('jobExp').innerText = player.job.experience.points;
  document.getElementById('jobControl').onclick = () => { player.update('money', 'add', player.job.salary); player.job.addExp(10); };
  document.getElementById('deletePlayerControl').onclick = () => { localStorage.removeItem('player'); location.reload(); }
};

export default {chooseAJob, loadAJob}

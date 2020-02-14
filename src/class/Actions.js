import {searchJobs, searchPath} from './Job.js';

export const chooseAJob = (e, player) => {
  const target = e.currentTarget;
  player._jobPath = searchPath(target.dataset.jobCategory);
  console.log(player);
  player._jobPath._curLevel = 0;
  player._jobPath._curPosition = searchJobs(target.dataset.jobCategory, target.dataset.jobLevel, target.dataset.title);
  player._jobPath._exp = 0;

  document.getElementById('controls').innerHTML = `
    <button class="btn button is-success" id="jobControl">${player.jobPath.currentPosition.btnText} - $${player.jobPath.currentPosition.salary}</button>
  `;
  document.getElementById('job').innerText = player.jobPath.currentPosition.title;
  document.getElementById('jobLvl').innerText = player.jobPath.currentLevel;
  document.getElementById('jobExp').innerText = player.jobPath.experience;
  document.getElementById('jobControl').onclick = () => { player.update('money', 'add', player.jobPath.currentPosition.salary); player.jobPath.addExp(10);}
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

import listOfJobs from './Job.js';

export const chooseAJob = (e, player) => {
  const target = e.currentTarget;
  player._job =  listOfJobs().filter(job => job.title === target.dataset.job)[0];
  document.getElementById('controls').innerHTML = `
    <button class="btn button is-success" id="jobControl">${player.job.btnText} - $${player.job.salary}</button>
  `;
  document.getElementById('job').innerText = player.job;
  document.getElementById('jobLvl').innerText = player.job.experience.level;
  document.getElementById('jobExp').innerText = player.job.experience.points;
  document.getElementById('jobControl').onclick = () => { player.update('money', 'add', player.job.salary); player.job.addExp(10)}
};

export default {chooseAJob}

import listOfJobs from './Job.js';

export const chooseAJob = (e, player) => {
  const target = e.currentTarget;
  player._job =  listOfJobs().filter(job => job.title === target.dataset.job)[0];
  document.getElementById('controls').innerHTML = `
    <button class="btn button is-success" id="jobControl">${player.job.btnText} - $${player.job.salary}</button>
  `;
  document.getElementById('jobControl').onclick = () => player.update('money', 'add', player.job.salary)
};

export default {chooseAJob}

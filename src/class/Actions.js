import listOfJobs from './ListOfJobs.js';

export const chooseAJob = (e, player, fn) => {
  const target = e.currentTarget;
  player._job =  target.dataset.job;
  fn();
};

export const loadJob = (player) => {
  const job = listOfJobs().filter(job => job.title === player._job)[0]; // Select job of same title
  document.getElementById('controls').innerHTML = `
    <button class="btn button is-success" id="jobControl">${job.btnText} - $${job.salary}</button>
  `;
  document.getElementById('jobControl').onclick = () => player.update('money', 'add', job.salary)
};
export default {chooseAJob, loadJob}

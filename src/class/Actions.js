export const chooseAJob = (e, player) => {
  const target = e.currentTarget;
  player._job =  target.dataset.job;
  console.log(player)

};
export default {chooseAJob}

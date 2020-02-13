const chooseAJob = (e, player) => {
  const target = e.currentTarget;
  return target.dataset.job;
};
export default {chooseAJob}

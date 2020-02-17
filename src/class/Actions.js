export const chooseAJob = (e, player) => {
  const target = e.currentTarget;

  player.careers._currentPath = player.careers.searchPath(target.dataset.jobCategory);
  if (player.careers._currentPath._curLevel === 'none'){
    player.careers._currentPath._curLevel = 0;
    player.careers._currentPath._exp = 0;
  }
  player.careers._currentPath._curPosition = player.careers.searchJobs(target.dataset.jobCategory, target.dataset.jobLevel, target.dataset.title);

  console.log('Player select a new position =>', player);

  document.getElementById('controls').innerHTML = `
    <button class="btn button is-success" id="jobControl">${player.careers.currentPath.currentPosition.btnText} - $${player.careers.currentPath.currentPosition.salary}</button>
  `;
  document.getElementById('job').innerText = player.careers.currentPath.currentPosition.title;
  document.getElementById('jobLvl').innerText = player.careers.currentLevel;
  document.getElementById('jobExp').innerText = player.careers.currentPath._exp;
  document.getElementById('jobControl').onclick = () => { player.update('money', 'add', player.careers.currentPath.currentPosition.salary); player.careers.currentPath.addExp(10, player);}
};

export const listJobs = (player) => {
    const potentialJobPaths = player._careers.listOfJobPaths({int: player.int, dex: player.dex, char: player.char, perc: player.perc, creativity: player.creativity, jobTitle: player.careers._currentPath === 'none' ? 'none' : player.careers.currentPosition._title});
    document.getElementById('statPointBlock').style.display = 'none';
    let btnBlockHTML = '';

    potentialJobPaths.forEach(jobPath => {
      const path = Object.keys(jobPath)[0]; // Ex: computer, food, etc
      const positionLevels = Object.keys(jobPath[path]);
      let btnMarkup = '';
      let levelMarkup = '';
      positionLevels.forEach(lvl => {
        jobPath[path][lvl].forEach(position => {
          btnMarkup += `<button class="button is-primary jobBtn" title="${position.altText}" data-title="${position.title}" data-job-level="${lvl}" data-job-category="${path}">${position.title} - ${position.salary}</button>`
        });

        levelMarkup +=`
        <div class="levelCategory">${lvl}
          ${btnMarkup}
        </div>`});

      btnBlockHTML += `
      <div class="pathCategory buttons">${path}
        ${levelMarkup}
      </div>
      `;
    });
    document.getElementById('controls').innerHTML = btnBlockHTML;
    document.querySelectorAll('.jobBtn').forEach(el => el.onclick = (e) => chooseAJob(e, player))
};

export const loadAJob = (player) => {
  document.getElementById('controls').innerHTML = `
    <button class="btn button is-success" id="jobControl">${player.careers.currentPath.currentPosition.btnText} - $${player.careers.currentPath.currentPosition.salary}</button>
    <button class="btn button is-danger" id="deletePlayerControl">Delete Player</button>
  `;
  document.getElementById('job').innerText = player.careers.currentPath.currentPosition.title;
  document.getElementById('jobLvl').innerText = player.careers.currentLevel;
  document.getElementById('jobExp').innerText = player.careers.currentPath._exp;
  document.getElementById('jobControl').onclick = () => { player.update('money', 'add', player.careers.currentPath.currentPosition.salary); player.careers.currentPath.addExp(10); };
  document.getElementById('deletePlayerControl').onclick = () => { localStorage.removeItem('player'); location.reload(); }
};

export default {chooseAJob, listJobs, loadAJob}

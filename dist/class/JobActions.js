import tools from '../tools/index.js';
import Position from './jobs/Position.js';
import JobPath from './jobs/JobPath.js';
const { el } = tools;
export const chooseAJob = (event, player) => {
    const target = event.currentTarget;
    if (!(target instanceof HTMLButtonElement))
        return; // Type Guard for dataset (See: https://stackoverflow.com/questions/49631688/property-dataset-does-not-exist-on-type-eventtarget )
    const jobBlock = el('#jobBlock');
    const jobExpBlock = el('#jobExpBlock');
    player.careers.currentPath = player.careers.searchPath(target.dataset.jobCategory);
    if (player.careers.currentPath.curLevel === 0) {
        player.careers.currentPath.experience = 0;
    }
    else {
        player.careers.currentPath.curLevel += 1;
    }
    player.careers.currentPath.curPosition = player.careers.searchJobs(target.dataset.jobCategory, target.dataset.jobLevel, target.dataset.title);
    console.log('Player selected a new position =>', player);
    if (player.careers.currentPosition instanceof Position) {
        el('#controls').html(`
    <button class="btn button is-success" id="jobControl">${player.careers.currentPosition.btnText} - $${player.careers.currentPosition.salary}</button>
  `);
        el('#job').text(`${player.careers.currentPosition.title}`);
    }
    el('#jobLvl').text(player.careers.currentLevel);
    el('#jobExp').html(`<span style="text-transform:capitalize;">${player.careers.currentPath.category}</span> Exp - ${player.careers.currentPath.experience}`);
    if (jobBlock.hasClass('hidden')) {
        jobBlock.removeClass('hidden');
    }
    if (jobExpBlock.hasClass('hidden')) {
        jobExpBlock.removeClass('hidden');
    }
    el('#jobControl').on('click', () => {
        if (player.careers.currentPosition instanceof Position) {
            player.update('money', 'add', player.careers.currentPosition.salary);
        }
        if (player.careers.currentPath instanceof JobPath) {
            player.careers.currentPath.addExp(10, player);
        }
    });
};
export const listJobs = (player) => {
    console.log('list of jobs called');
    console.log(player.careers.currentPosition);
    console.log('About to send listOfJobs a request');
    const potentialJobPaths = player.careers.listOfJobPaths({
        int: player.int,
        dex: player.dex,
        char: player.char,
        perc: player.perc,
        creativity: player.creativity,
        jobTitle: (() => {
            if (player.careers.currentPosition) {
                if (player.careers.currentPosition === 'Jobless')
                    return 'Jobless';
                return player.careers.currentPosition.title;
            }
            return 'Jobless';
        })()
    });
    console.log('listJobs ()=> potentialJobPaths =>', potentialJobPaths);
    console.log('listJobs ()=> current position =>', player.careers.currentPosition);
    // @ts-ignore
    document.getElementById('statPointBlock').style.display = 'none';
    let btnBlockHTML = '';
    Object.keys(potentialJobPaths).forEach((jobCategory) => {
        let btnMarkup = '';
        let levelMarkup = '';
        potentialJobPaths[jobCategory].forEach((position) => {
            btnMarkup += `<button class="button is-primary jobBtn" title="${position.altText}" data-title="${position.title}" data-job-level="${position.level}" data-job-category="${jobCategory}">${position.title} - ${position.salary}</button>`;
        });
        btnBlockHTML += `
      <div class="column">
        <div style="display: flex; flex-direction: column">
          <span class="has-text-centered">Job Path: <span style="text-transform:capitalize;">${jobCategory}</span></span>
          <div style="display: flex; flex-direction: column">
          <div class="buttons">
            ${btnMarkup}
          </div>
        </div>
        </div>
      </div>
      `;
    });
    el('#controls').html(`
    <div class="pathCategory columns">
    ${btnBlockHTML}
    </div>
    `);
    document.querySelectorAll('.jobBtn').forEach(el => {
        if (el instanceof HTMLElement) {
            el.onclick = (e) => chooseAJob(e, player);
        }
    });
};
export const loadAJob = (player) => {
    if (player.careers.currentPosition instanceof Position) {
        el('#controls').html(`
    <button class="btn button is-success" id="jobControl">${player.careers.currentPosition.btnText} - $${player.careers.currentPosition.salary}</button>
    <button class="btn button is-danger" id="deletePlayerControl">Delete Player</button>
  `);
        el('#job').text(player.careers.currentPosition.title);
        el('#jobLvl').text(player.careers.currentLevel);
        if (player.careers.currentPath instanceof JobPath) {
            el('#jobExp').text(player.careers.currentPath.experience);
        }
        el('#jobControl').on('click', () => {
            if (player.careers.currentPosition instanceof Position) {
                player.update('money', 'add', player.careers.currentPosition.salary);
            }
            if (player.careers.currentPath instanceof JobPath) {
                player.careers.currentPath.addExp(10, player);
            }
        });
        el('#deletePlayerControl').on('click', () => {
            localStorage.removeItem('player');
            location.reload();
        });
    }
};
export default { chooseAJob, listJobs, loadAJob };
//# sourceMappingURL=JobActions.js.map
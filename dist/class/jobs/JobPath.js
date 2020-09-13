import { listJobs } from '../JobActions.js';
import el from '../../tools/el.js';
export default class JobPath {
    constructor({ category, levelsWithExpRequirements }) {
        this.category = category;
        this.levels = levelsWithExpRequirements;
        this.curLevel = 0;
        this.curPosition = undefined;
        this.experience = 0;
    }
    addPositions(arrayOfPositions, jobLevel) {
        arrayOfPositions.forEach((pos) => {
            this.levels.filter(iLevel => iLevel.level === jobLevel)[0].positions.push(pos);
        });
    }
    addExp(amountToIncreaseBy, player) {
        const currentDepth = this.curLevel;
        const currentLevel = this.levels.filter(function (iLevel) { return iLevel.level === currentDepth; })[0];
        let amountToMax = currentLevel.maxExp - this.experience; // Calculate Exp needed to achieve next level
        if (amountToIncreaseBy < amountToMax) { // Check if the amount we would increase by is less than what we need to hit the next level
            this.experience += amountToIncreaseBy;
            amountToMax = currentLevel.maxExp - this.experience;
        }
        else {
            this.experience += amountToMax;
            amountToMax = 0;
        }
        if (player.careers.currentPath instanceof JobPath) {
            el('#jobExp').html(`<span style="text-transform:capitalize;">${player.careers.currentPath.category}</span> Exp - ${player.careers.currentPath.experience}`);
        }
        if (amountToMax === 0) {
            listJobs(player);
        }
    }
    openJobs(stats) {
        const currentDepth = this.curLevel;
        let currentLevel = this.levels.filter(function (iLevel) { return iLevel.level === currentDepth; })[0];
        console.log('currentLevel', currentLevel);
        let nextLvl = this.levels.filter(function (iLevel) { return iLevel.level === currentDepth + 1; })[0];
        console.log('nextLevel', nextLvl);
        let openPosition = [];
        currentLevel.positions.forEach((job) => {
            let canAdd = true;
            if (stats.jobTitle === job.title) {
                canAdd = false;
            }
            Object.keys(job.requirements).forEach(req => {
                if (!stats[req]) {
                    canAdd = false;
                }
                if (stats[req] < job.requirements[req]) {
                    canAdd = false;
                }
            });
            if (canAdd) {
                job.level = currentDepth;
                openPosition.push(job);
                console.log(`Current Job Level => ${job.title} => canAdd was true so let's add ${job.title} to level[${this.curLevel}]`);
                console.log('Levels currently looks like => ', openPosition);
            }
        });
        if (this.experience >= nextLvl.minExp) {
            nextLvl.positions.filter(job => {
                let canAdd = true;
                if (stats.jobTitle === job.title) {
                    canAdd = false;
                }
                Object.keys(job.requirements).forEach(req => {
                    if (!stats[req]) {
                        canAdd = false;
                    }
                    if (stats[req] < job.requirements[req]) {
                        canAdd = false;
                    }
                });
                if (canAdd) {
                    job.level = currentDepth + 1;
                    openPosition.push(job);
                    console.log(`Next Job Level => ${job.title} => canAdd was true so let's add ${job.title} to level[${nextLvl}]`);
                    console.log('Levels currently looks like => ', openPosition);
                }
            });
        }
        return openPosition;
    }
}
//# sourceMappingURL=JobPath.js.map
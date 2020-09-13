import JobPath from './JobPath.js';
import Position from './Position.js';
export class Careers {
    constructor(paths) {
        this.listOfJobPaths = (stats) => {
            console.log('[Careers.listOfJobPaths] -> Start');
            const openPaths = {};
            const containsOpenPositions = (jobCategory, potentialBranch) => {
                if (potentialBranch.length > 0) {
                    openPaths[`${jobCategory}`] = potentialBranch;
                }
            };
            containsOpenPositions('computer', this.paths.computerPath.openJobs(stats));
            containsOpenPositions('food', this.paths.foodPath.openJobs(stats));
            containsOpenPositions('fame', this.paths.famePath.openJobs(stats));
            containsOpenPositions('service', this.paths.servicePath.openJobs(stats));
            containsOpenPositions('crime', this.paths.crimePath.openJobs(stats));
            return openPaths;
        };
        this.paths = paths;
        this.currentPath = undefined;
    }
    get currentPosition() {
        if (!this.currentPath) {
            return 'Jobless';
        }
        else {
            return this.currentPath.curPosition;
        }
    }
    get currentLevel() {
        if (this.currentPath instanceof JobPath) {
            return this.currentPath.curLevel;
        }
        return 'Failed to find current job level';
    }
    get currentExp() {
        if (this.currentPath instanceof JobPath) {
            return this.currentPath.experience;
        }
        return 'Failed to find current job experience';
    }
    searchPath(category) {
        switch (category) {
            case 'computer': {
                return this.paths.computerPath;
            }
            case 'food': {
                return this.paths.foodPath;
            }
            case 'fame': {
                return this.paths.famePath;
            }
            case 'service': {
                return this.paths.servicePath;
            }
            case 'crime': {
                return this.paths.crimePath;
            }
        }
    }
    ;
    searchJobs(category, level, title) {
        return this.searchPath(category).levels[level].positions.filter(job => job.title === title)[0];
    }
    ;
}
const computerPath = new JobPath({ category: 'computer', levelsWithExpRequirements: [
        { minExp: 0, maxExp: 200, positions: [], level: 0 },
        { minExp: 200, maxExp: 600, positions: [], level: 1 },
        { minExp: 600, maxExp: 1500, positions: [], level: 2 },
        { minExp: 1500, maxExp: 25009, positions: [], level: 3 },
        { minExp: 2500, maxExp: 5000, positions: [], level: 4 },
        { minExp: 5000, maxExp: 7500, positions: [], level: 5 }
    ]
});
computerPath.addPositions([new Position({ title: 'Freelance Coder', salary: 2, expPerClick: 2, btnText: 'Code Idle Games', altText: 'Make those numbers go up', requirements: { int: 5, dex: 3, char: 3, perc: 3 } })], 0);
computerPath.addPositions([new Position({ title: 'Code Monkey', salary: 3, expPerClick: 2, btnText: 'Code Login Page', altText: 'Crush your imagination', requirements: { int: 6, dex: 3, char: 3, perc: 3 } })], 1);
computerPath.addPositions([
    new Position({ title: 'Fight for jobs on Fiver', salary: 4, expPerClick: 2, btnText: 'Setup Wordpress', altText: 'I swear I\'m loosing experience', requirements: { int: 6, dex: 3, char: 3, perc: 3 } })
], 2);
computerPath.addPositions([
    new Position({ title: 'Jr. Front End Dev', salary: 5, expPerClick: 2, btnText: 'Make divs', altText: 'Use your imagination... on business UI..', requirements: { int: 6, dex: 3, char: 3, perc: 3, creativity: 10 } }),
    new Position({ title: 'Jr. Back End Dev', salary: 5, expPerClick: 2, btnText: 'Make database schema', altText: '{firstName: String}', requirements: { int: 7, dex: 3, char: 3, perc: 3 } }),
], 3);
computerPath.addPositions([
    new Position({ title: 'Front End Dev', salary: 7.5, expPerClick: 3, btnText: 'Make neuromorphic buttons', altText: 'Wait that\'s a button?', requirements: { int: 6, dex: 3, char: 3, perc: 3, creativity: 35 } }),
    new Position({ title: 'Back End Dev', salary: 7.5, expPerClick: 3, btnText: 'Create GraphQL service', altText: 'I swear I could automate this', requirements: { int: 7, dex: 3, char: 3, perc: 4 } }),
    new Position({ title: 'Full Stack Dev', salary: 8, expPerClick: 3, btnText: 'Set up Sapper', altText: 'Why is this documented so badly?!?', requirements: { int: 7, dex: 3, char: 3, perc: 4, creativity: 40 } }),
], 4);
computerPath.addPositions([
    new Position({ title: 'Sr. Front End Engineer', salary: 8.5, expPerClick: 4, btnText: 'Set up Stylus', altText: 'At least it\'s not CSS in JS ', requirements: { int: 7, dex: 3, char: 3, perc: 3, creativity: 55 } }),
    new Position({ title: 'Sr. Back End Engineer', salary: 8.5, expPerClick: 4, btnText: 'Set up Hadoop Data Stores', altText: 'Soon machines will feed themselves', requirements: { int: 8, dex: 3, char: 3, perc: 5 } }),
    new Position({ title: 'Sr. Full Stack Engineer', salary: 9, expPerClick: 5, btnText: 'Set up Sapper Successfully', altText: 'I really should have documented how I did this..', requirements: { int: 8, dex: 3, char: 3, perc: 5, creativity: 60 } }),
], 5);
const foodPath = new JobPath({ category: 'food', levelsWithExpRequirements: [
        { minExp: 0, maxExp: 200, positions: [], level: 0 },
        { minExp: 200, maxExp: 600, positions: [], level: 1 },
        { minExp: 600, maxExp: 1500, positions: [], level: 2 },
        { minExp: 1500, maxExp: 2500, positions: [], level: 3 },
        { minExp: 2500, maxExp: 5000, positions: [], level: 4 },
        { minExp: 5000, maxExp: 7500, positions: [], level: 5 }
    ]
});
foodPath.addPositions([
    new Position({ title: 'Fry Cook', salary: 1, expPerClick: 2, btnText: 'Flip Burgers', altText: 'Get greasy', requirements: { int: 3, dex: 3, char: 3, perc: 3 } }),
    new Position({ title: 'Barista', salary: 1, expPerClick: 2, btnText: 'Brew Coffee', altText: 'Get steamy', requirements: { int: 3, dex: 4, char: 4, perc: 3 } })
], 0);
const famePath = new JobPath({ category: 'fame', levelsWithExpRequirements: [
        { minExp: 0, maxExp: 200, positions: [], level: 0 },
        { minExp: 200, maxExp: 600, positions: [], level: 1 },
        { minExp: 600, maxExp: 1500, positions: [], level: 2 },
        { minExp: 1500, maxExp: 2500, positions: [], level: 3 },
        { minExp: 2500, maxExp: 5000, positions: [], level: 4 },
        { minExp: 5000, maxExp: 7500, positions: [], level: 5 }
    ]
});
famePath.addPositions([
    new Position({
        title: 'Video Game Streamer',
        salary: 1,
        expPerClick: 2,
        btnText: 'Play Super Mario Odyssey',
        altText: 'It\'sa me.. carpal tunnel',
        requirements: { int: 3, dex: 3, char: 6, perc: 3 }
    })
], 0);
famePath.addPositions([new Position({ title: 'Make a speedrunning series', salary: 2, expPerClick: 3, btnText: 'Go fast', altText: 'Don\'t forget to use the bounce hack', requirements: { int: 3, dex: 3, char: 7, perc: 3 } })], 1);
famePath.addPositions([new Position({ title: 'Video Game Reviewer', salary: 3, expPerClick: 3.5, btnText: 'Review New Game', altText: 'I\'m sure people still read these reviews', requirements: { int: 4, dex: 3, char: 7, perc: 4 } })], 2);
famePath.addPositions([new Position({ title: 'Professional Gamer', salary: 5, expPerClick: 4, btnText: 'Play Championship', altText: 'Adderall and caffeine isn\'t a health liability, it\'s a way of life', requirements: { int: 4, dex: 3, char: 8, perc: 4 } })], 3);
const servicePath = new JobPath({ category: 'service', levelsWithExpRequirements: [
        { minExp: 0, maxExp: 200, positions: [], level: 0 },
        { minExp: 200, maxExp: 600, positions: [], level: 1 },
        { minExp: 600, maxExp: 1500, positions: [], level: 2 },
        { minExp: 1500, maxExp: 2500, positions: [], level: 3 },
        { minExp: 2500, maxExp: 5000, positions: [], level: 4 },
        { minExp: 5000, maxExp: 7500, positions: [], level: 5 }
    ]
});
servicePath.addPositions([
    new Position({ title: 'Bank Teller', salary: 1, btnText: 'Handle Money', expPerClick: 2, altText: 'Paper Cuts are a real worry', requirements: { int: 3, dex: 3, char: 5, perc: 3 } })
], 0);
servicePath.addPositions([
    new Position({ title: 'Sr. Bank Teller', salary: 2, btnText: 'Check Balances', expPerClick: 3, altText: 'If someone ask you to check their balance, don\'t push them over', requirements: { int: 4, dex: 3, char: 6, perc: 3 } })
], 1);
servicePath.addPositions([
    new Position({ title: 'Bank Manager', salary: 5, btnText: 'Manage Employee', expPerClick: 3.5, altText: 'Look over the workers shoulders while they do real work', requirements: { int: 5, dex: 3, char: 6, perc: 4 } })
], 2);
const crimePath = new JobPath({ category: 'crime', levelsWithExpRequirements: [
        { minExp: 0, maxExp: 200, positions: [], level: 0 },
        { minExp: 200, maxExp: 600, positions: [], level: 1 },
        { minExp: 600, maxExp: 1500, positions: [], level: 2 },
        { minExp: 1500, maxExp: 2500, positions: [], level: 3 },
        { minExp: 2500, maxExp: 5000, positions: [], level: 4 },
        { minExp: 5000, maxExp: 7500, positions: [], level: 5 }
    ]
});
crimePath.addPositions([
    new Position({ title: 'Shoplifter', salary: 1, expPerClick: 2, btnText: 'Steal pokemon cards', altText: 'This can\'t be a great idea', requirements: { int: 3, dex: 5, char: 3, perc: 4 } })
], 0);
crimePath.addPositions([
    new Position({ title: 'Sneaky Shoplifter', salary: 2, expPerClick: 3, btnText: 'Steal magic cards', altText: 'Talk about movin\' paper, amiright...? No..?', requirements: { int: 3, dex: 6, char: 3, perc: 4 } })
], 1);
crimePath.addPositions([
    new Position({ title: 'Bingo Fixer', salary: 3.5, expPerClick: 3.5, btnText: 'Grab the marked balls', altText: 'BINGO', requirements: { int: 4, dex: 5, char: 4, perc: 4 } })
], 2);
export const careers = () => ({
    defaultPaths: {
        computerPath: computerPath,
        foodPath: foodPath,
        famePath: famePath,
        servicePath: servicePath,
        crimePath: crimePath
    },
    createNew: function () {
        return new Careers(this.defaultPaths);
    },
    load: function (careers) { return new Careers(careers); }
});
export default careers;
//# sourceMappingURL=Careers.js.map
import JobPath, { iStats } from './JobPath.js';
import Position from './Position.js';
export declare interface iPath {
    computerPath: JobPath;
    foodPath: JobPath;
    famePath: JobPath;
    servicePath: JobPath;
    crimePath: JobPath;
}
export declare type jobCategories = 'computer' | 'food' | 'fame' | 'service' | 'crime';
export declare class Careers {
    private paths;
    currentPath: undefined | JobPath;
    constructor(paths: iPath);
    get currentPosition(): 'Jobless' | Position | undefined;
    get currentLevel(): number | string;
    get currentExp(): number | string;
    listOfJobPaths: (stats: iStats) => {
        computer?: Position[] | undefined;
        food?: Position[] | undefined;
        fame?: Position[] | undefined;
        service?: Position[] | undefined;
        crime?: Position[] | undefined;
    };
    searchPath(category: jobCategories): JobPath;
    searchJobs(category: jobCategories, level: number, title: string): Position;
}
export declare const careers: () => {
    defaultPaths: {
        computerPath: JobPath;
        foodPath: JobPath;
        famePath: JobPath;
        servicePath: JobPath;
        crimePath: JobPath;
    };
    createNew: () => Careers;
    load: (careers: iPath) => Careers;
};
export default careers;
//# sourceMappingURL=Careers.d.ts.map
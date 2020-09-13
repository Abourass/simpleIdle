import Position from './Position.js';
import Player from '../Player.js';
import { jobCategories } from './Careers.js';
export declare interface iStats {
    jobTitle: string;
    int?: number;
    dex?: number;
    char?: number;
    perc?: number;
    karma?: number;
    creativity?: number;
}
declare interface iLevel {
    minExp: number;
    maxExp: number;
    positions: Position[];
    level: number;
}
export declare interface iJobPath {
    category: jobCategories;
    levelsWithExpRequirements: iLevel[];
}
export default class JobPath {
    category: jobCategories;
    levels: iLevel[];
    curLevel: number;
    curPosition: undefined | Position;
    experience: number;
    constructor({ category, levelsWithExpRequirements }: iJobPath);
    addPositions(arrayOfPositions: Position[], jobLevel: number): void;
    addExp(amountToIncreaseBy: number, player: Player): void;
    openJobs(stats: iStats): Position[];
}
export {};
//# sourceMappingURL=JobPath.d.ts.map
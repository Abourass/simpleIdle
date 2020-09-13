import { Careers, iPath } from './jobs/Careers.js';
import Item from './shop/Item.js';
export declare type stats = 'int' | 'dex' | 'char' | 'perc' | 'karma' | 'creativity' | 'money' | 'statPoints' | 'health';
export default class Player {
    money: number;
    items: Item[];
    private health;
    private statPoints;
    int: number;
    dex: number;
    char: number;
    perc: number;
    private karma;
    creativity: number;
    careers: Careers;
    newTick: Item["bonus"][];
    constructor();
    loadCareer(career: iPath): void;
    addItem(item: Item): void;
    update(prop: stats, operation: 'add' | 'sub', amount: number): void;
    increaseStat(stat: stats, fn: () => void): void;
    addJobExp(amount: number): void;
    init(): void;
    load(playerObj: Player): this;
}
//# sourceMappingURL=Player.d.ts.map
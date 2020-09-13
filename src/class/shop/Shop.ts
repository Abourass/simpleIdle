import Player from '../Player.js';
import Bonus from './Bonus.js';
import Item from './Item.js';
import el from '../../tools/el.js';

class Shop{
  private items: Item[];

  constructor() {
    this.items = [
      new Item(
        'Mechanical Keyboard',
        'mechanicalKeyboard',
        [new Bonus('money', 1, 'Money Per Second +1', 'perTick')],
        {jobCategory: 'computer', jobLevel: 1, cost: 100}
      ),
      new Item(
        '<i class="fas fa-book"></i> Code: The Hidden Language of Computer Hardware and Software',
        'bookCode',
        [new Bonus('int', 1, 'Int +1', 'once')],
        {jobCategory: 'computer', jobLevel: 1, cost: 40}
      ),
      new Item(
        'Custom Keys for your Keyboard',
        'customKeys',
        [new Bonus('money', 1, 'Money Per Second +1', 'perTick')],
        {jobCategory: 'computer', jobLevel: 2, cost: 200}
      ),
      new Item(
        '<i class="fas fa-book"></i> JavaScript: The Definitive Guide',
        'bookJSDefinitiveGuide',
        [
          new Bonus('creativity', 10, 'Creativity +10', 'once'),
          new Bonus('int', 1, 'Int +1', 'once')
        ],
        {jobCategory: 'computer', jobLevel: 1, cost: 1}
      ),
      new Item(
        'Food Handling License',
        'foodLicense',
        [new Bonus('money', 1, 'Money Per Second +1', 'perTick')],
        {jobCategory: 'food', jobLevel: 1, cost: 100}
      ),
      new Item(
        'Chef\'s Knife',
        'chefsKnife',
        [new Bonus('money', 1, 'Money Per Second +1', 'perTick')],
        {jobCategory: 'food', jobLevel: 2, cost: 200}
      ),
      new Item(
        'Some flair for your work blazer',
        'flair',
        [new Bonus('money', 1, 'Money Per Second +1', 'perTick')],
        {jobCategory: 'service', jobLevel: 1, cost: 50}
      ),
      new Item(
        'Get a professional haircut',
        'hairCut',
        [new Bonus('money', 1, 'Money Per Second +1', 'perTick')],
        {jobCategory: 'service', jobLevel: 2, cost: 150}
      ),
      new Item(
        'A mediocre webcam',
        'shittyCam',
        [new Bonus('money', 1, 'Money Per Second +1', 'perTick')],
        {jobCategory: 'fame', jobLevel: 1, cost: 150}
      ),
      new Item(
        'A mediocre microphone',
        'shittyMic',
        [new Bonus('money', 1, 'Money Per Second +1', 'perTick')],
        {jobCategory: 'fame', jobLevel: 1, cost: 150}
      ),
      new Item(
        'Some quiet sneakers',
        'sneakies',
        [new Bonus('money', 1, 'Money Per Second +1', 'perTick')],
        {jobCategory: 'crime', jobLevel: 1, cost: 60}
      ),
      new Item(
        'A totally stealthy trench coat',
        'trenchCoat',
        [new Bonus('money', 1, 'Money Per Second +1', 'perTick')],
        {jobCategory: 'crime', jobLevel: 1, cost: 100}
      ),
    ]
  }

  buyItem(e: Event, player: Player): void {
    const target = e.currentTarget;
    if (!(target instanceof HTMLButtonElement)) return; // Type Guard for dataset (See: https://stackoverflow.com/questions/49631688/property-dataset-does-not-exist-on-type-eventtarget )
    const item: Item = this.items.filter((_item: Item): boolean => _item.id === target.dataset.id)[0];

    if (player.money >= item.requirement.cost){
      player.update('money', 'sub', item.requirement.cost);
      player.addItem(item);
      this.items = this.items.filter((_item: Item): boolean => _item.id !== item.id);
      this.showItems(player);
    }
  }

  showItems(player: Player): void {
    // @ts-ignore
    const items: Item[] = this.items.filter((item: Item): boolean => (item.requirement.jobCategory === player.careers.currentPath.category && item.requirement.jobLevel <= player.careers.currentPath.currentLevel));
    let itemMarkup: string = '';
    items.forEach((item: Item) => itemMarkup += `
    <a class="panel-block itemChoice" id="${item.id}Block" data-ID="${item.id}">
      <!-- <span class="panel-icon"> <i class="fas fa-money-bill-alt" aria-hidden="true"></i> </span> -->
      ${item.title} &nbsp; - Cost: $${item.requirement.cost}
    </a>`);

    el('#shopPanel').html(`
      <p class="panel-heading"> Shop </p>
      ${itemMarkup}
    `);

    document.querySelectorAll('.itemChoice').forEach((itemEl: Element): void => {
      if (!(itemEl instanceof HTMLElement)) return;
      itemEl.onclick = (e: Event) => this.buyItem(e, player)})
  }

  loadShop(player: Player): void{
    player.items.forEach(item => {
      this.items = this.items.filter(_item => _item.title !== item.title);
    });
    this.showItems(player);
  }
}

export default new Shop();

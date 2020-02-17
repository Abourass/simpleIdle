import Item from './Item.js';

class Shop{
  constructor() {
    this._items = [
      new Item('Mechanical Keyboard', {moneyPerSecond: 1, text: 'Money Per Second +1'}, {jobCategory: 'computer', jobLevel: 2, cost: 200}),
      new Item('Custom Keys for your Keyboard', {moneyPerSecond: 1, text: 'Money Per Second +1'}, {jobCategory: 'computer', jobLevel: 3, cost: 300}),
      new Item('Food Handling License', {moneyPerSecond: 1, text: 'Money Per Second +1'}, {jobCategory: 'food', jobLevel: 2, cost: 100}),
      new Item('Some flair for your work blazer', {moneyPerSecond: 1, text: 'Money Per Second +1'}, {jobCategory: 'service', jobLevel: 2, cost: 50}),
      new Item('A mediocre webcam', {moneyPerSecond: 1, text: 'Money Per Second +1'}, {jobCategory: 'fame', jobLevel: 2, cost: 200}),
      new Item('Some quite sneakers', {moneyPerSecond: 1, text: 'Money Per Second +1'}, {jobCategory: 'crime', jobLevel: 2, cost: 60}),
    ]
  }

  get items(){return this._items}

  buyItem(e, player) {
    const target = e.currentTarget;
    const item = this._items.filter(item => item.title === target.dataset.title)[0];
    if (player.money >= item.requirement.cost){
      player.update('money', 'sub', item.requirement.cost);
      player.addItem(item);
      this._items = this._items.filter(_item => _item.title !== item.title);
      this.showItems(player);
    }
  }

  showItems(player){
    const items = this.items.filter(item => item.requirement.jobCategory === player.careers.currentPath.category && item.requirement.jobLevel <= player.careers.currentPath.currentLevel);
    let itemMarkup = '';
    items.forEach(item => itemMarkup += `
    <a class="panel-block itemChoice" id="${item.title.replace(/ /g, "_")}Block" data-title="${item.title}">
      <!-- <span class="panel-icon"> <i class="fas fa-money-bill-alt" aria-hidden="true"></i> </span> -->
      ${item.title} &nbsp; - ${item.bonus.text} - Cost: $${item.requirement.cost}
    </a>
    `);
    document.getElementById('shopPanel').innerHTML = `
      <p class="panel-heading"> Shop </p>
      ${itemMarkup}
    `;

    document.querySelectorAll('.itemChoice').forEach(itemEl => itemEl.onclick = (e) => this.buyItem(e, player))
  }

  loadShop(player){
    player.items.forEach(item => {
      this._items = this._items.filter(_item => _item.title !== item.title);
    });
    this.showItems(player);
  }
}

export default new Shop();

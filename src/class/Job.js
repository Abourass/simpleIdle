class Job {
  constructor(title, requirements, salary, btnText, altText) {
    this.title = title;
    this.requirements = requirements;
    this.salary = salary;
    this.btnText = btnText;
    this.altText = altText;
  }
}

const listOfJobs = () => [
  new Job('Fry Cook', {int: 3, dex: 3, char: 3, perc: 3}, 1, 'Flip Burgers', 'Get greasy'),
  new Job('Barista', {int: 3, dex: 4, char: 4, perc: 3}, 1, 'Brew Coffee', 'Get steamy'),
  new Job('Bank Teller', {int: 3, dex: 3, char: 5, perc: 3}, 2, 'Handle Money', 'Paper Cuts are a real worry'),
  new Job('Shoplifter', {int: 3, dex: 5, char: 3, perc: 4}, 2, 'Steal pokemon cards', 'This can\'t be a great idea'),
  new Job('Youtube Blogger', {int: 3, dex: 3, char: 6, perc: 3}, 2, 'Vlog', 'This is somehow a job now'),
  new Job('Code Monkey', {int: 5, dex: 3, char: 3, perc: 3}, 2, 'Slam Keyboard', 'Crush your imagination'),
  new Job('Freelance Coder', {int: 6, dex: 3, char: 3, perc: 3}, 3, 'Code Idle Games', 'Make those numbers go up'),
];
export default listOfJobs;

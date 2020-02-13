import Job from './Job.js';

const listOfJobs = () => [
    new Job('Fry Cook', {int: 3, dex: 3, char: 3, perc: 3}, 1, 'Flip Burgers', 'Get greasy'),
    new Job('Barista', {int: 3, dex: 4, char: 4, perc: 3}, 1, 'Brew Coffee', 'Get steamy'),
    new Job('Bank Teller', {int: 3, dex: 3, char: 5, perc: 3}, 2, 'Become a Bank Teller', 'Paper Cuts are a real worry'),
    new Job('Code Monkey', {int: 5, dex: 3, char: 3, perc: 3}, 2, 'Slam Keyboard', 'Crush your imagination')
  ];
export default listOfJobs;

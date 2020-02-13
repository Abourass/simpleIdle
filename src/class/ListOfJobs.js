import Job from './Job';

const listOfJobs = () => [
    new Job('Fry Cook', {int: 3, dex: 3, char: 3, perc: 3}, 1, 'Flip Burgers'),
    new Job('Barista', {int: 3, dex: 4, char: 4, perc: 3}, 1, 'Brew Coffee'),
    new Job('Code Monkey', {int: 5, dex: 3, char: 3, perc: 3}, 2, 'Slam Keyboard')
  ];
export default listOfJobs;

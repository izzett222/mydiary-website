const entry = `Lorem ipsum dolor sit amet, consectetur adipisicing elit,sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
laborum. Lorem ipsum dolor sitamet, consectetur adipisicing elit, sed do eiusmod tempor.`;
const title = 'The most stressful day of my life';
const entryData = () => {
  document.querySelector("input[type='text']").value = title;
  document.querySelector('textarea').value = entry;
};

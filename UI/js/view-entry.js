const entry = `Lorem ipsum dolor sit amet, consectetur adipisicing elit,
  sed doei usmod tempor incididunt ut labore et dolore magna aliqua. Uteni
  im ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat. Duis aute irure dolor inrepr
  ehenderit in voluptate velit esse cillum dolore eu fugiat nullaparia
  tur. Excepteur sint occaecat cupidatat non proident, sunt in culpai
  qui officia deserunt mollit anim id est laborum.  Lorem ipsumdolor
  sit amet, consectetur adipisicing elit, sed do eiusmod tempor.`;
const title = 'The most stressful day of my life';
const entryData = () => {
  document.querySelector('form .title h1').textContent = title;
  document.querySelector('form p').textContent = entry;
};

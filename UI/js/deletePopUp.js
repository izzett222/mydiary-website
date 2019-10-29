const deleteButton = document.querySelector('.buttons button:first-of-type');
const popupWindow = document.querySelector('.popup');
const okButton = document.querySelector('.popup button:first-of-type');
const cancelButton = document.querySelector('.popup button:last-of-type');
const popup = () => {
  popupWindow.classList.remove('hidden');
};
const cancel = () => {
  popupWindow.classList.add('hidden');
};
const ok = () => {
  window.open('../pages/profile.html', '_self');
};
deleteButton.addEventListener('click', popup);
cancelButton.addEventListener('click', cancel);
okButton.addEventListener('click', ok);

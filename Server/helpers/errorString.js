const erroraString = (error) => {
  let newString = error.details[0].message.replace('/', '').replace(/"/g, '');
  if (error.details[0].type === 'object.missing') {
    newString = newString.replace('value', 'The request').replace(',', ' or')
      .replace('[', '').replace('one of', 'a')
      .replace(']', '');
  }
  return newString;
};
export default erroraString;

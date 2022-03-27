export const getClasses = (classses) =>
  classses
    .filter((item) => item !== '')
    .join(' ')
    .trim();

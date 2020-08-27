const MonthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const convertMonthToName = (month: number): string => {
  return MonthNames[month];
};

const getMonthYear = (date: string): string => {
  const [year, month] = date.split('-');
  return `${convertMonthToName(+month)} ${year}`;
};

export { MonthNames, convertMonthToName, getMonthYear };

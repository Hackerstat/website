export const formatNums = (num: number): string => {
  const stringNum = `${num}`;
  if (num < 1000) {
    return stringNum;
  }
  const hundredsIndex = stringNum.length - 3;
  const thousandsIndex = stringNum.length - 4;
  return `${stringNum.slice(0, thousandsIndex + 1)}.${stringNum[hundredsIndex]}k`;
};

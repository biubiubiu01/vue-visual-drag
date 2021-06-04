/**
 * Created by Lzy on 2021/5/19.
 */

/**
 * 获取年月日
 * @param {date} date
 */
export function getDate(temp) {
  const date = temp ? temp : new Date();
  return (
    date.getFullYear() +
    "-" +
    addZero(date.getMonth() + 1) +
    "-" +
    addZero(date.getDate())
  );
}

/**
 * 获取时分秒
 */
export function getTime() {
  const date = new Date();
  return (
    addZero(date.getHours()) +
    ":" +
    addZero(date.getMinutes()) +
    ":" +
    addZero(date.getSeconds())
  );
}

/**
 * 获取日期前后n天
 */
export function getAroundDay(num) {
  const date = new Date();
  date.setDate(date.getDate() + num);
  return getDate(date);
}

/**
 * 日期格式化
 * @param {string} str
 */
function addZero(str) {
  return str < 10 ? `0${str}` : str;
}

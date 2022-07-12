import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
export const timeFromNow = (date) => {
  const result = dayjs(date).fromNow();
  return result;
};
const DateThinh = (date1, date2) => {
  let result;

  const fullDate1 = `${date1.getDate()}/${
    date1.getMonth() + 1
  }/${date1.getFullYear()}`;
  const fullDate2 = `${date2.getDate()}/${
    date2.getMonth() + 1
  }/${date2.getFullYear()}`;

  if (fullDate1 === fullDate2) {
    const getHoursDate1 = date1.getHours();
    const getMinutesDate1 = date1.getMinutes();
    const getSecondsDate1 = date1.getSeconds();
    const getHoursDate2 = date2.getHours();
    const getMinutesDate2 = date2.getMinutes();
    const getSecondsDate2 = date2.getSeconds();
    if (getHoursDate2 === getHoursDate1) {
      if (getMinutesDate2 === getMinutesDate1) {
        result = "Mới đây";
      } else {
        result = `${getMinutesDate2 - getMinutesDate1} phút trước`;
      }
    } else {
      result = `${getHoursDate2 - getHoursDate1} giờ trước`;
    }
  } else {
    const getTheRestOfDay = Math.ceil(
      (date2.getTime() - date1.getTime()) / 3600 / 1000 / 24
    );

    if (getTheRestOfDay <= 30) {
      result = `${getTheRestOfDay} ngày trước`;
    }
  }
  return result;
};
const convertTime = (timeISOString) => {
  const a = dayjs(new Date());
  const testss = dayjs(timeISOString).from(a);
  // let date = `Gần đây`;
  // const getFullDate = new Date(timeISOString);
  // const getCurrentDate = new Date();

  // const getDay = `${
  //   getFullDate.getDate() < 10
  //     ? "0" + getFullDate.getDate()
  //     : getFullDate.getDate()
  // }/${
  //   getFullDate.getMonth() < 9
  //     ? "0" + (getFullDate.getMonth() + 1)
  //     : getFullDate.getMonth() + 1
  // }/${getFullDate.getFullYear()}`;
  // const getTime = `${
  //   getFullDate.getHours() < 10
  //     ? "0" + getFullDate.getHours()
  //     : getFullDate.getHours()
  // }:${
  //   getFullDate.getMinutes() < 10
  //     ? "0" + getFullDate.getMinutes()
  //     : getFullDate.getMinutes()
  // }:${
  //   getFullDate.getSeconds() < 10
  //     ? "0" + getFullDate.getSeconds()
  //     : getFullDate.getSeconds()
  // }`;
  // date = getDay + " " + getTime;
  // const hanldeConvert = DateThinh(getFullDate, getCurrentDate);
  // if (hanldeConvert) {
  //   return `${hanldeConvert}`;
  // }

  // return date;
  return testss;
};
export default convertTime;

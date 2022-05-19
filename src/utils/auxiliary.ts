import { IIngredient, TIdifiedIngredients } from "../shared/types/types";

const dayjs = require('dayjs')
const dayOfYear = require('dayjs/plugin/dayOfYear')
const isLeapYear = require('dayjs/plugin/isLeapYear')
dayjs.extend(isLeapYear);
dayjs.extend(dayOfYear);


function getDaysFromToday(number: number) {
  let n = number
  if (n === 0) {
    return 'Сегодня'
  }
  if (n === 1) {
    return 'Вчера'
  }
  n %= 100;
  if (n >= 5 && n <= 20) {
    return `${number} дней назад`;
  }
  n %= 10;
  if (n === 1) {
    return `${number} день назад`;
  }
  if (n >= 2 && n <= 4) {
    return `${number} дня назад`;
  }
  return `${number} дней назад`;
}

function getTimezoneOffset(date: Date) {
  let offset = date.getTimezoneOffset();
  let sign = offset < 0 ? '+' : '-';
  offset = Math.abs(offset);
  return sign + (offset / 60);
}

function getDaysSinceDate(sinceDate: string, baseDate?: string) {
  const dayjsOrderDate = dayjs(sinceDate);
  const dayjsNow = baseDate ? dayjs(baseDate): dayjs();
  const yearOrder = dayjsOrderDate.year();/*?*/
  const yearNow = dayjsNow.year();/*?*/

  let differenceDays = 0

  if (yearNow === yearOrder) {
    differenceDays = dayjsNow.dayOfYear() - dayjsOrderDate.dayOfYear();
  } else {
    differenceDays += dayjsNow.dayOfYear();
    for (let loopYear = yearOrder; loopYear < yearNow; loopYear++) {
      const isLeap = dayjs(`${loopYear}-01-01`).isLeapYear()

      if (loopYear === yearOrder) {
        if (isLeap) {
          differenceDays += 366 - dayjsOrderDate.dayOfYear();
        } else {
          differenceDays += 365 - dayjsOrderDate.dayOfYear();
        }
        continue;
      }

      if (isLeap) {
        differenceDays += 366;
      } else {
        differenceDays += 365;
      }
    }
  }

  return differenceDays;
}

function dateToOrderFormat(time: string) {
  if (!time) {
    return ''
  }

  const daysSinceDate = getDaysSinceDate(time);

/*"2022-01-01T05:55:59.831Z  "2022-01-01T05:55:59.831Z""*/
  const date = new Date(time);/*?*/
  const dateNow = new Date();/*?*/

  let formattedDaysFrom = getDaysFromToday(daysSinceDate);/*?*/

  const orderTimeHours = date.getHours().toString().padStart(2, '0');/*?*/
  const orderTimeMinutes = date.getMinutes().toString().padStart(2, '0');/*?*/
  const formattedOrderTime = `${orderTimeHours}:${orderTimeMinutes}`;/*?*/

  const timeZone = getTimezoneOffset(dateNow);/*?*/

  return `${formattedDaysFrom}, ${formattedOrderTime} i-GMT${timeZone}`
}

/*const time = "2020-05-19T20:55:59.831"
const from = dateToOrderFormat(time)*//*?*/

function getOrderStatus(status: string) {
  switch (status) {
    case 'created':
      return 'Создан';
    case 'pending':
      return 'Готовится'
    case 'done':
      return 'Выполнен'
    default:
      return '';
  }
}

function getIdifiedIngredients(ingredients: Array<IIngredient>) {
  const idifiedIngredients: TIdifiedIngredients = {}
  ingredients.forEach((ingredient) => {
    idifiedIngredients[ingredient._id] = ingredient
  })
  return idifiedIngredients;
}

export {
  dateToOrderFormat,
  getOrderStatus,
  getIdifiedIngredients,
  getDaysSinceDate,
}
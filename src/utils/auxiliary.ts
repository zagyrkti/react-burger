import { IIngredient, TIdifiedIngredients } from "../shared/types/types";

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

function dateToOrderFormat(time: string) {
  if(!time) {
    return ''
  }

  const date = new Date(time);/*?*/
  const dateNow = new Date();/*?*/
  let differenceDays = 0;
  if (dateNow.getMonth() === date.getMonth() && dateNow.getUTCFullYear() === date.getUTCFullYear()) {
    differenceDays = Math.abs(dateNow.getDay() - date.getDay());/*?*/
  } else {
    differenceDays = Math.abs(Math.floor((dateNow.getTime() - date.getTime()) / (60 * 60 * 24 * 1000)));
  }


  let formattedDaysFrom = getDaysFromToday(differenceDays);/*?*/

  const orderTimeHours = date.getHours().toString().padStart(2, '0');/*?*/
  const orderTimeMinutes = date.getMinutes().toString().padStart(2, '0');/*?*/
  const formattedOrderTime = `${orderTimeHours}:${orderTimeMinutes}`;/*?*/

  const timeZone = getTimezoneOffset(dateNow);/*?*/

  return `${formattedDaysFrom}, ${formattedOrderTime} i-GMT${timeZone}`
}

/*const time = "2022-05-08T21:11:49.442Z"
const from = dateToOrderFormat(time)/!*?*!/*/

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
}
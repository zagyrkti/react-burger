export interface IObjectKeys {
  [key: string]: string | number;
}

export interface IObjectKeysWithBoolean {
  [key: string]: string | number | boolean;
}

export interface IIngredient extends IObjectKeys {
  calories: number
  carbohydrates: number
  fat: number
  image: string
  image_large: string
  image_mobile: string
  name: string
  price: number
  proteins: number
  type: string
  uuid: string
  __v: number
  _id: string
}

export type TMoveCardHandler = (dragIndex: number, hoverIndex: number) => void;

export type TSetLinkStyle = (status: { isActive: boolean }) => string;

export interface IUserData {
  email: string,
  name: string,
}

export interface IRegisterData extends IUserData {
  password: string,
}

export interface ILoginData {
  email: string,
  password: string,
}

export interface IResetData {
  password: string,
  token: string,
}

export type TOrder = {
  "_id": string,
  "ingredients": Array<string>,
  "status": string,
  "name": string,
  "createdAt": string,
  "updatedAt": string,
  "number": number
}

export type TOrderData = {
  "success": boolean,
  "orders": Array<TOrder>,
  "total": number,
  "totalToday": number
}

export type TIdifiedIngredients = {[key: string]: IIngredient}
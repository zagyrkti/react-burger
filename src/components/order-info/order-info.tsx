import styles from './order-info.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { IIngredient, TIdifiedIngredients, TOrder } from "../../shared/types/types";
import { dateToOrderFormat, getIdifiedIngredients, getOrderStatus } from "../../utils/auxiliary";
import { WS_DISCONNECT, WS_INIT_CONNECTION } from "../../services/constants/socket";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Preloader from "../preloader/preloader";
import { getCookie } from "../../utils/cookies-auxiliary";

interface ILocationState {
  backgroundLocation?: Location
  orderData?: {
    order: TOrder,
    idifiedIngredients: TIdifiedIngredients
    total: number,
    date: string,
  }
}

function OrderInfo({isPopup} : {isPopup?: boolean}) {
  let location = useLocation();
  const dispatch = useAppDispatch();
  let { id } = useParams();
  const isFeed = location.pathname.includes('feed');
  const isHistory = location.pathname.includes('profile/orders')

  const ordersData = useAppSelector(state => state.socket.message);
  const ingredients = useAppSelector(state => state.ingredients.ingredients);


  let locationState: ILocationState = (location.state && typeof location.state === 'object') ? location.state : {};
  let order = locationState.orderData?.order;
  let idifiedIngredients = locationState.orderData?.idifiedIngredients;
  let total = locationState.orderData?.total;
  let date = locationState.orderData?.date;

  if (!isPopup && ordersData?.success && ingredients.length) {
    idifiedIngredients = getIdifiedIngredients(ingredients);
    order = ordersData.orders.find((item) => item._id === id)
  }

  useEffect(() => {
    if (!isPopup && isFeed) {
      dispatch({
        type: WS_INIT_CONNECTION,
        payload: 'wss://norma.nomoreparties.space/orders/all'
      })

      return () => {
        dispatch({
          type: WS_DISCONNECT
        });
      };
    }

    if(!isPopup && isHistory) {
      const token = getCookie('token')

      dispatch({
        type: WS_INIT_CONNECTION,
        payload: `wss://norma.nomoreparties.space/orders?token=${token}`
      })

      return () => {
        dispatch({
          type: WS_DISCONNECT
        });
      };
    }
  }, [dispatch, isPopup])

  let orderStatus = ''
  if (order?.status) {
    orderStatus = getOrderStatus(order?.status);
  }

  const uniqIngredents: {[key: string]: Array<IIngredient> } = {}
  order?.ingredients.forEach((id: string) => {
    if (idifiedIngredients) {
      uniqIngredents[id] ? uniqIngredents[id].push(idifiedIngredients[id]) : uniqIngredents[id] = [idifiedIngredients[id]];
    }
  })

  if (!total && uniqIngredents) {
    total = 0
    for (const property in uniqIngredents) {
      const ingredientsList = uniqIngredents[property];
      const ingredient = uniqIngredents[property][0];
      total += ingredient.price * ingredientsList.length
    }
  }

  if(!date && !isPopup && order?.createdAt) {
    date = dateToOrderFormat(order?.createdAt);
  }

  const ingredientElements: Array<JSX.Element> = [];

  for (const property in uniqIngredents) {
    const ingredientsList = uniqIngredents[property];
    const ingredient = uniqIngredents[property][0];

    ingredientElements.push(
        <div className={`${styles.ingredientData} mb-4`} key={ingredient._id}>
          <div className={`${styles.ingredientWrapper} mr-4`}>
            <img className={styles.ingredientImg} src={ingredient.image_mobile}
                 alt="ingredient" />
          </div>
          <p className={`${styles.ingredientName} text text_type_main-default mr-4`}>
            {ingredient.name}
          </p>
          <div className={styles.price}>
            <span className='text text_type_digits-default pr-2'>{`${ingredientsList.length} x ${ingredient.price}`}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
    )
  }

  if(!idifiedIngredients || !order?.status) {
    return <Preloader />
  }

  return (
      <div className={`${styles.orderInfo} ${isPopup ? 'p-10' : ''}`}>
        <p className={`${isPopup ? '' : styles.orderNumber} text text_type_digits-default mt-5`}>{`#${order?.number}`}</p>
        <h2 className='text text_type_main-medium mt-10'>{order?.name}</h2>
        <p className={`text text_type_main-default ${isPopup ? 'pt-2' : 'pt-3 pb-2'} ${order?.status === 'done' ? 'text_color_success' : ''}` }>
          {orderStatus}
        </p>
        <p className='text text_type_main-medium mt-15 pb-5'>Состав:</p>
        <ul className={`${styles.ingredientList} custom-scroll`}>
          {
            ingredientElements
          }
        </ul>
        <div className={`${styles.totalDateWrapper} mt-10 pt-2`}>
          <p className='text text_type_main-default text_color_inactive'>{date}</p>
          <div className={styles.price}>
            <span className='text text_type_digits-default pr-2'>{total}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
  )
}

export default OrderInfo;

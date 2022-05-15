import styles from "../../pages/profile-page/profile-page.module.css";
import OrderList from "../order-list/order-list";
import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { WS_DISCONNECT, WS_INIT_CONNECTION } from "../../services/constants/socket";
import { getIdifiedIngredients } from "../../utils/auxiliary";
import { getCookie } from "../../utils/cookies-auxiliary";
import Preloader from "../preloader/preloader";
import { TOrderData } from "../../shared/types/types";

function OrderHistory() {
  const orders = useAppSelector(state => state.socket.message);
  const ingredients = useAppSelector(state => state.ingredients.ingredients);
  const dispatch = useAppDispatch();

  useEffect( () => {
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
  }, [dispatch])

  const idifiedIngredients = useMemo(() => getIdifiedIngredients(ingredients),[ingredients]);


  if(!ingredients.length || !orders.success) {
    return <Preloader />
  }

  const reversedOrders: TOrderData = {
    ...orders,
    orders: [...orders.orders].reverse(),
  }

  return (
      <section className={`${styles.orderHistory} mt-9 ml-10 pt-2`}>
        <OrderList orderHistory={true} ordersData={reversedOrders} idifiedIngredients={idifiedIngredients}/>
      </section>
  )
}

export default OrderHistory;
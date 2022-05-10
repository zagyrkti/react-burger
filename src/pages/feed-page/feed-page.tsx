import styles from './feed-page.module.css';
import OrderList from "../../components/order-list/order-list";
import OrderStatistics from "../../components/order-statistics/order-statistics";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { WS_DISCONNECT, WS_INIT_CONNECTION } from "../../services/constants/socket";
import Preloader from "../../components/preloader/preloader";
import { getIdifiedIngredients } from "../../utils/auxiliary";

function FeedPage() {
  const orders = useAppSelector(state => state.socket.message);
  const ingredients = useAppSelector(state => state.ingredients.ingredients);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: WS_INIT_CONNECTION,
      payload: 'wss://norma.nomoreparties.space/orders/all'
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

  return (
      <main className={styles.feed}>
        <h2 className={`${styles.header} text text_type_main-large pt-10 pb-5 pl-2`}>Лента заказов</h2>
        <section className={styles.orderList}>
          <OrderList ordersData={orders} idifiedIngredients={idifiedIngredients}/>
        </section>
        <OrderStatistics />
      </main>
  )
}

export default FeedPage;
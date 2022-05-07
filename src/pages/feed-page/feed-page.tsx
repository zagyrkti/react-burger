import styles from './feed-page.module.css';
import OrderList from "../../components/order-list/order-list";
import OrderStatistics from "../../components/order-statistics/order-statistics";

function FeedPage() {

  return (
      <main className={styles.feed}>
        <h2 className={`${styles.header} text text_type_main-large pt-10 pb-5 pl-2`}>Лента заказов</h2>
        <section className={styles.orderList}>
          <OrderList />
        </section>
        <OrderStatistics />
      </main>
  )
}

export default FeedPage;
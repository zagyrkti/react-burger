import styles from './order-page.module.css'
import OrderInfo from "../../components/order-info/order-info";

function OrderPage() {

  return (
      <main>
        <section className={styles.orderPage}>
          <OrderInfo />
        </section>
      </main>
  )
}

export default OrderPage;
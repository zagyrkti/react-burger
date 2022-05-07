import styles from './order-list.module.css'
import OrderListCard from "../order-list-card/order-list-card";

function OrderList({ orderHistory }: { orderHistory?: boolean }) {

  return (
      <div className={`${styles.orderList} custom-scroll pr-2 pl-2`}>
        <OrderListCard className={orderHistory ? 'mb-6' : 'mb-4'} showStatus={orderHistory} />
        <OrderListCard className={orderHistory ? 'mb-6' : 'mb-4'} showStatus={orderHistory} />
        <OrderListCard className={orderHistory ? 'mb-6' : 'mb-4'} showStatus={orderHistory} />
        <OrderListCard className={orderHistory ? 'mb-6' : 'mb-4'} showStatus={orderHistory} />
        <OrderListCard className={orderHistory ? 'mb-6' : 'mb-4'} showStatus={orderHistory} />
      </div>
  )
}

export default OrderList;
import styles from './order-statistics.module.css'
import { useAppSelector } from "../../hooks/redux";
import { TOrder } from "../../shared/types/types";


function numberWithSpaces(number:number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


function OrderStatistics() {
  const ordersData = useAppSelector(state => state.socket.message);

  const doneOrders: Array<TOrder>  = [];
  const workingOnOrders: Array<TOrder>  = []

  ordersData.orders.forEach((item: TOrder) => {
    switch (item.status) {
      case 'done':
        doneOrders.push(item);
        break;
      case 'pending':
        workingOnOrders.push(item);
    }
  })

  return (
      <section className={styles.orderStatistics}>
        <div className={styles.orderStatuses}>
          <div className={`${styles.statusColumn} mr-10`}>
            <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
            <ul className={`${styles.statusList} text text_type_digits-default text_color_success custom-scroll`}>
              {
                doneOrders.map((item: TOrder) => (
                    <li className={`${styles.statusItem} pb-2`} key={item._id}>{item.number}</li>
                ))
              }
            </ul>
          </div>
          <div className={styles.statusColumn}>
            <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
            <ul className={`${styles.statusList} text text_type_digits-default custom-scroll`}>
              {
                workingOnOrders.map((item: TOrder) => (
                    <li className={`${styles.statusItem} pb-2`}>{item.number}</li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className='mt-10 pt-3'>
          <h3 className='text text_type_main-medium'>Выполнено за все время:</h3>
          <p className={`text text_type_digits-large ${styles.orderTotal}`}>{numberWithSpaces(ordersData.total)}</p>
        </div>
        <div className='mt-15'>
          <h3 className='text text_type_main-medium'>Выполнено за сегодня:</h3>
          <p className={`text text_type_digits-large ${styles.orderTotal}`}>{ordersData.totalToday}</p>
        </div>
      </section>
  )
}

export default OrderStatistics;
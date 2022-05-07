import styles from './order-statistics.module.css'

function numberWithSpaces(number:number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function OrderStatistics() {

  return (
      <section className={styles.orderStatistics}>
        <div className={styles.orderStatuses}>
          <div className={`${styles.statusColumn} mr-10`}>
            <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
            <ul className={`${styles.statusList} text text_type_digits-default text_color_success custom-scroll`}>
              <li className={`${styles.statusItem} pb-2`}>034533</li>
              <li className={`${styles.statusItem} pb-2`}>034533</li>
              <li className={`${styles.statusItem} pb-2`}>034533</li>
              <li className={`${styles.statusItem} pb-2`}>034533</li>
              <li className={`${styles.statusItem} pb-2`}>034533</li>
            </ul>
          </div>
          <div className={styles.statusColumn}>
            <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
            <ul className={`${styles.statusList} text text_type_digits-default custom-scroll`}>
              <li className={`${styles.statusItem} pb-2`}>034533</li>
              <li className={`${styles.statusItem} pb-2`}>034533</li>
              <li className={`${styles.statusItem} pb-2`}>034533</li>
            </ul>
          </div>
        </div>
        <div className='mt-10 pt-3'>
          <h3 className='text text_type_main-medium'>Выполнено за все время:</h3>
          <p className={`text text_type_digits-large ${styles.orderTotal}`}>{numberWithSpaces(28752)}</p>
        </div>
        <div className='mt-15'>
          <h3 className='text text_type_main-medium'>Выполнено за сегодня:</h3>
          <p className={`text text_type_digits-large ${styles.orderTotal}`}>138</p>
        </div>
      </section>
  )
}

export default OrderStatistics;
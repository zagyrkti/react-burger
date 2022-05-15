import styles from './order-list.module.css'
import OrderListCard from "../order-list-card/order-list-card";
import { TIdifiedIngredients, TOrder, TOrderData } from "../../shared/types/types";

interface IOrderList {
  ordersData: TOrderData,
  idifiedIngredients: TIdifiedIngredients,
  orderHistory?: boolean
}

function OrderList({ ordersData, idifiedIngredients, orderHistory }: IOrderList) {

  return (
      <div className={`${styles.orderList} custom-scroll pr-2 pl-2`}>
        {
          ordersData.orders.map((order: TOrder) =>
              <OrderListCard key={order._id}
                             idifiedIngredients={idifiedIngredients}
                             order={order}
                             className={orderHistory ? 'mb-6' : 'mb-4'}
                             showStatus={orderHistory} />
          )
        }
      </div>
  )
}

export default OrderList;
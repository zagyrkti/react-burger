import React from "react";
import styles from './order-details.module.css'
import orderAccepted from '../../images/orderAccepted.gif'
import loader from '../../images/loader.gif'
import { useAppSelector } from "../../hooks/redux";

function OrderDetails() {

  const orderDetailsData = useAppSelector((store) => store.order.orderDetails);
  const isRequestFailed = useAppSelector((store) => store.order.isRequestFailed);
  const isRequestSent = useAppSelector((store) => store.order.isRequestSent);

  return (
      <>
        <div className={`${styles.orderDetails} pt-30 pb-30 pl-25 pr-25`}>
          {isRequestSent &&
              <>
                <span className={`${styles.orderId} text text_type_digits-large`}>....</span>
                <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
                <img src={loader} alt="" className={`${styles.orderAccepted} mt-15`} />
                <p className="text text_type_main-default mt-15">Ваш заказ обрабатывается</p>
                <p className="text text_type_main-default text_color_inactive mt-2">Еще чуть чуть</p>
              </>
          }
          {orderDetailsData.success &&
              <>
                <span className={`${styles.orderId} text text_type_digits-large`}>{orderDetailsData.order.number}</span>
                <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
                <img src={orderAccepted} alt="" className={`${styles.orderAccepted} mt-15`} />
                <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive mt-2">Дождитесь готовности на орбитальной
                  станции</p>
              </>
          }
          {isRequestFailed &&
              <>
                <p className="text text_type_main-default mt-15">Возникли проблемы при обработке заказа</p>
                <p className="text text_type_main-default text_color_inactive mt-2">Попробуйте оформить заказ еще
                  раз</p>
              </>
          }
        </div>
      </>
  )
}

export default OrderDetails;

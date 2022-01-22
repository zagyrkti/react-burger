import React from "react";
import styles from './order-details.module.css'
import orderAccepted from '../../images/orderAccepted.gif'
import PropTypes from 'prop-types';

function OrderDetails({orderDetailsData}) {


  return (
      <>
          <div className={`${styles.orderDetails} pt-30 pb-30 pl-25 pr-25`}>
            <span className={`${styles.orderId} text text_type_digits-large`}>{orderDetailsData.order.number}</span>
            <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
            <img src={orderAccepted} alt="" className={`${styles.orderAccepted} mt-15`}/>
            <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-2">Дождитесь готовности на орбитальной станции</p>
          </div>
      </>
  )
}

OrderDetails.propTypes = {
  orderDetailsData: PropTypes.shape({
    name: PropTypes.string,
    order: PropTypes.shape({
      number: PropTypes.number.isRequired
    }).isRequired,
    success: PropTypes.bool,
  }).isRequired,
}

export default OrderDetails;

import React from "react";
import styles from './order-details.module.css'
import Modal from "../modal/modal";
import orderAccepted from '../../images/orderAccepted.gif'
import ingredientShape from "../../utils/proptypes";
import PropTypes from "prop-types";
import IngredientDetails from "../ingredient-details/ingredient-details";

function OrderDetails(props) {


  return (
      <Modal onClose={props.onClose}>
          <div className={`${styles.orderDetails} pt-30 pb-30 pl-25 pr-25`}>
            <span className={`${styles.orderId} text text_type_digits-large`}>034536</span>
            <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
            <img src={orderAccepted} alt="" className={`${styles.orderAccepted} mt-15`}/>
            <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-2">Дождитесь готовности на орбитальной станции</p>
          </div>
      </Modal>
  )
}

IngredientDetails.propTypes = {
  onClose:PropTypes.func.isRequired,
}

export default OrderDetails;

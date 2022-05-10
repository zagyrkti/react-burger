import styles from './order-list-card.module.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { IIngredient, TIdifiedIngredients, TOrder } from "../../shared/types/types";
import { dateToOrderFormat, getOrderStatus } from "../../utils/auxiliary";
import { Link, useLocation } from "react-router-dom";

interface IOrderListCard {
  idifiedIngredients: TIdifiedIngredients,
  order: TOrder,
  className?: string,
  showStatus?: boolean
}

function OrderListCard({ idifiedIngredients, order, className, showStatus }: IOrderListCard) {
  const location = useLocation();

  const orderIngredientsData: Array<IIngredient> = order.ingredients.map((id: string) => {
    return idifiedIngredients[id]
  })

  const bun: Array<IIngredient> = [];
  const topping: Array<IIngredient> = []

  orderIngredientsData.forEach((item) => {
    item?.type === 'bun' ? bun.push(item) : topping.push(item)
  })

  const conformedWithRenderFormatOrderIngredientsData = bun.length ? [bun[0], ...topping] : topping

  const total = orderIngredientsData.reduce((accumulator, item) => {
    if (item?.price) {
      return accumulator + item.price
    }
    return 0
  }, 0)

  const ingredientImagesToRender =
      conformedWithRenderFormatOrderIngredientsData.map((item, index) => {
        if (index > 5) {
          return null;
        }
        if (index < 5) {
          return (
              <div className={styles.ingredientWrapper} key={index}>
                <img className={styles.ingredient} src={item?.image_mobile} alt="ingredient" />
              </div>
          )
        }
        return (
            <div className={styles.ingredientWrapper} key={index}>
              <div className={`${styles.ingredientsHiddenNumber} text text_type_main-default`}>
                {`+${orderIngredientsData.length - index}`}
              </div>
              <img className={styles.ingredient} src={item?.image_mobile} alt="ingredient" />
            </div>
        )
      })

  const date = dateToOrderFormat(order?.createdAt);
  const orderStatus = getOrderStatus(order?.status);

  return (
      <div className={`${styles.orderListCard} ${className}`}>
        <Link to={`${location.pathname}/${order._id}`}
              state={{ backgroundLocation: location, orderData: {idifiedIngredients, order, total, date}}}
              className={`${styles.link} p-6`}
        >
          <div className={styles.orderInfo}>
            <p className='text text_type_digits-default'>{`#${order.number}`}</p>
            <p className='text text_type_main-default text_color_inactive'>{date}</p>
          </div>
          <h3 className='text text_type_main-medium mt-6'>{order.name}</h3>
          {showStatus &&
              <p className={`text text_type_main-default mt-2 ${order?.status === 'done' ? 'text_color_success' : ''}`}>
                {orderStatus}
              </p>
          }
          <div className={`mt-6 ${styles.ingredientsPriceWrapper}`}>
            <div className={styles.ingredientList}>
              {
                ingredientImagesToRender
              }
            </div>
            <div className={styles.priceWrapper}>
              <span className='text text_type_digits-default mr-2'>{total}</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </Link>
      </div>
  )
}

export default OrderListCard;
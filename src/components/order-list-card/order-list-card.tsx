import styles from './order-list-card.module.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

const ingredients = [
  "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
  "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
  "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  "https://code.s3.yandex.net/react/code/meat-02-mobile.png",

  "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
  "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
]


function OrderListCard({ className, showStatus }: { className?: string, showStatus?: boolean }) {

  const ingredientsToRender = ingredients.map((item, index) => {
    if (index > 5) {
      return null;
    }
    if (index < 5) {
      return (
          <div className={styles.ingredientWrapper} key={index}>
            <img className={styles.ingredient} src={item} alt="ingredient" />
          </div>
      )
    }
    return (
        <div className={styles.ingredientWrapper} key={index}>
          <div className={`${styles.ingredientsHiddenNumber} text text_type_main-default`}>
            {`+${ingredients.length - index}`}
          </div>
          <img className={styles.ingredient} src={item} alt="ingredient" />
        </div>
    )
  })

  return (
      <div className={`${styles.orderListCard} ${className}`}>
        <div className='p-6'>
          <div className={styles.orderInfo}>
            <p className='text text_type_digits-default'>#034535</p>
            <p className='text text_type_main-default text_color_inactive'>Сегодня, 16:20 i-GMT+3</p>
          </div>
          <h3 className='text text_type_main-medium mt-6'>Death Star Starship Main бургер</h3>
          {showStatus &&
            <p className={`text text_type_main-default text_color_success mt-2`}>Выполнен</p>
          }
          <div className={`mt-6 ${styles.ingredientsPriceWrapper}`}>
            <div className={styles.ingredientList}>
              {
                ingredientsToRender
              }
            </div>
            <div className={styles.priceWrapper}>
              <span className='text text_type_digits-default mr-2'>480</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
  )
}

export default OrderListCard;
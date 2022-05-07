import styles from './order-info.module.css';
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

function OrderInfo({isPopup} : {isPopup?: boolean}) {

  return (
      <div className={`${styles.orderInfo} ${isPopup ? 'p-10' : ''}`}>
        <p className={`${isPopup ? '' : styles.orderNumber} text text_type_digits-default mt-5`}>#034533</p>
        <h2 className='text text_type_main-medium mt-10'>Black Hole Singularity острый бургер</h2>
        <p className={`text text_type_main-default text_color_success ${isPopup ? 'pt-2' : 'pt-3 pb-2'}`}>Выполнен</p>
        <p className='text text_type_main-medium mt-15'>Состав:</p>
        <ul className={`${styles.ingredientList} custom-scroll`}>
          {
            ingredients.map((item, index) => (
                <div className={`${styles.ingredientData} mt-4`}>
                  <div className={`${styles.ingredientWrapper} mr-4`}>
                    <img className={styles.ingredientImg} src={item}
                         alt="ingredient" />
                  </div>
                  <p className={`${styles.ingredientName} text text_type_main-default mr-4`}>
                    {index === 1 ? 'Филе Люминесцентного тетраодонтимформа' : 'Флюоресцентная булка R2-D3'}
                  </p>
                  <div className={styles.price}>
                    <span className='text text_type_digits-default pr-2'>{`2 x 20`}</span>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
            ))
          }
        </ul>
        <div className={`${styles.totalDateWrapper} mt-10 pt-2`}>
          <p className='text text_type_main-default text_color_inactive'>Вчера, 13:50 i-GMT+3</p>
          <div className={styles.price}>
            <span className='text text_type_digits-default pr-2'>510</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
  )
}

export default OrderInfo;

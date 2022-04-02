import React from "react";
import styles from './ingredient-details.module.css'
import ingredientShape from "../../utils/proptypes";
import { useSelector } from 'react-redux';

function IngredientDetails() {

  const clickedIngredient = useSelector((store) => store.ingredientDetails.selectedIngredient)

  return (
      <>
        <div className={`${styles.ingredientDetails} pt-10 pl-10 pr-10 pb-15`}>
          <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
          <img src={clickedIngredient.image_large} className={styles.img} alt=""/>
          <p className="text text_type_main-medium mt-4">{clickedIngredient.name}</p>

          <div className={`${styles.infoBlock} mt-8`}>
            <div className={`${styles.infoItem} mr-5`}>
              <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
              <p className="text text_type_digits-default mt-2">{clickedIngredient.calories}</p>
            </div>
            <div className={`${styles.infoItem} mr-5`}>
              <p className="text text_type_main-default text_color_inactive">Белки, г</p>
              <p className="text text_type_digits-default mt-2">{clickedIngredient.proteins}</p>
            </div>
            <div className={`${styles.infoItem} mr-5`}>
              <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
              <p className="text text_type_digits-default mt-2">{clickedIngredient.fat}</p>
            </div>
            <div className={`${styles.infoItem}`}>
              <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
              <p className="text text_type_digits-default mt-2">{clickedIngredient.carbohydrates}</p>
            </div>
          </div>

        </div>

      </>
  )
}

/*IngredientDetails.propTypes = {
  ingredient: ingredientShape.isRequired,
}*/

export default IngredientDetails;

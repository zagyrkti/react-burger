import React from "react";
import styles from './ingredient-details.module.css'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function IngredientDetails() {
  let { id } = useParams();

  let ingredient = useSelector((store) => store.ingredientDetails.selectedIngredient)
  const ingredients = useSelector((store) => store.ingredients.ingredients);

  if (!ingredient?._id && ingredients.length) {
    ingredient = ingredients.find((ingredient) => ingredient._id === id);
  }

  return (
      <>
        {ingredient?._id &&
          <div className={`${styles.ingredientDetails} pt-10 pl-10 pr-10 pb-15`}>
            <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
            <img src={ingredient.image_large} className={styles.img} alt="" />
            <p className="text text_type_main-medium mt-4">{ingredient.name}</p>

            <div className={`${styles.infoBlock} mt-8`}>
              <div className={`${styles.infoItem} mr-5`}>
                <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                <p className="text text_type_digits-default mt-2">{ingredient.calories}</p>
              </div>
              <div className={`${styles.infoItem} mr-5`}>
                <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                <p className="text text_type_digits-default mt-2">{ingredient.proteins}</p>
              </div>
              <div className={`${styles.infoItem} mr-5`}>
                <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                <p className="text text_type_digits-default mt-2">{ingredient.fat}</p>
              </div>
              <div className={`${styles.infoItem}`}>
                <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                <p className="text text_type_digits-default mt-2">{ingredient.carbohydrates}</p>
              </div>
            </div>

          </div>
        }

      </>
  )
}

export default IngredientDetails;

import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from './ingredient-card.module.css';
import PropTypes from "prop-types";
import ingredientShape from "../../utils/proptypes";

function IngredientCard(props) {

  const ingredient = props.ingredient;

  return (
      <div className={`${styles.ingredientCard} mt-6`}
           onClick={(event) => props.onClick(event, ingredient)}
      >
        <Counter count={1} size="default"/>
        <img src={ingredient.image} alt="" className={`${styles.ingredientImage} pl-4 pr-4`}/>
        <div className={`${styles.price} mt-1`}>
          <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
          <CurrencyIcon type="primary"/>
        </div>
        <p className={`${styles.ingredientName} mt-2 text text_type_main-default`}>{ingredient.name}</p>
      </div>
  )
}

IngredientCard.propTypes = {
  ingredient: ingredientShape.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default IngredientCard;

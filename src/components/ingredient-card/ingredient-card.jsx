import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo } from "react";
import styles from './ingredient-card.module.css';
import PropTypes from "prop-types";
import ingredientShape from "../../utils/proptypes";
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

function IngredientCard(props) {
  const ingredient = props.ingredient;
  const constructorIngredients = useSelector((store) => store.burgerConstructor.topping);
  const constructorBun = useSelector((store) => store.burgerConstructor.bun);

  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const counter = useMemo(() => {
    const ingredientInstancesInConstructor = [...constructorIngredients, constructorBun]
        .filter((constructorIngredient) => ingredient._id === constructorIngredient._id)

    return ingredientInstancesInConstructor.length
  },[constructorIngredients, constructorBun, ingredient._id]);

  return (
      <div className={`${styles.ingredientCard} mt-6`}
           onClick={(event) => props.onClick(event, ingredient)}
           ref={dragRef}
      >
        {!!counter && <Counter count={counter} size="default" />}
        <img src={ingredient.image} alt="" className={`${styles.ingredientImage} pl-4 pr-4`} />
        <div className={`${styles.price} mt-1`}>
          <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
          <CurrencyIcon type="primary" />
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

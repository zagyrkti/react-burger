import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useMemo } from "react";
import styles from './ingredient-card.module.css';
import { useDrag } from 'react-dnd';
import { ADD_INGREDIENT_TO_SELECTED } from '../../services/actions';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IIngredient } from "../../shared/types/types";

interface IIngredientCard {
  ingredient: IIngredient,
}

const IngredientCard: FC<IIngredientCard> = (props) => {
  const dispatch = useAppDispatch();
  const ingredient = props.ingredient;
  let location = useLocation();

  const constructorIngredients: Array<IIngredient> = useAppSelector((store) => store.burgerConstructor.topping);
  const constructorBun: IIngredient = useAppSelector((store) => store.burgerConstructor.bun);

  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const handleIngredientClick = () => {
    dispatch({
      type: ADD_INGREDIENT_TO_SELECTED,
      payload: ingredient,
    });
  }

  const counter = useMemo(() => {
    const ingredientInstancesInConstructor = [...constructorIngredients, constructorBun, constructorBun]
        .filter((constructorIngredient) => ingredient._id === constructorIngredient._id)

    return ingredientInstancesInConstructor.length
  }, [constructorIngredients, constructorBun, ingredient._id]);

  return (
      <Link to={`/ingredients/${ingredient._id}`}
            state={{ backgroundLocation: location }}
            className={`${styles.ingredientCard} mt-6 text_color_primary`}
            onClick={handleIngredientClick}
            ref={dragRef}
      >
        {!!counter && <Counter count={counter} size="default" />}
        <img src={ingredient.image} alt="" className={`${styles.ingredientImage} pl-4 pr-4`} />
        <div className={`${styles.price} mt-1`}>
          <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.ingredientName} mt-2 text text_type_main-default`}>{ingredient.name}</p>
      </Link>
  )
}

export default IngredientCard;

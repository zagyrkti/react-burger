import styles from './burger-constructor.module.css';
import { ConstructorElement, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import currencyIconBig from '../../images/Subtract.svg'
import React, { useMemo } from "react";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { v4 as uuidv4 } from 'uuid';
import { useDrop } from 'react-dnd';
import ConstructorToppingCard from '../constructor-topping-card/constructor-topping-card';
import {
  ADD_BUN_TO_CONSTRUCTOR, ADD_TOPPING_TO_CONSTRUCTOR, REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  placeOrderAction, SWITCH_ORDER_DETAILS_MODAL_STATE, UPDATE_TOPPING_ORDER,
} from '../../services/actions';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookies-auxiliary';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IIngredient, IUserData, TMoveCardHandler } from "../../shared/types/types";

type TOnDropHandler = (data: { ingredient: IIngredient }) => void;

type TGetIngredientsPropertyValues = (
    topping: Array<IIngredient>,
    bun: IIngredient,
    property: string
) => Array<string | number>;

function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const modalState = useAppSelector((state) => state.order.isModalOpen);
  const constructorIngredients: Array<IIngredient> = useAppSelector((store) => store.burgerConstructor.topping);
  const bun: IIngredient = useAppSelector((store) => store.burgerConstructor.bun);
  const userData: IUserData = useAppSelector((store) => store.user.userData);

  const changeOderModalState = () => {
    dispatch({
      type: SWITCH_ORDER_DETAILS_MODAL_STATE
    })
  }

  const getIngredientsPropertyValues: TGetIngredientsPropertyValues = (topping, bun, property) => {
    const values: Array<string | number> = [];
    topping.forEach((ingredient) => values.push(ingredient[property]));
    if (bun) {
      values.push(bun[property])
      values.push(bun[property])
    }
    return values;
  }

  const handleOrder = async () => {
    if (!userData.name) {
      navigate('/login')
      return;
    }

    const idList = getIngredientsPropertyValues(constructorIngredients, bun, '_id')
    setTimeout(changeOderModalState, 250);
    dispatch(placeOrderAction(idList, getCookie('token')));
  }

  const handleDeleteBtnClick = (uuid: string) => {
    dispatch({
      type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      payload: uuid,
    })
  }

  const onDropHandler: TOnDropHandler = ({ ingredient }) => {
    const uuid = uuidv4();
    if (ingredient.type !== 'bun') {
      dispatch({
        type: ADD_TOPPING_TO_CONSTRUCTOR,
        payload: { ...ingredient, uuid }
      })
    }
    if (ingredient.type === 'bun') {
      dispatch({
        type: ADD_BUN_TO_CONSTRUCTOR,
        payload: ingredient
      })
    }
  }

  const moveCardHandler: TMoveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = constructorIngredients[dragIndex];

    const coppiedStateArray = [...constructorIngredients];
    coppiedStateArray.splice(dragIndex, 1,);
    coppiedStateArray.splice(hoverIndex, 0, dragItem);

    dispatch({
      type: UPDATE_TOPPING_ORDER,
      payload: coppiedStateArray
    });
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient: { ingredient: IIngredient }) {
      onDropHandler(ingredient);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const constructedBurgerTargeted = isHover ? styles.constructedBurgerTargeted : '';

  const total = useMemo(() => {
    return [...constructorIngredients, bun].reduce((accumulator, item) => {
      if (item.type === 'bun') {
        return accumulator + item.price + item.price;
      }
      if (item.price) {
        return accumulator + item.price
      }
      return 0
    }, 0)
  }, [bun, constructorIngredients])

  return (
      <section className={`${styles.burgerConstructor} mt-20 pl-4`}>
        <div className={`${styles.constructedBurger} ${constructedBurgerTargeted} pt-5 pb-5`} ref={dropTarget}>
          <div className={`pl-7 ${styles.bunWrapper}`}>
            {!!bun.type &&
                <ConstructorElement type="top"
                                    isLocked={true}
                                    text={`${bun.name} (верх)`}
                                    price={bun.price}
                                    thumbnail={bun.image}
                />}

            {!bun.type &&
                <div className={`${styles.placeholderBun} ${styles.placeholderBunTypeTop}`}>Перетащите булку по
                  вкусу</div>
            }
          </div>

          <div className={`${styles.innerIngredients} custom-scroll pr-2`}>
            {constructorIngredients.map((ingredient, index) => {
                  return (
                      <ConstructorToppingCard key={ingredient.uuid}
                                              ingredient={ingredient}
                                              index={index}
                                              moveCard={moveCardHandler}
                                              onClose={handleDeleteBtnClick}
                      />
                  )
                }
            )}
            {!constructorIngredients.length &&
                <p className={styles.callText}>Накидайте начинки</p>
            }
          </div>

          <div className={`pl-7 ${styles.bunWrapper}`}>
            {!!bun.type &&
                <ConstructorElement type="bottom"
                                    isLocked={true}
                                    text={`${bun.name} (низ)`}
                                    price={bun.price}
                                    thumbnail={bun.image}
                />}
            {!bun.type &&
                <div className={`${styles.placeholderBun} ${styles.placeholderBunTypeBottom}`}>Перетащите булку по
                  вкусу</div>
            }
          </div>
        </div>

        <div className={`${styles.info} mt-5 pr-4`}>
          <span className="text text_type_digits-medium mr-2">{total}</span>
          <img src={currencyIconBig} alt="" />
          <span className="pr-10"> </span>
          <Button type="primary" size="large" onClick={handleOrder}>
            Оформить заказ
          </Button>
        </div>

        {modalState &&
            <Modal onClose={changeOderModalState}>
              <OrderDetails />
            </Modal>
        }

      </section>
  )
}

export default BurgerConstructor;

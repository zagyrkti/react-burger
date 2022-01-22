import styles from './burger-constructor.module.css';
import {ConstructorElement, DragIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import currencyIconBig from '../../images/Subtract.svg'
import React, {useEffect} from "react";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {v4 as uuidv4} from 'uuid';
import BurgerConstructorContext from '../../contexts/burger-constructor-context';
import orderApi from '../../utils/api';

function BurgerConstructor() {

  const [modalState, setModalState] = React.useState(false);

  const [orderDetailsData, setOrderDetailsData] = React.useState({
    name: '...loading',
    order: {
      number: '...loading',
    },
    success: false
  });

  const handleModal = () => {
    setModalState(!modalState);
    orderApi(randomBurger)
        .then((orderData) => {
          setOrderDetailsData(orderData)
        })
        .catch(console.log)
  }

  const randomBurger = React.useContext(BurgerConstructorContext)

  const randomBurgerBun = randomBurger.filter((item) => item.type === 'bun');
  const randomBurgerIngredients = randomBurger.filter((item) => item.type !== 'bun');

  function reducer(state, data) {
    return data.reduce((accumulator, item) => {
      if (item.type === 'bun') {
        return accumulator + item.price + item.price;
      }
      return accumulator + item.price
    }, 0)
  }

  const [total, setTotal] = React.useReducer(reducer, 0, undefined);


  useEffect(() => {
    setTotal(randomBurger);
  }, [randomBurger])

  return (
      <section className={`${styles.burgerConstructor} mt-25 pl-4`}>
        <div className={`${styles.constructedBurger}`}>
          <span className="pl-2">
              {randomBurgerBun.length &&
              <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${randomBurgerBun[0].name} (верх)`}
                  price={randomBurgerBun[0].price}
                  thumbnail={randomBurgerBun[0].image}
              />}
          </span>

          <div className={`${styles.innerIngredients} custom-scroll pr-2`}>
            {
              randomBurgerIngredients.map((item) =>
                  <div className={styles.innerIngredient} key={uuidv4()}>
                    <DragIcon type="primary"/>
                    <span className="pl-2"> </span>
                    <ConstructorElement
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                    />
                  </div>
              )}
          </div>
          <span className="pl-2">
            {randomBurgerBun.length &&
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${randomBurgerBun[0].name} (низ)`}
                price={randomBurgerBun[0].price}
                thumbnail={randomBurgerBun[0].image}
            />}
          </span>
        </div>
        <div className={`${styles.info} mt-10 pr-4`}>
          <span className="text text_type_digits-medium mr-2">{total}</span>
          <img src={currencyIconBig} alt=""/>
          <span className="pr-10"> </span>
          <Button type="primary" size="large" onClick={handleModal}>
            Оформить заказ
          </Button>
        </div>

        {modalState && orderDetailsData.success &&
        <Modal onClose={handleModal}>
          <OrderDetails orderDetailsData={orderDetailsData}/>
        </Modal>
        }

      </section>
  )
}

/*BurgerIngredients.propTypes = {
  ingredientData: PropTypes.shape({
    buns: PropTypes.arrayOf(ingredientShape).isRequired,
    main: PropTypes.arrayOf(ingredientShape).isRequired,
    sauce: PropTypes.arrayOf(ingredientShape).isRequired,
  }).isRequired
}*/

export default BurgerConstructor;

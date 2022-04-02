import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link} from "react-router-dom"
import styles from './app-header.module.css';

function AppHeader() {

  return (
      <header className={`${styles.header} pt-4 pb-4`}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <Link to={'/'} className={`${styles.link} pt-4 pb-4 pl-5 pr-5`}>
                <BurgerIcon type="primary"/>
                <span className="text text_type_main-default ml-2">Конструктор</span>
              </Link>
            </li>
            <li className="ml-2">
              <Link to={'/'} className={`${styles.link} pt-4 pb-4 pl-5 pr-5`}>
                <ListIcon type="secondary"/>
                <span className="text text_type_main-default text_color_inactive ml-2">Лента заказов</span>
              </Link>
            </li>
            <li className={`${styles.item_type_logo} mt-1`}>
              <Link to={'/'} className={styles.link}>
                <Logo/>
              </Link>
            </li>
            <li className={styles.item_pos_left}>
              <Link to={'/profile'} className={`${styles.link}  pt-4 pb-4 pl-5 pr-5`}>
                <ProfileIcon type="secondary"/>
                <span className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
  )
}

export default AppHeader;

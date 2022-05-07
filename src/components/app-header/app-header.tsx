import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from "react-router-dom"
import styles from './app-header.module.css';
import { TSetLinkStyle } from "../../shared/types/types";

function AppHeader() {

  const setLinkStyle: TSetLinkStyle = ({ isActive }) => {
    return isActive
        ? `${styles.link} pt-4 pb-4 pl-5 pr-5 text text_type_main-default text_color_primary`
        : `${styles.link} pt-4 pb-4 pl-5 pr-5 text text_type_main-default text_color_inactive`
  }

  return (
      <header className={`${styles.header} pt-4 pb-4`}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <NavLink to='/' className={setLinkStyle}>
                {({ isActive }) => (
                    <>
                      <BurgerIcon type={isActive ? "primary" : "secondary"} />
                      <span className="ml-2">Конструктор</span>
                    </>
                )}
              </NavLink>
            </li>
            <li className="ml-2">
              <NavLink to='/feed' className={setLinkStyle}>
                {({ isActive }) => (
                    <>
                      <ListIcon type={isActive ? "primary" : "secondary"} />
                      <span className="ml-2">Лента заказов</span>
                    </>
                )}
              </NavLink>
            </li>
            <li className={`${styles.item_type_logo} mt-1`}>
              <NavLink to='/' className={styles.link}>
                <div className={styles.logoWrapper}>
                  <Logo />
                </div>
              </NavLink>
            </li>
            <li className={styles.item_pos_left}>
              <NavLink to='/profile' className={setLinkStyle}>
                {({ isActive }) => (
                    <>
                      <ProfileIcon type={isActive ? "primary" : "secondary"} />
                      <span className="ml-2">Личный кабинет</span>
                    </>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
  )
}

export default AppHeader;

import styles from './redirect-call.module.css';
import { Link } from 'react-router-dom';
import { FC } from "react";

interface IRedirectCall {
  className: string,
  message: string,
  toPath: string,
  toText: string
}

const RedirectCall: FC<IRedirectCall> = (props) => {
  const style = props.className ? props.className : '';

  return (
      <div className={`${style} text text_type_main-default text_color_inactive`}>
        <p className={styles.message}>{props.message}</p>
        <Link to={props.toPath} className={styles.link}>{props.toText}</Link>
      </div>
  )
}

export default RedirectCall;
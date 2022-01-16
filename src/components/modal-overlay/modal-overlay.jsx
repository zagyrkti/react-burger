import React, {useCallback} from "react";
import ReactDOM from "react-dom";
import styles from './modal-overlay.module.css';
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal");

function ModalOverlay(props) {

  const {onClick} = props;

  const handleCloseByEsc = useCallback((event) => {
    if (event.key === "Escape") {
      onClick();
    }
  },[onClick])

  React.useEffect(() => {
    document.addEventListener("keydown", handleCloseByEsc);

    return () => {
      document.removeEventListener("keydown", handleCloseByEsc);
    }
  }, [handleCloseByEsc])


  const modalOverlayRef = React.useRef();

  const onOverlayClick = (event) => {
    if (event.target === modalOverlayRef.current) {
      props.onClick();
    }
  }

  return ReactDOM.createPortal(
      <div className={styles.modalOverlay} onClick={onOverlayClick} ref={modalOverlayRef}>
        {props.children}
      </div>,
      modalRoot
  );
}

ModalOverlay.propTypes = {
  onClick:PropTypes.func,
}

export default ModalOverlay;


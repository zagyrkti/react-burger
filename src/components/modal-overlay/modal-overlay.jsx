import React from "react";
import styles from './modal-overlay.module.css';
import PropTypes from "prop-types";


function ModalOverlay(props) {

  const modalOverlayRef = React.useRef();

  const onOverlayClick = (event) => {
    if (event.target === modalOverlayRef.current) {
      props.onClick();
    }
  }

  return (
      <div className={styles.modalOverlay} onClick={onOverlayClick} ref={modalOverlayRef}>
        {props.children}
      </div>
  );
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default ModalOverlay;


import {Fragment} from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom'

const Backdrop = (props) => {
  return (
    <div onClick={props.onHideCart} className={classes.backdrop}></div>
  );
};

const ModalOverlay = props => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        {props.children}
      </div>
    </div>
  );
};

const portalElement = document.getElementById('overlays')

const Modal = props => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onHideCart={props.onHideCart} />, portalElement )}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement )}
    </Fragment>
  );
};

export default Modal;

//  Alternative way
// const Modal = props => {
//   return (
//     <Fragment>
//       <Backdrop />
//       <ModalOverlay>
//         {props.children}
//       </ModalOverlay>
//     </Fragment>

//   );
// };
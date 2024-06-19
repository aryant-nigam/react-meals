import classes from "./snackbar.module.css";
import { Fragment, useContext } from "react";
import ReactDOM from "react-dom";
import BackdropContext from "../../store/backdrop-context";

const Snackbar = (props) => {
  const footer = document.getElementById("footer");
  const windowHeight = window.innerHeight;
  const backdropCtx = useContext(BackdropContext);

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={classes.snackbar}>
          <span className={classes.msg}>{backdropCtx.snackBarMessage}</span>
          <button
            className={classes.action}
            onClick={backdropCtx.onHideSnackbar}
          >
            X
          </button>
        </div>,
        footer
      )}
    </Fragment>
  );
};
export default Snackbar;

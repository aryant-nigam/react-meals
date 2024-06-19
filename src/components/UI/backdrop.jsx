import classes from "./backdrop.module.css";
import { Fragment, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import BackdropContext from "../../store/backdrop-context";

const PortalElement = document.getElementById("overlays");

const Backdrop = (props) => {
  const backdropCtx = useContext(BackdropContext);

  useEffect(() => {
    backdropCtx.prohibitScroll(backdropCtx.isBackdropVisible);
  }, [backdropCtx.isBackdropVisible]);

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={classes.backdrop} style={{ top: window.scrollY }}>
          {props.children}
        </div>,
        PortalElement
      )}
    </Fragment>
  );
};
export default Backdrop;

import React, { useState, useEffect } from "react";

const BackdropContext = React.createContext({
  isBackdropVisible: false,
  isSnackbarVisible: false,
  isCartVisible: false,
  isFormVisible: false,
  snackBarMessage: "",
  // onShowBackdrop: () => {},
  // onHideBackdrop: () => {},
  onShowCart: () => {},
  onHideCart: () => {},
  onShowForm: () => {},
  onHideForm: () => {},
  onShowSnackbar: (msg) => {},
  onHideSnackbar: () => {},
  prohibitScroll: () => {},
});

export const BackdropContextProvider = (props) => {
  const prohibitScroll = (arg) => {
    let body = document.querySelector("body");
    if (arg) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  };

  const [backdropIsVisible, setBackdropIsVisible] = useState(false);
  const [snackbarIsVisible, setsnackbarIsVisible] = useState(false);
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [snackbarMessage, setsnackbarMessage] = useState(false);

  const showBackdropHandler = () => {
    setBackdropIsVisible(() => {
      return true;
    });
    prohibitScroll(true);
  };

  const hideBackdropHandler = () => {
    setBackdropIsVisible(() => {
      return false;
    });
    prohibitScroll(false);
  };

  const showCartHandler = () => {
    showBackdropHandler();
    setCartIsVisible(() => {
      return true;
    });
  };

  const hideCartHandler = () => {
    hideBackdropHandler();
    setCartIsVisible(() => {
      return false;
    });
  };

  const showFormHandler = () => {
    setFormIsVisible(() => {
      return true;
    });
  };

  const hideFormHandler = () => {
    setFormIsVisible(() => {
      return false;
    });
  };

  const showSnackbarHandler = (msg) => {
    setsnackbarMessage(() => {
      return msg;
    });
    setsnackbarIsVisible(() => {
      return true;
    });
  };

  const hideSnackbarHandler = () => {
    setsnackbarMessage(() => {
      return "";
    });
    setsnackbarIsVisible(() => {
      return false;
    });
  };

  useEffect(() => {
    const id = setTimeout(() => {
      console.log("removing");
      hideSnackbarHandler();
    }, 6000);

    return () => {
      clearTimeout(id);
    };
  }, [snackbarIsVisible]);

  return (
    <BackdropContext.Provider
      value={{
        isBackdropVisible: backdropIsVisible,
        isSnackbarVisible: snackbarIsVisible,
        isCartVisible: cartIsVisible,
        isFormVisible: formIsVisible,
        snackBarMessage: snackbarMessage,
        // onShowBackdrop: showBackdropHandler,
        // onHideBackdrop: hideBackdropHandler,
        onShowCart: showCartHandler,
        onHideCart: hideCartHandler,
        onShowForm: showFormHandler,
        onHideForm: hideFormHandler,
        onShowSnackbar: showSnackbarHandler,
        onHideSnackbar: hideSnackbarHandler,
        prohibitScroll: prohibitScroll,
      }}
    >
      {props.children}
    </BackdropContext.Provider>
  );
};
export default BackdropContext;

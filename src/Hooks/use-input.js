import { useReducer } from "react";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        enteredValue: action.value.enteredValue,
        isTouched: action.value.isTouched,
        hasError: action.value.isTouched && !action.value.isValid,
        isValid: action.value.isValid,
      };
    case "INPUT_BLUR":
      if (state.isRequired) {
        return {
          ...state,
          isTouched: action.value.isTouched,
          hasError: action.value.isTouched && !state.isValid,
        };
      } else {
        return {
          ...state,
          isTouched: state.enteredValue.trim() !== "" && action.value.isTouched,
          hasError:
            state.enteredValue.trim() !== "" &&
            action.value.isTouched &&
            !state.isValid,
        };
      }

    default:
      return {
        enteredValue: "",
        isTouched: false,
        hasError: false,
        isValid: false,
      };
  }
};

const useInput = (isValid, isRequired = true) => {
  const defaultStates = {
    enteredValue: "",
    isTouched: false,
    hasError: false,
    isValid: isRequired ? false : true,
    isRequired: isRequired,
  };
  const [state, dispatch] = useReducer(inputReducer, defaultStates);

  const updateValueOnKeystroke = (event) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: {
        enteredValue: event.target.value,
        isTouched: true,
        isValid: isValid(event.target.value),
      },
    });
  };

  const updateIsTouched = (event) => {
    dispatch({
      type: "INPUT_BLUR",
      value: { isTouched: true },
    });
  };

  const resetEnteredValue = () => {
    dispatch({
      type: "INPUT_CHANGE",
      value: { enteredValue: "", isValid: isValid("") },
    });
  };

  const resetIsTouched = () => {
    dispatch({
      type: "INPUT_BLUR",
      value: { isTouched: false, isValid: isValid("") },
    });
  };

  return {
    enteredValue: state.enteredValue,
    hasError: state.hasError,
    isValid: state.isValid,
    updateValueOnKeystroke,
    updateIsTouched,
    resetEnteredValue,
    resetIsTouched,
  };
};

export default useInput;

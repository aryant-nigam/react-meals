import classes from "./input.module.css";
function Input(props) {
  return (
    <div className={classes["fields"]}>
      <label htmlFor="" className={classes["label"]}>
        {props.label}
      </label>
      <div className={classes["input-cum-err-container"]}>
        {props.hasError && (
          <p className={classes["err-msg"]}>this is the error section</p>
        )}
        <input
          className={`${classes["input"]} ${
            props.hasError && classes["erronous-input"]
          }`}
          type="text"
          required={props.isRequired}
          value={props.enteredValue}
          onChange={props.updateValueOnKeystroke}
          onBlur={props.updateIsTouched}
        />
      </div>
    </div>
  );
}

export default Input;

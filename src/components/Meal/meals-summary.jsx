import classes from "./meals-summary.module.css";
const MealsSummary = () => {
  return (
    <div className={classes.banner}>
      <h1 className={classes["banner-title"]}>
        Delicious food, Delivered to you !
      </h1>
      <p className={classes["banner-body"]}>
        Choose your meal from broad selection of available meals and enjoy{" "}
        <br />a delicious lunch or dinner at home. All our meals are cooked with
        high quality ingredients, <br />
        just in-time and offcourse by experienced chefs!
      </p>
    </div>
  );
};
export default MealsSummary;

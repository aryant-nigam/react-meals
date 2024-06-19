import "./App.css";
import Header from "./components/Layout/header";
import MealsSummary from "./components/Meal/meals-summary";
import MealList from "./components/Meal/meals-list";
import Cart from "./components/Cart/cart";
import Backdrop from "./components/UI/backdrop";
import BackdropContext from "./store/backdrop-context";
import { useContext } from "react";
import Snackbar from "./components/UI/snackbar";
import Form from "./components/UI/form";

function App() {
  const backdropCtx = useContext(BackdropContext);

  // const addMeals = async () => {
  //   const response = await fetch(
  //     "https://react-mealz-f3f32-default-rtdb.firebaseio.com/meals-list.json",
  //     {
  //       method: "POST",
  //       body: JSON.stringify(indianFoodItems),
  //       header: {
  //         "Content-type": "application/json",
  //       },
  //     }
  //   );
  //   const data = await response.json();
  //   console.log(data);
  // };
  return (
    <div className="App">
      <Header></Header>
      <MealsSummary />
      <MealList />
      {backdropCtx.isBackdropVisible && (
        <Backdrop>
          {backdropCtx.isCartVisible && <Cart />}
          {backdropCtx.isFormVisible && <Form />}
        </Backdrop>
      )}
      {backdropCtx.isSnackbarVisible && <Snackbar />}
    </div>
  );
}

export default App;

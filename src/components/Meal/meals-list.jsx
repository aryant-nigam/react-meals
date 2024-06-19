import { useCallback, useEffect, useState } from "react";
import MealItem from "./meal-item";
import classes from "./meals-list.module.css";

const MealsList = () => {
  const [mealsList, setMealsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);

  const fetchMealsHandler = useCallback(async () => {
    try {
      setError(undefined);
      const response = await fetch(
        "https://react-mealz-f3f32-default-rtdb.firebaseio.com/meals-list.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      const transformedMealsList = [];

      for (const key in data) {
        transformedMealsList.push({
          id: data[key].id,
          name: data[key].name,
          price: data[key].price,
          description: data[key].description,
          imageUrl: data[key].imageUrl,
        });
      }

      setMealsList(transformedMealsList);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchMealsHandler();
  }, [fetchMealsHandler]);

  const mealsItemsList = mealsList.map((foodItem) => {
    return <MealItem key={foodItem.id} item={foodItem} />;
  });

  return (
    <div className={classes["meals-list"]}>
      {isLoading && !error ? (
        <h1 style={{ color: "white", alignSelf: "center" }}>
          Fetching your meals...
        </h1>
      ) : (
        mealsItemsList
      )}
      {error && <h1 style={{ color: "red", alignSelf: "center" }}>{error}</h1>}
    </div>
  );
};

export default MealsList;

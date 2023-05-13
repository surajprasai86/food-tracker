import { Pie, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useContext } from "react";
import { DataContext } from "../components/DataContext";
import SpinnerComponent from "../components/Spinner";

function NutritionBreakdownChart({ userMealData }) {
  const data = useContext(DataContext);

  if (!userMealData) {
    return (
      <>
        <SpinnerComponent />{" "}
      </>
    );
  }
  //  user for demo
  const today = new Date()
  const userId = "user_id_2";
  const nutritionNames = data.foodData.nutritionNames.map(
    (nutritionName) => nutritionName.name
  );
  const users = data.userFoodConsumptionDetails;
  const userMeals = Object.keys(users.meals)
    .filter((meal) => users.meals[meal].userId == userId)
    .map((mealId) => users.meals[mealId]);

  console.log("usermeal data", userMealData);

  // calculate total
  const calculateTotals = (userMealData) => {
    const arr = userMealData.filter((meal) => {
      if (
        new Date(meal.data.date.toDate()).getUTCDate() === today.getUTCDate()
      ) {
        return meal;
      }
    });

    // const arr = userMealData;
    let totalAmount = 0;
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;
    let fiber = 0;
    let sugar = 0;

    for (let i = 0; i < arr.length; i++) {
      let data = arr[i].data;

      totalAmount += parseFloat(data.amount);

      for (let j = 0; j < data.nutrition.length; j++) {
        let nutrition = data.nutrition[j];

        calories += parseFloat(nutrition.calories);
        protein += parseFloat(nutrition.protein);
        carbs += parseFloat(nutrition.carbs);
        fat += parseFloat(nutrition.fat);
        fiber += parseFloat(nutrition.fiber);
        sugar += parseFloat(nutrition.sugar);
      }
    }

    return [calories, protein, carbs, fat, fiber, sugar];
  };

  const dataset = calculateTotals(userMealData)

  // aggregating user meal nutritents breakdonw

  const totalNutirentBreakDown = userMealData?.reduce((accmulator, meal) => {
    nutritionNames.forEach((nutrient) => {
      // console.log("test",meal.data.nutrition[0][nutrient]);
      accmulator[nutrient] =
        (accmulator[nutrient] | 0) + meal.data.nutrition[0][nutrient];
    });
    return accmulator;
  }, {});

  // console.log("gross", totalNutirentBreakDown);

  const userMealdata = {
    labels: nutritionNames,
    datasets: [
      {
        data: dataset,
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div style={{ width: "400px", height: "400px" }}>
      {/* Use either <Pie /> or <Doughnut /> component depending on your need */}
      <Pie data={userMealdata} options={options} />
      {/* <Doughnut data={data} options={options} /> */}
    </div>
  );
}

export default NutritionBreakdownChart;

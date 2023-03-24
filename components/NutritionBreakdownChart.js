import { Pie, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useContext } from "react";
import { DataContext } from "../components/DataContext";

function NutritionBreakdownChart() {
  const data = useContext(DataContext);
  //  user for demo
  const userId = "user_id_2";
  const nutritionNames = data.foodData.nutritionNames.map(
    (nutritionName) => nutritionName.name
  );
  const users = data.userFoodConsumptionDetails;
  const userMeals = Object.keys(users.meals)
    .filter((meal) => users.meals[meal].userId == userId)
    .map((mealId) => users.meals[mealId]);

  // aggregating user meal nutritents breakdonw
  const totalNutirentBreakDown = userMeals.reduce((accmulator, meal) => {
    nutritionNames.forEach((nutrient) => {
      accmulator[nutrient] = (accmulator[nutrient] | 0) + meal[nutrient];
    });
    return accmulator;
  }, {});
  // console.log("gross", totalNutirentBreakDown);

  const userMealdata = {
    labels: nutritionNames,
    datasets: [
      {
        data: nutritionNames.map(nutrient => totalNutirentBreakDown[nutrient]),
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

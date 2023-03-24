import { useState } from "react";
import FoodCard from "./FoodCard";

function FoodList({ pageNumber, foodData }) {
  const [foodName, setFoodName] = useState("");
  console.log(foodData.foodList);
  return (
    <div>
      <div className="jumbotron bg-white ">
        <div style={{ display: "flex" }}>
          <FoodCard pageNumber={pageNumber} />
        </div>
      </div>
    </div>
  );
}

export default FoodList;

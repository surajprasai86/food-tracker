import { useState } from "react";
import FoodCard from "./FoodCard";



function FoodList({pageNumber, foodData}) {
  const [foodName, setFoodName] = useState("")
console.log(foodData.foodList);
  return (
    <div >
    Foodlist
      <div className="jumbotron bg-white " >
        <div style={{display:"flex"}}>
        {  foodData.foodList.slice((pageNumber-1)*3, (pageNumber-1)*3 +3).map(data =>   < FoodCard data={data}/> )}

        </div>
      
      </div>
    </div>
  );
}

export default FoodList;
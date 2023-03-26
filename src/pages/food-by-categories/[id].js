import FoodByCategories from "components/FoodByCategories";
import FoodCard from "components/FoodCard";
import Header from "components/Header";
import { useRouter } from "next/router";
import foodData from "../../../data/data.json";

function FoodByCategoriesId() {
  const route = useRouter();
  const foodCategory = route.query.id;
  // console.log("cat", foodCategory, typeof foodCategory);
  const foodByCategories = foodData.foodList.filter(
    (food) => food.Category.toLowerCase() === foodCategory
  );
  // console.log("food cat", foodByCategories);
  return (
    <div>
      <Header />
      <br />
      <div style={{width:"70%", margin:"auto"}} className="jumbotron bg-white ">
        <h1>{foodCategory} Foods</h1>
        <div style={{ display: "flex" }}>
          <FoodByCategories foodByCategories={foodByCategories} />
        </div>
      </div>
      noisee
    </div>
  );
}

export default FoodByCategoriesId;

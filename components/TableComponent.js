import { useContext } from "react";
import Table from "react-bootstrap/Table";
import { DataContext } from "../components/DataContext";

function TableComponent() {
  const userId = "user_id_2";
  const data = useContext(DataContext);
  const nutritionNames = data.foodData.nutritionNames;
  const { nutritioNames } = useContext(DataContext);
  const users = data.userFoodConsumptionDetails;
  console.log("conttex", users, nutritionNames);
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Name</th>
          {nutritionNames.map((nutrition, index) => (
            <th key={index}>{nutrition.name}</th>
          ))}
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(users.meals).map((mealId, index) => {
          const meal = users.meals[mealId];
          if (meal.userId === userId) {
            console.log("main", meal);
            return (
              <tr key={mealId}>
                <td>{meal["name"]}</td>
                {nutritionNames.map((nutrition, index) => (
                  <td>{meal[nutrition.name]}</td>
                ))}
                <td>{meal["time"].slice(0,5)}</td>
              </tr>
            );
          }
          // return (
          //   <tr key={userId}>
          //     <td>{index + 1}</td>
          //     {/* {nutritionNames.map((nutrition, index) => (
          //       <td key={index}>{dailyNutrientGoals[nutrition.key]}</td>
          //     ))} */}
          //   </tr>
          // );
        })}
      </tbody>
    </Table>
  );
}

export default TableComponent;

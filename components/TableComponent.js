import { collection, getDoc, query, where } from "firebase/firestore";
import { useContext } from "react";
import Table from "react-bootstrap/Table";
import { DataContext } from "../components/DataContext";
import SpinnerComponent from "./Spinner";

function TableComponent({mealData}) {


  if (!mealData) {
    return <SpinnerComponent />
  }

  // for second user from json file
  const data = useContext(DataContext);
  const nutritionNames = data.foodData.nutritionNames;
  const { nutritioNames } = useContext(DataContext);
  const users = data.userFoodConsumptionDetails;
  const user = data?.user?.uid


  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th key={"Name"} >Name</th>
          <th>Amount</th>
          {nutritionNames.map((nutrition, index) => (
            <th key={index}>{nutrition.name}</th>
          ))}
        </tr>
      </thead>
  { mealData && user &&   <tbody>
        {mealData.map((meal, index) => {
          meal = meal.data
            return (
              <tr key={index}>
                <td>{meal.selectedMeal}</td>
                <td>{meal.amount}</td>
                {nutritionNames.map((nutrition, index) => (
                  <td key={index} >{meal.nutrition[0][nutrition.name]}</td>
                ))}
                {/* <td>{ new Date(meal.date.seconds * 1000 + meal.date.nanoseconds / 1000000).toLocaleDateString()}</td> */}
              </tr>
            );
        })}
      </tbody>}
    </Table>
  );
}

export default TableComponent;

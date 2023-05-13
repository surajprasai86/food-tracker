import { collection, getDoc, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { DataContext } from "../components/DataContext";
import SpinnerComponent from "./Spinner";

function TableComponent({mealData}) {
  const [totalFoodConsumptio, setTotalFoodConsumptio] = useState([])
  const data = useContext(DataContext);
  const { nutritioNames } = useContext(DataContext);
  

  if (!mealData) {
    return <SpinnerComponent />
  }

  // for second user from json file

  const nutritionNames = data.foodData.nutritionNames;
  const users = data.userFoodConsumptionDetails;
  const user = data?.user?.uid

  const today = new Date()

  const todayMealData = mealData.filter(meal => {
    if ((new Date(meal.data.date.toDate())).getUTCDate() === today.getUTCDate()) {
      return meal
    }
  })

  const calculateTotals = (arr) => {
    let totalAmount = 0;
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalFiber = 0;
    let totalSugar = 0;
  
    for (let i = 0; i < arr.length; i++) {
      let data = arr[i].data;
      
      totalAmount += parseFloat(data.amount);
      
      for (let j = 0; j < data.nutrition.length; j++) {
        let nutrition = data.nutrition[j];
  
        totalCalories += parseFloat(nutrition.calories);
        totalProtein += parseFloat(nutrition.protein);
        totalCarbs += parseFloat(nutrition.carbs);
        totalFat += parseFloat(nutrition.fat);
        totalFiber += parseFloat(nutrition.fiber);
        totalSugar += parseFloat(nutrition.sugar);
      }
    }
  
    return {
      totalAmount,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      totalFiber,
      totalSugar
    };
  }
  // const res =
    
  // setTotalFoodConsumptio(calculateTotals(todayMealData))

  const total = calculateTotals(todayMealData)
  // console.log("today total", total);
  



  return (
    <>
    {mealData && 
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
        <tbody>
    { todayMealData && user &&  <> 
          {todayMealData.map((meal, index) => {
            meal = meal.data
              return (
                <tr key={index}>
                  <td>{meal.selectedMeal}</td>
                  <td>{meal.amount}</td>
                  {nutritionNames.map((nutrition, index) => (
                  <>  {meal?.nutrition[0] && <td key={index} >{meal?.nutrition[0][nutrition.name]}</td>}</>
                    
                  ))}
                  {/* <td>{ new Date(meal.date.seconds * 1000 + meal.date.nanoseconds / 1000000).toLocaleDateString()}</td> */}
                </tr>
              );
          })}
      </>  }
    {total &&  <tr key={"total"} >
        <td>Total</td>
        <td>{total.totalAmount.toFixed(2)}</td>
        <td>{total.totalCalories.toFixed(2)}</td>
        <td>{total.totalProtein.toFixed(2)}</td>
        <td>{total.totalCarbs.toFixed(2)}</td>
        <td>{total.totalFat.toFixed(2)}</td>
        <td>{total.totalFiber.toFixed(2)}</td>
        <td>{total.totalSugar.toFixed(2)}</td>
      </tr>}
      </tbody>
      </Table>}
    </>

  );
}

export default TableComponent;

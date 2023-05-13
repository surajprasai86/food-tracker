import Header from "components/Header";
import Container from "react-bootstrap/Container";
import React, { useContext, useState } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/database";
import Dropdown from "react-bootstrap/Dropdown";
import { DataContext } from "../../../components/DataContext";
import Modal from "react-bootstrap/Modal";
import ProgressBar from "react-bootstrap/ProgressBar";
import TableComponent from "components/TableComponent";
import NutritionBreakdownChart from "components/NutritionBreakdownChart";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  where,
  getDocs,
  query,
  getDoc,
} from "firebase/firestore";
import { db } from "auth/firebase";
import { useEffect } from "react";
import SpinnerComponent from "components/Spinner";

function AddFood() {
  // filtering food & nutrition name
  const dataContext = useContext(DataContext);
  const data = dataContext.foodData;
  const foodNames = data.foodList.map((food) => food.name);
  const nutritionNames = data.nutritionNames;
  const user = dataContext.user;
  const nutrionalValuesPer100gm = dataContext.nutrientsPerFood;
  // const user = useContext(DataContext;
  // console.log("datx onct", dataContext);
  //
  const [amount, setAmount] = useState("0");
  const [selectedMeal, setSelectedMeal] = useState("");
  const [nutritionName, setNutritionName] = useState("calories");
  const [userMealData, setUserMealData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [randomValue, setRandomValue] = useState();
  const [sendingFoodForm, setSendingFoodForm] = useState(false);
  const [total, setTotal] = useState([])

  // console.log("user is", user);

  // food consumed today:
  const foodConsumedToday = async () => {
    if (user) {
      const q = query(collection(db, "meals"));

      const querySnapshot = await getDocs(q);
      const docData = querySnapshot.docs.map((doc) => doc.data());
      const data = docData.filter((meal) => meal.data.user_uid === user.uid);
      setUserMealData(data);
      // console.log("query snpashot", data);
    }
  };

  const userDataFetch = async () => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("User data:", docSnap.data());
        setUserData(docSnap.data());
      } else {
        console.log("No such user!");
      }
    } else {
      console.log("Cant fetch user");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user | !selectedMeal | !amount) {
      return alert("No user logged in");
    }
    setSendingFoodForm(true);
    console.log("Add meal/food to db: ", selectedMeal, amount);

    const foodArray = nutrionalValuesPer100gm.foods.filter(
      (foodCompostion) =>
        String(foodCompostion.name).toLowerCase() ===
        String(selectedMeal).toLowerCase()
    );

    const multipliedFoodArray = foodArray.map((food) => {
      const newFood = {};

      for (const key in food) {
        if (food.hasOwnProperty(key)) {
          if (typeof food[key] === "number") {
            newFood[key] = ((food[key] / 100) * amount).toFixed(2);
          } else {
            newFood[key] = food[key];
          }
        }
      }

      return newFood;
    });

    console.log(multipliedFoodArray);

    const data = {
      selectedMeal: selectedMeal,
      amount: amount,
      user_uid: user.uid,
      nutrition: multipliedFoodArray,
      date: serverTimestamp(),
    };
    try {
      await addDoc(collection(db, "meals"), { data });
      console.log("Meal sent to DB");
    } catch (error) {
      console.log("error while sending meal info of user to meals", error);
    }
    setSendingFoodForm(false);
    setAmount(0);
    setSelectedMeal("Select a Meal");
    foodConsumedToday();
  };

  const rand = Math.floor(Math.random() * 100);
  useEffect(() => {
    foodConsumedToday();
    userDataFetch();
    return () => {};
  }, [user]);

  useEffect(() => {
    setRandomValue(Math.floor(Math.random() * 100));

    return () => {};
  }, [nutritionName]);

  useEffect(() => {
    if (userMealData) {
      const total = calculateTotals(userMealData);
      setTotal(total)
      console.log("total", total);
    }
  }, [userMealData])
  
  const today = new Date()

  const calculateTotals = (userMealData) => {

    const arr = userMealData.filter(meal => {
      if ((new Date(meal.data.date.toDate())).getUTCDate() === today.getUTCDate()) {
        return meal
      }
    })

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

    return [
      calories,
      protein,
      carbs,
      fat,
      fiber,
      sugar,
  ];
  };



  console.log("userdata", userData);
  // console.log("nutrionnamechanged", nutritionName, userData.daily_nutrient_goals.);

  return (
    <div>
      <Header />
      <Container>
        <Row>
          {/* Form */}
          <Col sm={6}>
            <div
              className="modal show"
              style={{ display: "block", position: "initial" }}
            >
              <Modal.Dialog>
                <Modal.Header closeButton>
                  <Modal.Title>Add Food to Database</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <div className="">
                    <Form onSubmit={user && handleSubmit}>
                      <Form.Group controlId="food">
                        <Form.Label>Add Food</Form.Label>
                        <Dropdown onSelect={(e) => setSelectedMeal(e)}>
                          <Dropdown.Toggle
                            size="lg"
                            variant="secondary"
                            id="dropdown-basic"
                            className="mb-2"
                            style={{ minWidth: "220px" }}
                          >
                            {selectedMeal ? selectedMeal : "Select A Food Item"}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {foodNames.map((foodName, index) => (
                              <Dropdown.Item
                                key={index}
                                eventKey={`${foodName}`}
                              >
                                {foodName}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Form.Group>

                      <Form.Group controlId="amount">
                        <Form.Label>
                          Amount
                          <span style={{ fontSize: "11px" }}>(per gram)</span>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter food amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </Form.Group>

                      {!sendingFoodForm ? (
                        <Button
                          className="mt-4"
                          variant="secondary"
                          type="submit"
                          size="lg"
                          disabled={!amount | !selectedMeal}
                        >
                          Submit
                        </Button>
                      ) : (
                        <SpinnerComponent />
                      )}
                    </Form>
                  </div>
                </Modal.Body>
              </Modal.Dialog>
            </div>
          </Col>
          {/* Goal  */}
          <Col sm={6}>
            <div
              className="modal show"
              style={{ display: "block", position: "initial" }}
            >
              <Modal.Dialog>
                <Modal.Header closeButton>
                  <Modal.Title className="d-flex">
                    Daily
                    <Dropdown onSelect={(e) => setNutritionName(e)}>
                      <Dropdown.Toggle
                        variant="secondary"
                        id="dropdown-basic"
                        className="mx-2"
                        style={{ minWidth: "92px" }}
                      >
                        {nutritionName ? nutritionName : "calories"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {nutritionNames.map((nutritionObject, index) => (
                          <Dropdown.Item
                            key={index}
                            eventKey={`${nutritionObject.name}`}
                          >
                            {nutritionObject.name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    Goal-{" "}
                    {userData ? (
                      userData.daily_nutrient_goals?.[nutritionName]
                    ) : (
                      <></>
                    )}
                  </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p>Your progress goes here.</p>
                  {userMealData && userData && (
                    <div>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Nutrient</th>
                            <th>Goal</th>
                            <th>Total Consumption</th>
                          </tr>
                        </thead>
                        <tbody>
                          
                            {nutritionNames.map((nut, index) =>
                            <tr> 
                              <td>{nut.name}</td>
                              <td>{userData.daily_nutrient_goals[nut.name]}</td>
                             { total && <td>{(total[index])?.toFixed(2)}</td>}
                            </tr>
                              )}
                    
                        </tbody>
                      </Table>
                    </div>
                  )}
                </Modal.Body>
              </Modal.Dialog>
            </div>
          </Col>
        </Row>
        <Row>
          {/* Table */}
          <Col sm={6}>
            <div
              className="modal show"
              style={{ display: "block", position: "initial" }}
            >
              <Modal.Dialog size="xl" className="">
                <Modal.Header closeButton>
                  <Modal.Title>Food Consumed Today</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p>{new Date().toISOString().slice(0, 10)}</p>
                  <TableComponent mealData={userMealData} />
                </Modal.Body>
              </Modal.Dialog>
            </div>
          </Col>
          {/* chart */}
          <Col sm={6}>
            <div
              className="modal show"
              style={{ display: "block", position: "initial" }}
            >
              <Modal.Dialog className="">
                <Modal.Header closeButton>
                  <Modal.Title>Nutrition Breakdown</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  {userMealData && (
                    <NutritionBreakdownChart userMealData={userMealData} />
                  )}
                </Modal.Body>
              </Modal.Dialog>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddFood;

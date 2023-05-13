import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { DataContext } from "./DataContext";
import { db } from "auth/firebase";
import { collection, getDocs } from "firebase/firestore";

function FoodCard({ pageNumber }) {
  const [foodFromFB, setFoodFromFB] = useState([]);
  // console.log("pn", pageNumber);
  const data = useContext(DataContext).foodData.foodList;
  // console.log("dta is ", data);
  async function fetchAllFoodData() {
    const querySnapshot = await getDocs(collection(db, "foods"));

    // querySnapshot.docs.forEach((doc) => {
    //   console.log(doc.id, doc.data());
    // });

    setFoodFromFB(querySnapshot.docs.map((doc) => doc.data()));

    // console.log("data", data);
  }

  const noOfCardsWantedInPage = 6;
  console.log("food from fb", foodFromFB);
  useEffect(() => {
    fetchAllFoodData();
  }, []);

  return (
    <Container>
      <h1>Food List</h1>
      <Row>
        {data.length > 0 &&
          data
            .slice(
              noOfCardsWantedInPage * (pageNumber - 1),
              noOfCardsWantedInPage * (pageNumber - 1) + noOfCardsWantedInPage
            )
            .map((food, index) => (
              <Col style={{ marginBottom: "14px" }} sm={4} key={index}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={`/food/${String(food.name).toLowerCase()}.webp`}
                  />
                  <Card.Body>
                    <Card.Title>{food.name}</Card.Title>
                    {console.log(food.name)}
                    <Card.Text>
                      {food.advantages
                        ? food.advantages.slice(0, 140)
                        : "Some quick example text to build on the card title and make up the bulk of the cards content."}
                    </Card.Text>
                    <Button variant="primary">View Details</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
           {foodFromFB.length > 0 && pageNumber >= 3 &&
          foodFromFB.map((food, index) => (
              <Col style={{ marginBottom: "14px" }} sm={4} key={index}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={food.imageUrl}
                  />
                  <Card.Body>
                    <Card.Title>{food.name}</Card.Title>
                    {console.log(food.name)}
                    <Card.Text>
                      {food.advantages
                        ? food.advantages.slice(0, 140)
                        : "Some quick example text to build on the card title and make up the bulk of the cards content."}
                    </Card.Text>
                    <Button variant="primary">View Details</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
      </Row>
    </Container>
  );
}

export default FoodCard;

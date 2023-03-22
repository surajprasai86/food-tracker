import Header from "components/Header";
import Container from "react-bootstrap/Container";
import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/database";
import Dropdown from "react-bootstrap/Dropdown";

function AddFood() {
  const [food, setFood] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foodRef = firebase.database().ref("foods");
    const newFood = {
      food: food,
      amount: amount,
      option: selectedOption,
    };
    foodRef.push(newFood);
    setFood("");
    setAmount("");
    setSelectedOption("option1");
  };

  return (
    <div>
      <Header />
      <Container>
        <Row>
          <Col  sm={4}>
            <div className="pt-5">
              <h3 className="text-left mb-4">Add Food to Database</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="food">
                  <Form.Label>Add Food</Form.Label>
                  <Dropdown onSelect={handleSelect}>
                    <Dropdown.Toggle
                      size="lg"
                      variant="success"
                      id="dropdown-basic"
                      className="mb-2"
                      style={{minWidth:"220px"}}
                    >
                      {selectedOption ? selectedOption : "Select A Food Item"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="option1">Option 1</Dropdown.Item>
                      <Dropdown.Item eventKey="option2">Option 2</Dropdown.Item>
                      <Dropdown.Item eventKey="option3">Option 3</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>

                <Form.Group controlId="amount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter food amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Form.Group>

                <Button className="mt-4" variant="success" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
        <div></div>
      </Container>
    </div>
  );
}

export default AddFood;

import Header from "components/Header";
import Container from "react-bootstrap/Container";
import React, { useContext, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/database";
import Dropdown from "react-bootstrap/Dropdown";
import { DataContext } from "../../../components/DataContext";
import Modal from "react-bootstrap/Modal";
import ProgressBar from "react-bootstrap/ProgressBar";
import TableComponent from "components/TableComponent";

function AddFood() {
  // filtering food & nutrition name
  const data = useContext(DataContext).foodData;
  const foodNames = data.foodList.map((food) => food.name);
  const nutritionNames = data.nutritionNames;
  //
  const [amount, setAmount] = useState("0");
  const [selectedOption, setSelectedOption] = useState("");
  const [nutritionName, setNutritionName] = useState("calories");
  // console.log(nutritionName);

  // const handleSelect = (eventKey) => {
  //   setSelectedOption(eventKey);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("res", amount, selectedOption);
  };

  return (
    <div>
      <Header />
      <Container>
        <Row>
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
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="food">
                        <Form.Label>Add Food</Form.Label>
                        <Dropdown onSelect={(e) => setSelectedOption(e)}>
                          <Dropdown.Toggle
                            size="lg"
                            variant="secondary"
                            id="dropdown-basic"
                            className="mb-2"
                            style={{ minWidth: "220px" }}
                          >
                            {selectedOption
                              ? selectedOption
                              : "Select A Food Item"}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {foodNames.map((foodName) => (
                              <Dropdown.Item eventKey={`${foodName}`}>
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

                      <Button
                        className="mt-4"
                        variant="secondary"
                        type="submit"
                        size="lg"
                      >
                        Submit
                      </Button>
                    </Form>
                  </div>
                </Modal.Body>
              </Modal.Dialog>
            </div>
          </Col>
          <Col sm={6}>
            <div
              className="modal show"
              style={{ display: "block", position: "initial" }}
            >
              <Modal.Dialog>
                <Modal.Header closeButton>
                  <Modal.Title className="d-flex">
                    Daily{" "}
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
                        {nutritionNames.map((nutritionObject) => (
                          <Dropdown.Item eventKey={`${nutritionObject.name}`}>
                            {nutritionObject.name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    Goal-{" "}
                    {
                      nutritionNames.filter(
                        (nutrition) => nutrition.name === nutritionName
                      )[0].healthyAmountRDA
                    }
                  </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p>Modal body text goes here.</p>
                  <ProgressBar animated now={45} label={`${45}%`} />
                </Modal.Body>
              </Modal.Dialog>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <div
              className="modal show"
              style={{ display: "block", position: "initial" }}
            >
              <Modal.Dialog  className="" >
                <Modal.Header closeButton>
                  <Modal.Title>Food Consumed Today</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p>{new Date().toISOString().slice(0,10)}</p>
                  <TableComponent />
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

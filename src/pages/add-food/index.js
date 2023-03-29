import Header from "components/Header";
import { useState } from "react";
import { Form, Button, Container, Row, Modal } from "react-bootstrap";

const FoodForm = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [fiber, setFiber] = useState("");
  const [sugar, setSugar] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Code to submit the form data goes here
    // You could use fetch or Axios to send the data to your backend server
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
    <Header />
        <Container>
        <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog size="lg" >
        <Modal.Header closeButton>
          <Modal.Title>Add Food</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter food name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicImage">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" onChange={handleImageChange} />
        {image && <img src={image} alt="food" style={{ maxWidth: "200px", marginTop: "10px" }} />}
      </Form.Group>

        <Form.Group controlId="calories">
          <Form.Label>Calories per 100g</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter calories"
            value={calories}
            onChange={(event) => setCalories(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="protein">
          <Form.Label>Protein per 100g</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter protein"
            value={protein}
            onChange={(event) => setProtein(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="carbs">
          <Form.Label>Carbs per 100g</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter carbs"
            value={carbs}
            onChange={(event) => setCarbs(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="fat">
          <Form.Label>Fat per 100g</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter fat"
            value={fat}
            onChange={(event) => setFat(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="fiber">
          <Form.Label>Fiber per 100g</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter fiber"
            value={fiber}
            onChange={(event) => setFiber(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="sugar">
          <Form.Label>Sugar per 100g</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter sugar"
            value={sugar}
            onChange={(event) => setSugar(event.target.value)}
          />
        </Form.Group>

        <Button className="mt-2" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
        </Modal.Body>

      </Modal.Dialog>
    </div>

    </Container>
    </>

  );
};

export default FoodForm;

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function FoodByCategories({ foodByCategories }) {
  return (
    <Container>
      <Row>
        {foodByCategories.length > 0 ? (
          foodByCategories.map((food, index) => (
            <Col style={{marginBottom:"14px"}} sm={4} key={index}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={`/food/${String(food.name).toLowerCase()}.webp`} />
                <Card.Body>
                  <Card.Title>{food.name}</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the cards contents.
                  </Card.Text>
                  <Button variant="primary">View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (<>
       
        <Card.Title>No Food Available</Card.Title>
        </>
              
        )}
      </Row>
    </Container>
  );
}

export default FoodByCategories;

import Header from "components/Header";
import { useState } from "react";
import { Form, Button, Container, Row, Modal } from "react-bootstrap";
import { storage, db } from "auth/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import SpinnerComponent from "components/Spinner";

const FoodForm = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [calories, setCalories] = useState(2000);
  const [protein, setProtein] = useState(50);
  const [carbs, setCarbs] = useState(130);
  const [fat, setFat] = useState(60);
  const [fiber, setFiber] = useState(25);
  const [sugar, setSugar] = useState(25);
  const [url, setUrl] = useState("")
  const [fileType, setFileType] = useState("")
  const [imageShow, setImageShow] = useState("")
  const [startUploading, setStartUploading] = useState(false)
  const [category, setcategory] = useState("Fruits")
  const [advantages, setAdvantages] = useState("It is good for blood, and brain development.")

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setStartUploading(true)
    // Make sure all fields are filled
    if (!name || !image || !calories || !protein || !carbs || !fat || !fiber || !sugar) {
      // Handle error when form is not completely filled
      console.log("Missing fields");
      return;
    }
  
    // Create a reference in Firebase storage
    const storageRef = ref(storage, `images/${name}`);
    
    // Upload the image
    const uploadTask = uploadBytesResumable(storageRef, image, {contentType: fileType});
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: You can add code here to track upload progress
    setStartUploading(true)

      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // When the upload completes, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("download url", downloadURL);
          // Save the URL and the rest of the form data in Firestore
          try {
            const docRef = doc(db, "foods", name); 
            await setDoc(docRef, {
              name,
              imageUrl: downloadURL,
              calories,
              protein,
              carbs,
              fat,
              fiber,
              sugar,
              category,
              advantages
            }, { merge: true });
  
            console.log("Document written with ID: ", docRef.id);
          setStartUploading(false)
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        });
      }
    );
    // setStartUploading(false)
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    // console.log('File type: ', file);
    setFileType(file.type)

    setImage(file);
    reader.onloadend = () => {
      setImageShow(reader.result)
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
        {imageShow && <img src={imageShow} alt="food" style={{ maxWidth: "200px", marginTop: "10px" }} />}
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

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(event) => setcategory(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="Advantages">
          <Form.Label>Advantages</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter advantages"
            value={advantages}
            onChange={(event) => setAdvantages(event.target.value)}
          />
        </Form.Group>

    {!startUploading ?    <Button disabled={!name || !image || !calories || !protein || !carbs || !fat || !fiber || !sugar} className="mt-2" variant="primary" type="submit">
          Submit
        </Button> : <SpinnerComponent /> }
      </Form>
        </Modal.Body>

      </Modal.Dialog>
    </div>

    </Container>
    </>

  );
};

export default FoodForm;

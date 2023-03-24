import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import { auth, db } from "../auth/firebase";
import { Modal, Form, Button } from "react-bootstrap";
import { collection, query, where, getDocs } from "firebase/firestore";

const UserFirstTImeLoginForm = () => {
  const [user] = useAuthState(auth);
  const [detailsSet, setDetailsSet] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [dailyCalorieGoal, setDailyCalorieGoal] = useState("");
  const [dailyNutrientGoals, setDailyNutrientGoals] = useState({
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    fiber: "",
    sugar: "",
  });

  useEffect(() => {
    setShowModal(true);
    const checkIfUserDetailsSet = async () => {
      const q = query(collection(db, "users"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    };
    checkIfUserDetailsSet()

    if (user) {
      console.log("the user is", user);
    }
  }, [user]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("form submitted ");
  };

  return (
    <div>
      {/* Modal for setting user details */}
      {showModal && (
        <Modal
          backdrop="static"
          keyboard={false}
          show={true}
          onHide={() => setShowModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Set your details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleFormSubmit}>
              {/* <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Form.Group> */}
              {/* <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group> */}
              {/* <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group> */}
              <Form.Group>
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  value={gender}
                  onChange={(event) => setGender(event.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Birthdate</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter your birthdate"
                  value={birthdate}
                  onChange={(event) => setBirthdate(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your weight"
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Height</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your height"
                  value={height}
                  onChange={(event) => setHeight(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Daily calorie goal</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your daily calorie goal"
                  value={dailyCalorieGoal}
                  onChange={(event) => setDailyCalorieGoal(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Other Daily nutrient goals</Form.Label>
                {Object.entries(dailyNutrientGoals).map(([key, value]) => (
                  <Form.Control
                  className="mt-2"
                    key={key}
                    type="number"
                    placeholder={`Enter your daily ${key} goal`}
                    value={value}
                    onChange={(event) =>
                      setDailyNutrientGoals({
                        ...dailyNutrientGoals,
                        [key]: event.target.value,
                      })
                    }
                  />
                ))}
              </Form.Group>
              <Button  className="mt-2" type="submit">Save</Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default UserFirstTImeLoginForm;

import { useState } from "react";
import firebase from "../auth/firebase"; // Replace with the correct path to your firebase.js file
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from 'react-bootstrap';

// import SignIn from "../auth/firebase"
// Create auth instance

function FirebaseAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, loading, error] = useAuthState(auth);

  return (
    <Button variant="primary" size="lg">
      {0 ? "Loading..." : "Sign up with Google"}
    </Button>
  );
}

export default FirebaseAuth;

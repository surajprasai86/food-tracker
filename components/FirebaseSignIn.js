import Image from "next/image";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import foodData from "../data/data.json";
import { auth } from "../auth/firebase";
import { doc, getDoc } from "firebase/firestore";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import UserFirstTImeLoginForm from "./UserFirstTImeLoginForm";

function FirebaseSignIn() {
  const [loading, setLoading] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const [user, loadingg, error] = useAuthState(auth);
  const [userFirstTimeLogin, setUserFirstTimeLogin] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    return () => {};
  }, [user, userLoggedIn]);

  const singInWithGoogle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      console.log(res);
      setUserLoggedIn(true);
    } catch (error) {
      console.log("while trying to login", error);
    }
  };

  const signOut = () => {
    auth.signOut().then(data => console.log("User singedout", data))
    .catch(error => console.log("Error while siging out user", error))
  }

  return (
    <div>
      {!user ? (
        <Button
          loading
          onClick={singInWithGoogle}
          variant="secondary"
          size="lg"
          disabled={loading}
        >
          {0 ? "Loading..." : "Sign up with Google"}
        </Button>
      ) : (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}} >
          <Image
            className="avatar"
            src={user.photoURL}
            width={250}
            height={250}
            alt=""
          />
           <a onClick={signOut} href="#">Logout
        </a>
        </div>
      )}
      {/* if this is first time user logging in, ask details */}
      {/* {userFirstTimeLogin && userLoggedIn && <UserFirstTImeLoginForm />} */}
      <UserFirstTImeLoginForm />
    </div>
  );
}

export default FirebaseSignIn;

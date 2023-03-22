import Image from "next/image";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import foodData from "../data/data.json";
import {auth} from "../auth/firebase"
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

function Header() {  
  const [loading, setLoading] = useState(false);
  const googleProvider = new GoogleAuthProvider()
  const [user, setUser] = useAuthState(auth)
  console.log(user
    );


  const singInWithGoogle = async(e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await  signInWithPopup(auth, googleProvider)
      console.log(res);
    } catch (error) {
      console.log("while trying to login", error);
    }
  }

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <Image src="/food-.svg" width={100} height={100} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Food List</Nav.Link>
              <NavDropdown title="Food Categories" id="basic-nav-dropdown">
                {foodData.foodCategories.map((category) => (
                  <NavDropdown.Item href={`/food-by-categories/${String(category).toLocaleLowerCase()}`}>
                    {category}
                  </NavDropdown.Item>
                ))}
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Add Manual Categories
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/add-food/AddFood"> Add Food Item </Nav.Link>
              <Nav.Link href="#fodlog"> Food Log</Nav.Link>
            </Nav>
           {!user ? <Button loading  onClick={singInWithGoogle} variant="secondary" size="lg"  disabled={loading}>
              {0 ? "Loading..." : "Sign up with Google"}
            </Button> :  <Image className="avatar" src={user.photoURL} width={250} height={250} alt="" />}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;

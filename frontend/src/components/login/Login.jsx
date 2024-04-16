import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useContext, useState } from "react";
import UserData from "../Context/UserData";
import Role from "../Context/Role";

const URIAccount = `http://localhost:1305/account/login`;
const URICustomer = `http://localhost:1305/customer/login`;

function Login() {
  const Navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { userData, setUserData } = useContext(UserData);
  const { role, setRole } = useContext(Role);
  const adminOrUser = () => {
    setIsLoggedIn((prevMode) => !prevMode);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    try {
      const response = await fetch(isLoggedIn ? URIAccount : URICustomer, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObject),
      });

      if (response.ok) {
        const data = await response.json();
            setRole(data.searchEmail.role);
            console.log(data.searchEmail.role);
            console.log(role);
            
        try {
          const response = await fetch(
            "http://localhost:1305/account/get-data",
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `${data.searchEmail.role}`,
                body: JSON.stringify(userData),
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setUserData(data.account);
            console.log(data.account);
            
            setTimeout(() => {
              Navigate("/dashboard")
            }, 2000);
             
            console.log("Daten erfolgreich abgerufen");
          } else {
            console.error("Fehler bei Datenabrufe:", response.statusText);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        alert(`${isLoggedIn ? "Admin" : "User"} not found`);
        console.error("Fehler beim Einloggen:", response.statusText);
      }
    } catch (error) {
      console.error("Fehler:", error);
    }
  }

  return (
    <div>
      <div className="title" style={{ marginTop: "100px" }}>
        <h2>Stuff It</h2>
      </div>
      <div
        className="join-container"
        style={{
          height: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "5%",
          marginLeft: "5%",
          marginTop: "100px",
        }}
      >
        <h3>Login</h3>
        <button onClick={adminOrUser}>
          Login as {isLoggedIn ? "Admin" : "User"}
        </button>
        <form
          className="form"
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            name="email"
            type="email"
            placeholder="E-Mail"
            style={{
              marginBottom: "30px",
              padding: "5px",
              height: "5vh",
              width: "50%",
              maxWidth: "300px",
              minWidth: "150px",
            }}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Passwort"
            style={{
              marginBottom: "40px",
              padding: "5px",
              height: "5vh",
              width: "50%",
              maxWidth: "300px",
              minWidth: "150px",
            }}
            required
          />
          <Button
            type="submit"
            className="btn"
            variant="primary"
            style={{
              height: "5vh",
              width: "30%",
              maxWidth: "300px",
              minWidth: "150px",
              marginBottom: "10px",
            }}
          >
            Login
          </Button>
          <Link
            to="/"
            className="btn"
            variant="primary"
            style={{
              height: "5vh",
              width: "30%",
              maxWidth: "300px",
              minWidth: "150px",
            }}
          >
            Zurück
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;

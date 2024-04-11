import { useContext, useEffect, useState } from "react";
import Legend from "./legend/Legend.jsx";
import UserData from "../Context/UserData.jsx";

const URIAccount = "http://localhost:1412/account";
const URICategory = "http://localhost:1412/category/findById";

function Dashboard() {
  const [account, setAccount] = useState(null);
  const [categories, setCategories] = useState([]);
  const { userData, setUserData } = useContext(UserData)

 useEffect(() => {
  setTimeout(() => {
  async function fetchCategories() {
    try {
      const response = await fetch(URICategory, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": userData.role,
        },
        body: JSON.stringify(userData.category),
        credentials: "include"
      })
      
      if (!response.ok) {
        console.error("Error fetching category data:", response.statusText);
       } else { 
      const data = await response.json()
      setCategories(data.foundCategories);
        console.log("Erfolgreich", response.statusText);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }  

  fetchCategories()
}, 2000);
  async function fetchAccount() {
    try {
      const response = await fetch(URIAccount, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": userData.role,
        },
        credentials: "include"
      });
      if (!response.ok) {
        console.error("Error fetching account data:", response.statusText);
      } else {
        console.log("Succsessful:", response.statusText);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
 
fetchAccount()

},[userData])

  return (
    <>
    {categories ? categories.map((element, index) => <div key={index}><p>{element.name}</p><p>{element.limitedBudget}</p></div>) : <p>Loading...</p>}
    </>
  );
}

export default Dashboard;

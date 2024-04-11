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
  
  async function fetchCategories(categoryIds) {
    try {
      console.log(userData.category);
      
      const response = await fetch(URICategory, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": userData.role,
        },
        body: JSON.stringify(userData.category),
        credentials: "include"
      });
      if (!response.ok) {
        console.error("Error fetching category data:", response.statusText);
       } else {
      //   const data = await response.json();
      //   const filteredCategories = data.filter(category => categoryIds.includes(category._id));
      //   setCategories(filteredCategories);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }  

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
        const data = await response.json();
        const account = data[0];
        setAccount(account);
        fetchCategories(account.category);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
 
fetchAccount()

},[userData])
console.log(userData);

  return (
    <>
   {userData? userData.firstname :  <p>Loading...</p>}
    </>
  );
}

export default Dashboard;

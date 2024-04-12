import { useEffect, useState } from "react";
import Legend from "./legend/Legend.jsx";

const URIAccount = "http://localhost:1305/account";
const URICategory = "http://localhost:1305/category";

function Dashboard() {
  const [account, setAccount] = useState(null);
  const [categories, setCategories] = useState([]);

  async function fetchAccount() {
    try {
      const response = await fetch(URIAccount, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
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

  async function fetchCategories(categoryIds) {
    try {
      const response = await fetch(URICategory, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      if (!response.ok) {
        console.error("Error fetching category data:", response.statusText);
      } else {
        const data = await response.json();
        const filteredCategories = data.filter(category => categoryIds.includes(category._id));
        setCategories(filteredCategories);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <div>
      Dashboard
      <Legend categories={categories} />
      <div style={{ border: '1px solid red', height: '400px', width: '100vw'}}>
        {categories.map(category => (
          <div key={category._id}>{category.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

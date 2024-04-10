import { useEffect, useState } from "react";
import Legend from "./legend/Legend.jsx";

const URIAccount = "http://localhost:2222/account";
const URICategory = "http://localhost:2222/category";

function Dashboard() {
  const [account, setAccount] = useState(null);
  const [categories, setCategories] = useState([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryBudget, setNewCategoryBudget] = useState(0);

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

  async function fetchCategories(accountId) {
    try {
      const response = await fetch(`${URICategory}?account_id=${accountId}`, {
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
        setCategories(data);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
  
  const createCategory = async () => {
    try {
      const response = await fetch(`${URICategory}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          name: newCategoryName,
          budget: newCategoryBudget,
          account: account._id
        })
      });
      if (!response.ok) {
        console.error("Error creating category:", response.statusText);
      } else {
        setNewCategoryName("");
        setNewCategoryBudget(0);
        fetchCategories(account._id); 
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };
  
  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`${URICategory}/hard-delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ _id: categoryId, account_id: account._id }) 
      });
      if (!response.ok) {
        console.error("Error deleting category:", response.statusText);
      } else {
        setCategories(prevCategories => prevCategories.filter(category => category._id !== categoryId));
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };
  
  const handleDeleteClick = (categoryId) => {
    deleteCategory(categoryId);
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <div>
    Dashboard
    <Legend categories={categories} />
    <div style={{ border: '1px solid red', height: '400px', width: '100vw'}}>
      {categories.map(category => (
        <div key={category._id}>
          {category.name}
          {deleteMode && (
            <button onClick={() => handleDeleteClick(category._id)}>X</button>
          )}
        </div>
      ))}
    </div>
    <div>
      <input
        type="text"
        placeholder="Kategoriename"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Budget"
        value={newCategoryBudget}
        onChange={(e) => setNewCategoryBudget(e.target.value)}
      />
      <button onClick={createCategory}>Kategorie erstellen</button>
    </div>
    <button 
      className="delete-btn"
      onClick={() => setDeleteMode(!deleteMode)}>
      {deleteMode ? "Löschen beenden" : "Kategorie löschen"}
    </button>
  </div>
  );
}

export default Dashboard;

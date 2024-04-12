import { useContext, useEffect, useState } from "react";
import Legend from "./legend/Legend.jsx";
import UserData from "../Context/UserData.jsx";

const URIAccount = "http://localhost:1305/account";
const URICategory = "http://localhost:1305/category";

function Dashboard() {
  const [account, setAccount] = useState(null);
  const [categories, setCategories] = useState([]);
  const { userData, setUserData } = useContext(UserData);
  const [deleteMode, setDeleteMode] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryBudget, setNewCategoryBudget] = useState(0);
  const [creatingCategory, setCreatingCategory] = useState(false); // Zustand für das Erstellen einer Kategorie

  async function fetchCategories() {
    try {
      const response = await fetch(URICategory, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: userData.role,
        },
        body: JSON.stringify(userData.category),
        credentials: "include",
      });
      const data = await response.json();
      setCategories(data);
      console.log(data);

      if (!response.ok) {
        console.error("Error fetching category data:", response.statusText);
      } else {
        console.log("Erfolgreich", response.statusText);
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
          Authorization: userData.role,
        },
        credentials: "include",
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

  const createCategory = async () => {
    try {
      const response = await fetch(`${URICategory}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: newCategoryName,
          budget: newCategoryBudget,
          account: account._id,
        }),
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
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ _id: categoryId, account_id: account._id }),
      });
      if (!response.ok) {
        console.error("Error deleting category:", response.statusText);
      } else {
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== categoryId)
        );
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const handleDeleteClick = (categoryId) => {
    deleteCategory(categoryId);
  };

  useEffect(() => {
    fetchCategories();
    fetchAccount();
  }, []);

  return (
    <div
      className="dashboard-container"
      style={{ height: "600px", marginTop: "150px", position: "relative" }}
    >
      <div className="name-container" style={{}}>
        {<Legend categories={categories} />}
      </div>
      <div className="cotegory-container" style={{}}>
        {categories ? (
          categories.map((category) => (
            <div
              className="div-container"
              key={category._id}
              style={{ textAlign: "center" }}
            >
              {category.name}

              {deleteMode && (
                <div
                  className="deleteIcon"
                  onClick={() => handleDeleteClick(category._id)}
                >
                  X
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div
        className="join-container"
        style={{
          height: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "52vh",
          right: "2vh",
          left: "2vh",
        }}
      >
        {!creatingCategory && ( // Nur anzeigen, wenn keine Kategorie erstellt wird
          <button className="btn" onClick={() => setCreatingCategory(true)}>
            Kategorie erstellen
          </button>
        )}
        {creatingCategory && ( // Zeige die Eingabefelder nur an, wenn eine Kategorie erstellt wird
          <>
            <input
              type="text"
              placeholder="Kategoriename"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <input
              style={{ margin: "5px" }}
              type="number"
              placeholder="Budget"
              value={newCategoryBudget}
              onChange={(e) => setNewCategoryBudget(parseFloat(e.target.value))}
            />
            <button className="btn" onClick={createCategory}>
              Kategorie erstellen
            </button>
          </>
        )}
        <button
          className="btn"
          style={{ margin: "5px" }}
          onClick={() => setDeleteMode(!deleteMode)}
        >
          {deleteMode ? "Löschen beenden" : "Kategorie löschen"}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

import { useContext, useEffect, useRef, useState } from "react";
import Legend from "./legend/Legend.jsx";
import UserData from "../Context/UserData.jsx";
import { useNavigate } from "react-router-dom";

const URIAccount = "http://localhost:1305/account";
const URICategory = "http://localhost:1305/category";

function Dashboard() {
  const Navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [categories, setCategories] = useState([]);
  const { userData, setUserData } = useContext(UserData);
  const [deleteMode, setDeleteMode] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryBudget, setNewCategoryBudget] = useState(0);
  const [creatingCategory, setCreatingCategory] = useState(false); // Zustand für das Erstellen einer Kategorie
  const newName = useRef(null);
  const newBudget = useRef(null);

  async function fetchCategories() {
    try {
      const response = await fetch(`${URICategory}/findById`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: userData.role,
        },
        body: JSON.stringify(userData.category),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Error fetching category data:", response.statusText);
      } else {
        console.log("Erfolgreich", response.statusText);
        setCategories(data.foundCategories);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }


  async function fetchAccount() {
    try {
      const response = await fetch(`${URIAccount}/findById`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: userData.role,
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (!response.ok) {
        console.error("Error fetching account data:", response.statusText);
      } else {
        setUserData(data);
        console.log("Succsessful:", response.statusText);
        console.log(userData);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  const createCategory = async () => {
    console.log(
      "Creating category with name:",
      newName.current.value,
      "and budget:",
      newBudget.current.value
    );
    try {
      const response = await fetch(`${URICategory}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: userData.role,
        },
        credentials: "include",
        body: JSON.stringify({
          name: newName.current.value,
          budget: newBudget.current.value,
          account: userData._id,
        }),
      });
      const data = await response.json();
        await fetchAccount();
        await fetchCategories();
       setNewCategoryName("");
       setNewCategoryBudget(0);
      
      if (!response.ok) {
        console.error("Error creating category:", response.statusText);
      } else { 
        setCategories((prevCategories) => [
          ...prevCategories,
          data,
        ]);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };
  

  const deleteOneCategoryFromAccount = async (newCategory) => {
    try {
      console.log("Userdata Id:", userData._id,  "Category-Id: ", newCategory);
      
      const response = await fetch(`${URIAccount}/update`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
          Authorization: userData.role,
        },
        credentials: "include",
        body: JSON.stringify({
          userId: userData._id, 
          categoryIdToRemove: newCategory 
        }),
      });
      const data = await response.json();
      console.log("Data: ", data);
      
      if (!response.ok) {
        console.error("Error deleting category:", response.statusText);
      } else {
        console.log("Category deleted!", response.statusText);

        setUserData({ ...userData, category: userData.category.filter(catId => catId !== newCategory) });

      }
    } catch(error) {
      console.error("Error: ", error)
    }
  }
  
  const deleteCategory = async (categoryId) => {
    try {
      const newCategoryId = categoryId
      const response = await fetch(`${URICategory}/hard-delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: userData.role,
        },
        credentials: "include",
        body: JSON.stringify({ _id: categoryId }),
      });
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        console.error("Error deleting category:", response.statusText);
      } else {
        console.log("Category gelöscht!", response.statusText);
        
        fetchCategories()
        deleteOneCategoryFromAccount(newCategoryId)
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

  console.log(categories);
  
  return (
    <div
      className="dashboard-container"
      style={{ height: "600px", marginTop: "150px", position: "relative" }}
    >
      <div className="name-container" style={{}}>
        {<Legend categories={categories} />}
      </div>
      <div className="cotegory-container" style={{}}>
  {categories && userData ? (
    categories.map((category) => (
      <div
        className="div-container"
        key={category?._id}
        style={{ textAlign: "center" }}
      >
        {category && category?.name}
        {deleteMode && (
          <div
            className="deleteIcon"
            onClick={() => handleDeleteClick(category?._id)}
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
        {!creatingCategory && (
          <button className="btn" onClick={() => setCreatingCategory(true)}>
            Kategorie erstellen
          </button>
        )}
        {creatingCategory && (
          <div className="create-Category">
            <input
              type="text"
              ref={newName}
              placeholder="Kategoriename"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <input
              style={{ margin: "5px" }}
              type="number"
              ref={newBudget}
              placeholder="Budget"
              value={newCategoryBudget}
              onChange={(e) => setNewCategoryBudget(parseFloat(e.target.value))}
            />
            <button className="btn" onClick={createCategory}>
              Kategorie erstellen
            </button>
          </div>
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

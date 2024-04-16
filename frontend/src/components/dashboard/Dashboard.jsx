import { useContext, useEffect, useState } from "react";
import Legend from "./legend/Legend.jsx";
import UserData from "../Context/UserData.jsx";

const URIAccount = "http://localhost:1305/account";
const URICategory = "http://localhost:1305/category/findById";
const URIExpenses = "http://localhost:1305/expenses";

function Dashboard() {
  const [ account, setAccount ] = useState(null);
  const [ categories, setCategories ] = useState([]);
  const { userData, setUserData } = useContext(UserData);
  const [ deleteMode, setDeleteMode ] = useState(false);
  const [ newCategoryName, setNewCategoryName ] = useState("");
  const [ newCategoryBudget, setNewCategoryBudget ] = useState(0);
  const [ creatingCategory, setCreatingCategory ] = useState(false); 
  const [ expenses, setExpenses ] = useState([]);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ selectedCategoryId, setSelectedCategoryId ] = useState(null);

  async function fetchExpenses(categoryId) {
    try {
      const response = await fetch(URIExpenses, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: categoryId }), 
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Error fetching expenses: ${response.status}`); 
      }
      const data = await response.json(); 
      setExpenses(data); 
      console.log(data);
    } catch (error) {
      console.error("Error fetching expenses data:", error); 
      setErrorMessage("fetch failed", userData);
    }
  }


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
      setCategories(data.foundCategories);
      console.log(data.foundCategories);

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

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId); 
    fetchExpenses(categoryId); 
  };

  useEffect(() => {
    fetchExpenses(selectedCategoryId);
  }, [selectedCategoryId]);

  useEffect(() => {
  fetchCategories();
  fetchAccount();
}, []);

useEffect(() => {
  fetchExpenses(selectedCategoryId);
}, [selectedCategoryId]);


  const categoryBudgets = categories.map(category => category.limitedBudget);
  const sumCategoryBudgets = categoryBudgets.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const totalRest = userData.budget - sumCategoryBudgets
  const getColor = (percent) => {
    if (percent > 50 ) {
      return 'greenyellow';
    } else if ( percent > 30 ) {
      return 'yellow';
    } else {
      return 'red';
    }
  } 


  return (
    <div
      className="dashboard-container"
      style={{ height: "600px", marginTop: "150px", position: "relative" }}
    >
      ({expenses.cost})
      ({})
      {totalRest}€ want to stuff
      <div className="name-container" style={{}}>
        {<Legend />}
      </div>
      <div className="cotegory-container" style={{}}>
      {errorMessage && <div className="error-message">{errorMessage}</div>}



      {categories && userData ? (
        categories.map((category) => {
          const categoryExpenses = expenses.filter(expense => expense.category.includes(category._id));
          const totalExpenseCost = categoryExpenses.reduce((acc, curr) => acc + curr.cost, 0);
          const currentPercent = (((totalExpenseCost / category.limitedBudget) * 100) - 100) * -1;
          

          return (
            <div key={category._id} className="div-container">
              <div onClick={() => handleCategoryClick(category._id)}>
                {category.name}
              </div>
              {selectedCategoryId === category._id && (
                <ul>
                  {categoryExpenses.map((expense) => (
                    <li key={expense._id}>
                      {expense.description}: {expense.cost}€
                    </li>
                  ))}
                </ul>
              )}
             
              <div 
                className="procent-container" 
                style={{ 
                  "--current-percent": `${currentPercent}%`,
                  backgroundImage: `conic-gradient(
                    ${getColor(currentPercent)} var(--current-percent), 
                    #545F66 var(--current-percent),
                    #545F66 100%)`,
                  zIndex: '-1'
                }}
              />
            </div>
            
          );
        })
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

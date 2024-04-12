import { useEffect, useState } from "react";

const URIAccount = "http://localhost:5000/account";

function Legend() {
  const [account, setAccount] = useState(null);

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
        setAccount(data[0]);
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
      <div >
        {account && account.firstname +" "+ account.lastname }
      </div>
    </div>
  )
}

export default Legend;

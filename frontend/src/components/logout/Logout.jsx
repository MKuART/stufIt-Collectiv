import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Logout() {
const Navigate = useNavigate()

async function logout(){
  const response = await fetch("http://localhost:1305/logout",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
  })
  if (!response.ok) {
    Navigate("/dashboard")
    console.error("Error fetching category data:", response.statusText);
  } else {
    console.log("Erfolgreich", response.statusText);
    Navigate("/")
  }

  }
useEffect(() => {
  logout()
},[])
  
  return (
    <div>Logout</div>
  )
}

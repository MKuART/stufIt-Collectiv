import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoToStart = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkCookie = async () => {
      try {
        
        const response = await fetch("http://localhost:1305/check-cookie", {

          method: "GET",
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (response.ok) {
          navigate("/dashboard")
        } else {
          navigate(`/`);
          console.error('Fehler beim Einloggen:', response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkCookie();
  }, [navigate]);

  return null; 
};

export default GoToStart;

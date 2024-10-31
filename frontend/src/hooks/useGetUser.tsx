import axios from "axios";
import { useEffect, useState } from "react";

export const useGetUser = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/users/me", {
                    withCredentials: true,
                });
                setUser(response.data);
                console.log("User fetched:", response.data); // Logs when data is fetched
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    console.log("Error fetching user:", error.response.data);
                } else {
                    console.log("Error:", error);
                }
            }
        };
        getUser();
    }, []);
    
    return { user };
  }


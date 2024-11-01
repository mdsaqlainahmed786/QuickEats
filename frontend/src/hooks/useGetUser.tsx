import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  userName: string;
  // add other user properties here
}

export const useGetUser = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/users/me", {
          withCredentials: true,
        });
        setUser(response.data);
        console.log("User fetched:", response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.log("Error fetching user:", error.response.data);
          setError(error);
          setUser(null);
        } else {
          console.log("Error:", error);
          setError(error as Error);
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  return { user, isLoading, error };
};
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const useUserState: () => { isLoggedIn: () => boolean } = () => {
  const [userState] = useContext(UserContext);

  const isLoggedIn: () => boolean = () => {
    return userState.name !== "";
  };

  return {
    isLoggedIn
  };
};

export default useUserState;

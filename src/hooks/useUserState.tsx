import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const useUserState: () => {
  isLoggedIn: () => boolean;
  getUserId: () => number | undefined;
} = () => {
  const [userState] = useContext(UserContext);

  const isLoggedIn: () => boolean = () => {
    return userState.name !== "";
  };

  const getUserId: () => number | undefined = () => {
    return userState.id;
  };

  return {
    isLoggedIn,
    getUserId
  };
};

export default useUserState;

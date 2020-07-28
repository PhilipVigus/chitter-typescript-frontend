import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

const useUserState: () => {
  isLoggedIn: () => boolean;
  getUserId: () => number | undefined;
} = () => {
  const [userState] = useContext(MainContext);

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

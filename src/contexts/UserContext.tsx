import React, { createContext, ReactNode, useState } from "react";

type IUserState = {
  name?: string;
  id?: number;
};

type IUserContext = [
  IUserState,
  React.Dispatch<React.SetStateAction<IUserState>>
];

const UserContext = createContext<IUserContext>([{}, () => null]);

type IProps = {
  children: React.ReactNode;
  initialState: Record<string, unknown>;
};

const UserContextProvider: React.FC<IProps> = ({
  children,
  initialState
}: IProps) => {
  const [userState, setUserState] = useState(initialState);

  return (
    <UserContext.Provider value={[userState, setUserState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };

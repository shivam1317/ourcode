import { createContext, FC, PropsWithChildren, useReducer } from "react";
enum UserActionType {
  SET_USER,
  LOG_OUT,
}

interface UserContextType {
  user: {
    id: string;
    username: string;
    email: string;
    createdAt: string;
  };
  setUser: (action: {
    type: keyof typeof UserActionType;
    payload: Partial<UserContextType["user"]>;
  }) => void;
}

const reducer = (
  state: UserContextType["user"],
  action: { type: keyof typeof UserActionType; payload: any }
) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
      };
    case "LOG_OUT":
      return {
        id: "",
        name: "",
        username: "",
      };
    default:
      return state;
  }
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useReducer(reducer, {
    id: "",
    username: "",
    email: "",
    createdAt: "",
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.displayName = "UserProvider";

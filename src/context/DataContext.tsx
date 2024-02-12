import { Dispatch, SetStateAction, createContext } from "react";

interface DataContext {
  identifier: string;
  setIdentifier: Dispatch<SetStateAction<string>>;
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
}

export const DataContext = createContext<DataContext>({
  identifier: "",
  setIdentifier: () => {},
  success: false,
  setSuccess: () => {}
});

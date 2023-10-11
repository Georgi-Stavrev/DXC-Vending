import { Dispatch, SetStateAction, createContext, useState } from "react";

export const useChange = () => {
  const [change, setChange] = useState<number>(0);

  return { change, setChange };
};

interface DefaultChangeData {
  change: number;
  setChange: Dispatch<SetStateAction<number>>;
}
export const ChangeContext = createContext<DefaultChangeData>({
  change: 0,
  setChange: () => {},
});

import { Dispatch, SetStateAction, createContext, useState } from "react";

export const usePaidAmount = () => {
  const [paidAmount, setPaidAmount] = useState<number>(0);

  return { paidAmount, setPaidAmount };
};

interface DefaultPaidAmountData {
  paidAmount: number;
  setPaidAmount: Dispatch<SetStateAction<number>>;
}
export const PaidAmountContext = createContext<DefaultPaidAmountData>({
  paidAmount: 0,
  setPaidAmount: () => {},
});

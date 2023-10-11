import { createContext } from "react";
import { useVendingMachineData } from "./useVendingMachineData";
import { useSelectedItem } from "./useSelectedItem";
import { useChange } from "./useChange";
import { usePurchasedItem } from "./usePurchasedItem";
import { useWalletList } from "./useWalletList";
import { usePaidAmount } from "./usePaidAmount";
import {
  InventoryItem,
  VendingMachineData,
  WalletItem,
} from "../api/dataAccess";

export const useContextProvider = () => {
  const { change, setChange } = useChange();
  const { paidAmount, setPaidAmount } = usePaidAmount();
  const { purchasedItem, setPurchasedItem } = usePurchasedItem();
  const { selectedItem, setSelectedItem } = useSelectedItem();
  const { vendingMachineData, setVendingMachineData } = useVendingMachineData();
  const { walletList, setWalletList } = useWalletList();
  return {
    change,
    setChange,
    paidAmount,
    setPaidAmount,
    purchasedItem,
    setPurchasedItem,
    selectedItem,
    setSelectedItem,
    vendingMachineData,
    setVendingMachineData,
    walletList,
    setWalletList,
  };
};

interface DefaultContextValues {
  change: number;
  setChange: React.Dispatch<React.SetStateAction<number>>;
  paidAmount: number;
  setPaidAmount: React.Dispatch<React.SetStateAction<number>>;
  purchasedItem: InventoryItem;
  setPurchasedItem: React.Dispatch<React.SetStateAction<InventoryItem>>;
  selectedItem: InventoryItem;
  setSelectedItem: React.Dispatch<React.SetStateAction<InventoryItem>>;
  vendingMachineData: VendingMachineData;
  setVendingMachineData: React.Dispatch<
    React.SetStateAction<VendingMachineData>
  >;
  walletList: WalletItem[];
  setWalletList: React.Dispatch<React.SetStateAction<WalletItem[]>>;
}
const defaultValues: DefaultContextValues = {
  change: 0,
  setChange: () => {},
  paidAmount: 0,
  setPaidAmount: () => {},
  purchasedItem: { name: "", price: 0, quantity: 0 },
  setPurchasedItem: () => {},
  selectedItem: { name: "", price: 0, quantity: 0 },
  setSelectedItem: () => {},
  vendingMachineData: { productCap: 0, inventory: [] },
  setVendingMachineData: () => {},
  walletList: [],
  setWalletList: () => {},
};
export const Context = createContext<DefaultContextValues>(defaultValues);

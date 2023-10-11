import {
  getAllVendingMachineData,
  InventoryItem,
  VendingMachineData,
} from "../api/dataAccess";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  createContext,
} from "react";

export const useVendingMachineData = () => {
  const [vendingMachineData, setVendingMachineData] =
    useState<VendingMachineData>({ productCap: 0, inventory: [] });

  useEffect(() => {
    const fetchData = async () => {
      setVendingMachineData(await getAllVendingMachineData());
    };
    fetchData();
  }, []);

  return { vendingMachineData, setVendingMachineData };
};

interface DefaultVendingData {
  vendingMachineData: VendingMachineData;
  setVendingMachineData: Dispatch<SetStateAction<VendingMachineData>>;
}
export const VendingMachineDataContext = createContext<DefaultVendingData>({
  vendingMachineData: { productCap: 0, inventory: [] as InventoryItem[] },
  setVendingMachineData: () => {},
});

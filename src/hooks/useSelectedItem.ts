import { InventoryItem } from "../api/dataAccess";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export const useSelectedItem = () => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem>({
    name: "",
    price: 0,
    quantity: 0,
  });

  return { selectedItem, setSelectedItem };
};

interface DefaultSelectedItemData {
  selectedItem: InventoryItem;
  setSelectedItem: Dispatch<SetStateAction<InventoryItem>>;
}
export const SelectedItemContext = createContext<DefaultSelectedItemData>({
  selectedItem: { name: "", price: 0, quantity: 0 },
  setSelectedItem: () => {},
});

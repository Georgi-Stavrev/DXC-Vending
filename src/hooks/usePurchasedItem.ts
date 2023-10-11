import { InventoryItem } from "../api/dataAccess";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export const usePurchasedItem = () => {
  const [purchasedItem, setPurchasedItem] = useState<InventoryItem>({
    name: "",
    price: 0,
    quantity: 0,
  });

  return { purchasedItem, setPurchasedItem };
};

interface DefaultPurchasedItemData {
  purchasedItem: InventoryItem;
  setPurchasedItem: Dispatch<SetStateAction<InventoryItem>>;
}
export const PurchasedItemContext = createContext<DefaultPurchasedItemData>({
  purchasedItem: { name: "", price: 0, quantity: 0 },
  setPurchasedItem: () => {},
});

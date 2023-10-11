import { DxcButton } from "@dxc-technology/halstack-react";
import styles from "./Selection.module.css";
import { useContext } from "react";
import { Context } from "../hooks/useContextProvider";

const Selection = () => {
  const {
    selectedItem,
    setSelectedItem,
    paidAmount,
    setPaidAmount,
    change,
    setChange,
    vendingMachineData,
    setVendingMachineData,
    setPurchasedItem,
  } = useContext(Context);

  const pay = () => {
    if (selectedItem.name === "" || paidAmount < selectedItem.price) {
      return;
    }

    // Update the vending machine's inventory
    const updatedInventory = vendingMachineData.inventory.map((item) =>
      item.name === selectedItem.name
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    setVendingMachineData({
      ...vendingMachineData,
      inventory: updatedInventory,
    });

    const newChange = paidAmount - selectedItem.price;
    setChange(change + newChange);
    setPurchasedItem({ ...selectedItem });
    setSelectedItem({ name: "", quantity: 0, price: 0 });
    setPaidAmount(0);
  };

  const selectedItemText =
    selectedItem.name === ""
      ? "1. Select an item"
      : `Selected: ${selectedItem.name}`;
  const paymentText =
    paidAmount === 0 ? "2. Pay" : `Payment: ${(paidAmount / 100).toFixed(2)}`;
  const costText = `Cost: ${(selectedItem.price / 100).toFixed(2)} Ð`;

  return (
    <div className={styles.selection}>
      <span className={styles.selection__item}>{selectedItemText}</span>
      <span className={styles.selection__payment}>{paymentText}</span>
      <span className={styles.selection__cost}>{costText}</span>
      <div className={styles.selection__button}>
        <DxcButton label="Pay" onClick={pay} />
      </div>
    </div>
  );
};

export default Selection;

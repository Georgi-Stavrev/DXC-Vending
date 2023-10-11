import { useContext } from "react";
import { InventoryItem } from "../api/dataAccess";
import styles from "./Vending.module.css";
import { Context } from "../hooks/useContextProvider";

const Vending = () => {
  const {
    vendingMachineData,
    setSelectedItem,
    change,
    setChange,
    walletList,
    setWalletList,
    purchasedItem,
  } = useContext(Context);

  const selectItem = (item: InventoryItem) => {
    if (item.quantity > 0) {
      setSelectedItem(item);
    }
  };

  const takeBackChange = (change: number) => {
    if (change <= 0) {
      return;
    }

    const updatedWalletList = [...walletList];
    const sortedWallet = updatedWalletList
      .filter((coin) => coin.isAccepted)
      .sort((a, b) => b.value - a.value);

    for (const coin of sortedWallet) {
      const coinCountToAdd = Math.floor(change / coin.value);

      if (coinCountToAdd > 0) {
        coin.quantity += coinCountToAdd;
        change -= coinCountToAdd * coin.value;
      }
    }
    setChange(0);
    setWalletList(sortedWallet);
  };

  return (
    <div className={styles.vending}>
      <div className={styles.vending__display}>
        {" "}
        {vendingMachineData.inventory.map((item: InventoryItem) => (
          <button
            type="button"
            key={item.name}
            onClick={() => selectItem(item)}
            disabled={item.quantity === 0}
          >
            <span className={styles["vending__display-amount"]}>
              {item.quantity}x {item.name}
            </span>
            <span className={styles["vending__display-price"]}>
              {Number(item.price / 100).toFixed(2)}$
            </span>
          </button>
        ))}
      </div>
      <div className={styles.vending__dispenser}>
        <button type="button" onClick={() => takeBackChange(change)}>
          Change: {Number(change / 100).toFixed(2)}
        </button>
        {purchasedItem.name === "" ? (
          <span></span>
        ) : (
          <span>{purchasedItem.name} bought</span>
        )}
      </div>
    </div>
  );
};

export default Vending;

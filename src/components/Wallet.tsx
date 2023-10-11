import { useContext } from "react";
import { WalletItem } from "../api/dataAccess";
import { Context } from "../hooks/useContextProvider";
import styles from "./Wallet.module.css";

import img1Dollar from "../assets/1 Dollar.png";
import img50Cents from "../assets/50 Cents.png";
import img10Cents from "../assets/10 Cents.png";
import img5Cents from "../assets/5 Cents.png";

const Wallet = () => {
  const { walletList, setWalletList, paidAmount, setPaidAmount } =
    useContext(Context);

  const totalValue =
    Number(
      walletList
        .map((coin) => coin.quantity * coin.value)
        .reduce((total, value) => total + value, 0) / 100
    ).toFixed(2) ?? 0;

  const srcImages: { [key: string]: string } = {
    "1 Dollar.png": img1Dollar,
    "50 Cents.png": img50Cents,
    "10 Cents.png": img10Cents,
    "5 Cents.png": img5Cents,
  };

  const insertCoin = (coin: WalletItem) => {
    const updatedWalletList = [...walletList];
    const coinIndex = updatedWalletList.findIndex(
      (item) => item.denomination === coin.denomination
    );
    if (coinIndex !== -1 && updatedWalletList[coinIndex].quantity > 0) {
      updatedWalletList[coinIndex].quantity--;
      setPaidAmount(paidAmount + coin.value);
    }
    setWalletList(updatedWalletList);
  };

  return (
    <div className={styles.wallet}>
      <p>Balance: {totalValue}</p>
      <div className={styles.wallet__coins}>
        {walletList
          .filter((coin) => coin.isAccepted === true)
          .map((coin) => (
            <button
              type="button"
              onClick={() => {
                insertCoin(coin);
              }}
              key={coin.denomination}
            >
              {" "}
              <img src={srcImages[coin.imgSrc]} /> {coin.denomination} x
              {coin.quantity}{" "}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Wallet;

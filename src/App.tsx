import styles from "./App.module.css";
import "./index.css";
import Header from "./components/Header";
import Wallet from "./components/Wallet";
import Selection from "./components/Selection";
import Vending from "./components/Vending";
import { DxcButton } from "@dxc-technology/halstack-react";
import { Context, useContextProvider } from "./hooks/useContextProvider";

const App = () => {
  const contextValues = useContextProvider();

  const icon = (
    <svg viewBox="0 0 16 16" fill="currentColor">
      <path
        d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"
        fill="black"
      ></path>
      <path
        d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"
        fill="black"
      ></path>
    </svg>
  );

  const reset = () => {
    const updatedWalletList = [...contextValues.walletList];
    const sortedWallet = updatedWalletList
      .filter((coin) => coin.isAccepted)
      .sort((a, b) => b.value - a.value);

    let amount = contextValues.paidAmount;
    for (const coin of sortedWallet) {
      const coinCountToAdd = Math.floor(amount / coin.value);

      if (coinCountToAdd > 0) {
        coin.quantity += coinCountToAdd;
        amount -= coinCountToAdd * coin.value;
      }
    }
    contextValues.setWalletList(sortedWallet);
    contextValues.setPaidAmount(0);
  };

  return (
    <div className={styles.container}>
      <Context.Provider value={contextValues}>
        <Header></Header>
        <Wallet></Wallet>
        <Selection></Selection>
        <Vending></Vending>
        <DxcButton
          label="RESET"
          type="reset"
          mode="secondary"
          onClick={() => reset()}
          icon={icon}
        />
      </Context.Provider>
    </div>
  );
};

export default App;

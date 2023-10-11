import { getWallet, WalletItem } from "../api/dataAccess";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export const useWalletList = () => {
  const [walletList, setWalletList] = useState<WalletItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setWalletList(await getWallet());
    };
    fetchData();
  }, []);

  return { walletList, setWalletList };
};

interface DefaultWalletData {
  walletList: WalletItem[];
  setWalletList: Dispatch<SetStateAction<WalletItem[]>>;
}
export const WalletDataContext = createContext<DefaultWalletData>({
  walletList: [],
  setWalletList: () => {},
});

 const API_URL = 'http://localhost:3000';

 // wallet coin
export interface WalletItem {
    imgSrc: string;
    quantity: number;
    denomination: string;
    value: number;
    isAccepted: boolean;
}

// vending machine product
export interface InventoryItem {
    name: string;
    price: number;
    quantity: number;
}

// vending machine data
export interface VendingMachineData {
    productCap: number;
    inventory: InventoryItem[];
}

// Get wallet data
// returns WalletItem[]
export const getWallet = async (): Promise<WalletItem[]> => {
    try {
        const response = await fetch(`${API_URL}/wallet`);
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }
        const walletData: WalletItem[] = await response.json();
        return walletData;
    } catch (error) {
        console.error('Error fetching wallet data:', error);
        throw error;
    }
};

// Update wallet
export const updateWallet = async (updatedWallet: WalletItem[]): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/wallet`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedWallet),
        });
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error updating wallet data:', error);
        throw error;
    }
};

// Get product cap
// returns number
export const getProductCap = async (): Promise<number> => {
    try {
        const response = await fetch(`${API_URL}/vendingMachine`);
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }
        const vendingMachineData: VendingMachineData = await response.json();
        return vendingMachineData.productCap;
    } catch (error) {
        console.error('Error fetching product cap data:', error);
        throw error;
    }
};

// Get vending machine inventory
// returns InventoryItem[]
export const getInventory = async (): Promise<InventoryItem[]> => {
    try {
        const response = await fetch(`${API_URL}/vendingMachine`);
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }
        const vendingMachineData: VendingMachineData = await response.json();
        return vendingMachineData.inventory;
    } catch (error) {
        console.error('Error fetching inventory data:', error);
        throw error;
    }
};

// Get vending machine inventory
// returns InventoryItem[]
export const getAllVendingMachineData = async (): Promise<VendingMachineData> => {
    try {
        const response = await fetch(`${API_URL}/vendingMachine`);
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }
        const vendingMachineData: VendingMachineData = await response.json();
        return vendingMachineData;
    } catch (error) {
        console.error('Error fetching vending machine data:', error);
        throw error;
    }
};

// Update vending machine inventory (update product quantity)
export const updateInventory = async (updatedInventory: InventoryItem[]): Promise<void> => {
    const productCap: number = await getProductCap();
    // check if quantity exceeds product cap
    for (const updatedItem of updatedInventory) {
        if (updatedItem.quantity > productCap) {
            throw new Error(`Quantity for ${updatedItem.name} exceeds the product cap (${productCap}).`);
        }
    }
    // Update inventory items
    try {
        const response = await fetch(`${API_URL}/vendingMachine`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inventory: updatedInventory,
            }),
        });
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error updating inventory data:', error);
        throw error;
    }
};
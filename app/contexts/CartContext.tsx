"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  useState,
} from "react";

// Types
export interface CartItem {
  id: string;
  productId: string;
  packageId: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  features: string[];
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | {
      type: "ADD_ITEM";
      payload: Omit<CartItem, "quantity"> & { quantity?: number };
    }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_FROM_STORAGE"; payload: CartState };

interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// LocalStorage key
const CART_STORAGE_KEY = "codeqr-cart";

// Helper functions for localStorage
const loadCartFromStorage = (): CartState => {
  if (typeof window === "undefined") {
    return { items: [], total: 0, itemCount: 0 };
  }

  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      // Recalculate totals to ensure consistency
      const total = parsedCart.items.reduce(
        (sum: number, item: CartItem) => sum + item.price * item.quantity,
        0
      );
      const itemCount = parsedCart.items.reduce(
        (sum: number, item: CartItem) => sum + item.quantity,
        0
      );
      return {
        items: parsedCart.items,
        total,
        itemCount,
      };
    }
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
  }

  return { items: [], total: 0, itemCount: 0 };
};

const saveCartToStorage = (state: CartState) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

// Initial state
const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  let newState: CartState;

  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.packageId === action.payload.packageId
      );

      let newItems: CartItem[];

      if (existingItemIndex > -1) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? {
                ...item,
                quantity: item.quantity + (action.payload.quantity || 1),
              }
            : item
        );
      } else {
        // Add new item
        const newItem: CartItem = {
          ...action.payload,
          quantity: action.payload.quantity || 1,
        };
        newItems = [...state.items, newItem];
      }

      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      newState = {
        items: newItems,
        total,
        itemCount,
      };
      break;
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      newState = {
        items: newItems,
        total,
        itemCount,
      };
      break;
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, {
          type: "REMOVE_ITEM",
          payload: action.payload.id,
        });
      }

      const newItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      newState = {
        items: newItems,
        total,
        itemCount,
      };
      break;
    }

    case "CLEAR_CART":
      newState = initialState;
      break;

    case "LOAD_FROM_STORAGE":
      return action.payload;

    default:
      return state;
  }

  // Save to localStorage after each state change
  saveCartToStorage(newState);
  return newState;
}

// Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadedCart = loadCartFromStorage();
    if (loadedCart.items.length > 0 || loadedCart.total > 0) {
      dispatch({ type: "LOAD_FROM_STORAGE", payload: loadedCart });
    }
    setIsLoaded(true);
  }, []);

  const addItem = (
    item: Omit<CartItem, "quantity"> & { quantity?: number }
  ) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const value: CartContextType = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  // Don't render until cart is loaded from localStorage to prevent hydration mismatch
  if (!isLoaded) {
    return (
      <CartContext.Provider
        value={{
          items: [],
          total: 0,
          itemCount: 0,
          addItem,
          removeItem,
          updateQuantity,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

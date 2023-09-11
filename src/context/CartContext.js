import { createContext, useContext, useReducer, useEffect } from "react";
import products from '../data/product';
import cartReducer from "../reducer/cartReducer";

// การสร้าง context
const CartContext = createContext()
const initState = {
    products: products,
    total: 0,
    amount: 0
}

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initState)

    function formatMoney(money){
        return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    
    function removeItem(id) {
       dispatch({type: "REMOVE", payload: id})
    }

    function addQuantity(id) {
        dispatch({type: "ADD", payload: id})
    }

    function subtractQuantity(id) {
        dispatch({type: "SUBTRACT", payload: id})
    }

    useEffect(() => {
       console.log("คำนวณหาผลรวม")
       dispatch({type: "CALCULATE_TOTAL"})
    }, [state.products])

    return (
        <CartContext.Provider value={{...state, formatMoney, removeItem, addQuantity, subtractQuantity}}>
            {children}
        </CartContext.Provider>
    )
}

// การนำ context ไปใช้งานด้านนอก
export const useCart = () => {
    return useContext(CartContext)
}
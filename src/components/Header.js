import { useCart } from '../context/CartContext';
import './Header.css';

export default function Header() {
    const {amount} = useCart();

    return (
        <header>
            <p>Shopping Application</p>
            <p>สินค้าในตะกร้า : {amount}</p>
        </header>
    )
}
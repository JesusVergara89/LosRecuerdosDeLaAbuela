import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const useBasket = (product) => {

    const [user] = useAuthState(auth)

    const handlePublish = async () => {
        const productref = collection(db, 'Carrito');
        try {
            await addDoc(productref, {
                productID: product.id,
                createdAt: Timestamp.now().toDate(),
                photo: product.image,
                price: product.price,
                idBuyer: user.uid,
                colors: product.colors,
                sizes: product.sizes,
                tallas: '',
                colores: '',
                quantity: product.quantity,
                onShop: 0,
                discount_percentage: product.discount_percentage 
            });
            toast("Producto agregado correctamente", { type: "success" });
        } catch (e) {
            console.log(e)
            toast("Error agregando el producto - Necesitas crear una cuenta primero", { type: "error" });
        }
    };

    return { handlePublish }

}

export default useBasket
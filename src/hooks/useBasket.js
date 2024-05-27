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
                createdAt: Timestamp.now().toDate(),
                photo: product.image,
                price: product.price,
                idBuyer: user.uid
            });
            toast("Producto agregado correctamente", { type: "success" });
        } catch (e) {
            console.log(e)
            toast("Error agregando el producto", { type: "error" });
        }
    };

    return { handlePublish }

}

export default useBasket
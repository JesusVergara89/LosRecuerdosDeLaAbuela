import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { setBasketProductValue } from "../store/slices/basketproducts.slice";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const useCallBasket = (thisUser) => {
    const [products, setProducts] = useState([]);
    const [allBasket, setAllBasket] = useState([])
    const [user] = useAuthState(auth);
    const dispatch = useDispatch();
    const setQuantityofProducts = (value) => dispatch(setBasketProductValue(value));

    useEffect(() => {
        const productREF = collection(db, 'Carrito');
        const q = query(productREF, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const Products = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAllBasket(Products)
        });

        return () => unsubscribe();
    }, [thisUser, user]);

    useEffect(() => {
        if (!user) return;
        const productREF = collection(db, 'Carrito');
        const q = query(productREF, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const Products = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const myBasket = Products.filter(product => product.idBuyer === user.uid);
            setQuantityofProducts(myBasket.length);
            setProducts(myBasket);
        });

        return () => unsubscribe();
    }, [thisUser, user]);

    return { products, allBasket };
}

export default useCallBasket;

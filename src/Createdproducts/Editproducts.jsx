import React from 'react'
import './Editproducts.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

const Editproducts = () => {
    const [logUser] = useAuthState(auth);
    const adminUID = import.meta.env.VITE_FIREBASE_APP_ADMIN_UID;
    return (
        logUser && logUser.uid === adminUID  ? (
            <div className="Editproducts">
                 this is edit products
            </div>
        ) : (
            <p className='Dont-allow'>No tienes permiso para editar productos.</p>
        )
    );
}

export default Editproducts
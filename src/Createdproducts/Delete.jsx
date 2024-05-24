import React from 'react' 
import { deleteDoc, doc } from 'firebase/firestore'
import { db, storage } from '../firebaseConfig'
import { deleteObject, ref } from 'firebase/storage'
import { toast } from 'react-toastify'

const Delete = ({ product }) => {

    const Deletedoc = async () => {
        try {
            const Docref = doc(db, 'Products', product.id)
            await deleteDoc(Docref)
            toast('Producto borrado con éxito', { type: 'success' });
            const storageref = ref(storage, product.image)
            await deleteObject(storageref)
        } catch (error) {
            console.log(error);
            toast('Error al borrar el producto', { type: "error" });
        }
    }

    return (
        <i onClick={Deletedoc} className='bx bx-trash' ></i>
    )
}

export default Delete
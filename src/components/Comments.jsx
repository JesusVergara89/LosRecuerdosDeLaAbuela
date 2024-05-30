import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db, auth } from '../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import '../styles/Comments.css'

const Comments = ({ id }) => {
    const [user] = useAuthState(auth)
    const [comment, setComment] = useState([])
    const [addcomment, setAddcomment] = useState('')
    const commentRef = doc(db, "Products", id)

    useEffect(() => {
        onSnapshot(commentRef, (snapshot) => {
            setComment(snapshot.data()?.Comments || [])
        })
    }, [id])

    const handleDeleteComment = (comment) => {
        updateDoc(commentRef, {
            Comments: arrayRemove(comment)
        }).then((e) => {
            toast("Comentario eliminado correctamente", { type: "warning" });
        }).catch((e) => {
            console.log(e)
        })
    }

    const handleChangeComment = async (e) => {
        if (e.key === "Enter") {
            try {
                await updateDoc(commentRef, {
                    Comments: arrayUnion({
                        user: user.uid,
                        userName: user.displayName,
                        comment: addcomment,
                        createdAt: new Date().toISOString(),
                        commentid: uuidv4()
                    })
                })
                toast("Comentario agregado correctamente", { type: "success" });
                setAddcomment('')
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <div className='Comments'>
            <h6>Comentarios</h6>
            {comment.length > 0 ?
                comment.map((comment, i) => (
                    <div className='Comments-body' key={i}>
                        <span className={`comment-online ${comment.user === user?.uid ? 'on' : 'off'}`}>{comment.userName}</span>
                        <div className="Comments-commet">
                            <h5>{comment.comment}</h5>
                        </div>
                        <div className="comment-delete">
                            {comment.user === user?.uid && (
                                <i className='bx bxs-trash' onClick={() => { handleDeleteComment(comment) }}></i>
                            )}
                        </div>
                    </div>
                ))
                :
                <h6>Aún no hay comentarios sobre este producto</h6>
            }
            {user && (
                <textarea
                    type="text"
                    value={addcomment}
                    onChange={(e) => { setAddcomment(e.target.value) }}
                    placeholder='Agrega un comentario sobre este producto'
                    onKeyUp={handleChangeComment}
                />
            )}
            <h6>Presiona la tecla enter para añadir tu comentario</h6>
        </div>
    )
}

export default Comments

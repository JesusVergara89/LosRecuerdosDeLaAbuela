import React from 'react'
import '../styles/Likes.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'

const Likes = ({ product }) => {

  const navigate = useNavigate()
  const [onlineUser] = useAuthState(auth)

  const likesRef = doc(db, "Products", product.id)
  const handleClick = () => {
    if (onlineUser) {
      if (product.likes?.includes(onlineUser?.uid)) {
        updateDoc(likesRef, {
          likes: arrayRemove(onlineUser?.uid)
        }).then(() => {
          console.log('unliked')
        }).catch((e) => {
          console.log(e)
        })
      } else {
        updateDoc(likesRef, {
          likes: arrayUnion(onlineUser?.uid)
        }).then(() => {
          console.log('liked')
        }).catch((e) => {
          console.log(e)
        })
      }
    } else {
      navigate('/login')
    }
  }

  return (
    <div className='likes'>
      <i className={!product.likes?.includes(onlineUser?.uid) ? 'bx bx-heart' : 'bx bxs-heart on'}
        onClick={handleClick} />
      <h6>{product.likes.length === 0 ? '' : product.likes.length}</h6>
    </div>
  )
}

export default Likes
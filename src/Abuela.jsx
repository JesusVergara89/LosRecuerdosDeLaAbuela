import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Protectedroutes from "./components/Protectedroutes"
import Header from "./components/Header"
import Singleproduct from "./components/Singleproduct"
import Login from "./auth/Login"
import Register from "./auth/Register"
import Carrito from "./components/Carrito"
import Createdproduct from "./Createdproducts/Createdproduct"


function Abuela() {

  return (
    <div className="Abuela">


      <Header />


      <Routes>

        <Route path='/'
          element={
            <Home />
          }
        />

        <Route path='/singleproduct/:id'
          element={
            <Singleproduct />
          }
        />

        <Route path='/login'
          element={
            <Login />
          }
        />

        <Route path='/register'
          element={
            <Register />
          }
        />

        <Route element={<Protectedroutes />}>
          <Route path='/carrito'
            element={
              <Carrito/>
            }
          />
          <Route path='/create'
            element={
              <Createdproduct/>
            }
          />
        </Route>
      </Routes>

    </div>
  )
}

export default Abuela

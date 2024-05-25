import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Protectedroutes from "./components/Protectedroutes"
import Header from "./components/Header"
import Singleproduct from "./components/Singleproduct"
import Login from "./auth/Login"
import Register from "./auth/Register"
import Createdproduct from "./Createdproducts/Createdproduct"
import Editproducts from "./Createdproducts/Editproducts"
import Categorycomponent from "./components/Categorycomponent"
import Basket from "./components/Basket"


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

        <Route path='/categorycomponent/:section'
          element={
            <Categorycomponent />
          }
        />

        <Route element={<Protectedroutes />}>
          <Route path='/basket'
            element={
              <Basket />
            }
          />
          <Route path='/create'
            element={
              <Createdproduct />
            }
          />
          <Route path='/edit'
            element={
              <Editproducts />
            }
          />
        </Route>
      </Routes>

    </div>
  )
}

export default Abuela

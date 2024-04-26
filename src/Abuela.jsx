import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Protectedroutes from "./components/Protectedroutes"
import Header from "./components/Header"
import Singleproduct from "./components/Singleproduct"


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
            <Singleproduct/>
          }
        />

        <Route element={<Protectedroutes />}>
          <Route path='/profile'
            element={
              <div>This will be protected</div>
            }
          />
        </Route>
      </Routes>
    </div>
  )
}

export default Abuela

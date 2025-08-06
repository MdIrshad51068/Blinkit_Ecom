import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/SignUp'
import Home from './components/Home'
import Browse from './components/Browse'
import RequestPage from './components/RequestPage'
import Buy from './components/Buy'
import Details from './components/Details'
import Profile from './components/Profile'
import Cart from './components/Cart'
import About from './components/About'
import OwnerPage from './components/Owner/OwnerPage'
// import Companies from './components/admin/Companies'
// import CompanyCreate from './components/admin/CompanyCreate'
// import CompanySetup from './components/admin/CompanySetup'
// import AdminJobs from "./components/admin/AdminJobs";
// import PostJob from './components/admin/PostJob'
// import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/Owner/ProtectedRoute'
import ProductRegistration from './components/Owner/ProductRegistration'
import ApplicantsOfProduct from './components/Owner/ApplicantsOfProduct'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/request",
    element: <RequestPage/>
  },
  {
    path: "/payment",
    element: <Buy/>
  },
  {
    path: "/detail/:id",
    element: <Details/>
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  // // admin ke liye yha se start hoga
  {
    path:"/owner",
    element: <ProtectedRoute><OwnerPage/></ProtectedRoute>
  },
  {
    path:"/productregistration",
    element: <ProtectedRoute><ProductRegistration/></ProtectedRoute> 
  },
  {
    path:"/applicants/:id",
    element:<ProtectedRoute><ApplicantsOfProduct/></ProtectedRoute> 
  },
  // {
  //   path:"/admin/jobs",
  //   element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
  // },
  // {
  //   path:"/admin/jobs/create",
  //   element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  // },
  // {
  //   path:"/admin/jobs/:id/applicants",
  //   element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  // },

])
function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App

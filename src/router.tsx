import { Routes, Route } from 'react-router-dom'
import SigninPage from "./pages/SigninPage"
import Home from './pages/Home'
import AddEmployee from './components/AddEmployee'
import AllEmployee from './components/AllEmployee'
import Profile from './components/Profile'
import MainHome from './components/MainHome'
import AttendenceLeave from './components/AttendenceLeave'
import Dashboard from './components/Dashboard'
const AppRoutes = () => {
  return (

    <Routes>

      <Route path="/signin" element={<SigninPage />} />

      <Route path="/" element={<Home />}>
        <Route path="profile" element={<Profile />} />
        <Route path="" element={<Dashboard />} />
        <Route path='addemployee' element={<AddEmployee />} />
        <Route path="allemployee" element={<AllEmployee />} />
        <Route path="attendance" element={<AttendenceLeave />} />
      </Route>
      
      <Route path='*' element={<MainHome/>} />

    </Routes>
  )

}
export default AppRoutes
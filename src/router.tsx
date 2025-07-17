import { Routes, Route } from 'react-router-dom'
import SigninPage from "./pages/SigninPage"
import Home from './pages/Home'
import AddEmployee from './components/AddEmployee'
import AllEmployee from './components/AllEmployee'
import Profile from './components/Profile'
import AttendenceLeave from './components/AttendenceLeave'
import Dashboard from './components/Dashboard'
import { AuthProvider } from './auth/AuthContext'
import ProtectedRoute from './auth/ProtectedRoute'
import Error_page from './pages/Error_page'
const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }>
          <Route path="profile" element={<Profile />} />
          <Route path="" element={<Dashboard />} />
          <Route path='addemployee' element={<AddEmployee />} />
          <Route path="allemployee" element={<AllEmployee />} />
          <Route path="attendance" element={<AttendenceLeave />} />
        </Route>
        <Route path='*' element={
          <ProtectedRoute>

            <Error_page />
          </ProtectedRoute>
          } />
      </Routes>
    </AuthProvider>
  )

}
export default AppRoutes
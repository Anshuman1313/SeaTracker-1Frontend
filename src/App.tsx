import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './router';
import './App.css'
import { Toaster } from 'sonner';
import { AuthProvider } from './auth/AuthContext';


function App() {

  return (
   <>
       <AuthProvider>

   <Router>
      <AppRoutes />
        <Toaster />
    </Router>
        </AuthProvider>

   </>
  )
}

export default App

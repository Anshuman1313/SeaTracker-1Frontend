import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './router';
import './App.css'
import { Toaster } from 'sonner';


function App() {

  return (
   <>
   
   <Router>
      <AppRoutes />
        <Toaster />
    </Router>
   </>
  )
}

export default App

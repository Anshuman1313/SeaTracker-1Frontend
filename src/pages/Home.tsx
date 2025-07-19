import Menubar from '@/components/Menubar'
import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router'

const Home = () => {
  return (
    <div className='flex flex-col h-[100vh] '>

      <nav className='sticky top-0 z-10'>
        <Navbar />
      </nav>
      <div className='flex h-[calc(100vh-49px)] '>
            <Menubar />
       
            
            <Outlet />
      
      </div>
    </div>
     
    // <div className='flex h-screen '>
    //     <Menubar/>
    //     <Navbar/>
    //     <div className='flex flex-col w-full fixed '>
    //     <div className=' w-[100%] mx-[5vw] overscroll-y-auto'>
    //       <Outlet/>
    //       </div>

    //     </div>
    // </div>
  )
}

export default Home

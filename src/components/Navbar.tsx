import { useAuth } from "@/auth/AuthContext"
import { Button } from "./ui/button"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import api from "@/api/axiosInstance"

const Navbar = () => {
  type Employee = {
    firstName: string,
    lastName: string
  }
  const { logout } = useAuth();
  const { EmployeeId } = useAuth();
  const navigate = useNavigate();
  const [EmployeeFetched, setEmployeeFetched] = useState<Employee>();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  }

  useEffect(() => {
    (async () => {
      try {

        console.log(EmployeeId)

        const res = await api.get(`/Employees/${EmployeeId}`);
        const employe = res.data.data.data
        console.log(typeof(employe))
        console.log(employe)
        setEmployeeFetched(employe)
      } catch (error) {
        console.error(error);
      }
    })();

  }, [])



  return (
    <div className="w-[100%] h-[49px] bg-white border-b border-gray-200 px-4 flex justify-between items-center  ">
      <div>

        <span className="text-blue-500 text-2xl font-medium ">SEA</span>
        <span className="text-black text-2xl font-medium ">TRACKER</span>

      </div>
      <div className="flex gap-3 justify-center items-center">
        <div className="profilepic bg-blue-400 font-semibold text-white rounded-full px-[9px] py-[2px] mt-[1px]">{EmployeeFetched?.firstName.charAt(0).toUpperCase()}</div>
        <div className="proilename cursor-pointer">{EmployeeFetched?.firstName}</div>


        <Button className="bg-primary-foreground text-black hover:bg-accent border-[1px] text-sm " onClick={handleLogout}>Logout</Button>


      </div>

    </div>
  )
}

export default Navbar

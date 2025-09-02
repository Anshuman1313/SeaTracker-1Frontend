import { useAuth } from "@/auth/AuthContext"
import { Button } from "./ui/button"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import api from "@/api/axiosInstance"
import { useAttendanceStore } from "@/store/useAttendanceStore"

const Navbar = () => {
  type Employee = {
    firstName: string,
    lastName: string
  }
   const { attendance, fetchAttendance, isLoading } = useAttendanceStore();
  const { logout } = useAuth();
  const { EmployeeId } = useAuth();
  const navigate = useNavigate();
  const [EmployeeFetched, setEmployeeFetched] = useState<Employee>();

  const employeeId = EmployeeId;

  const handleLogout = () => {
    logout();
    navigate('/signin');
  }
   useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    fetchAttendance(employeeId, today);
  }, [employeeId, fetchAttendance]);
    const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

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
              {attendance?.checkInTime && (
        <div className="attendance-info">
          <span>✅ Checked in: {formatTime(attendance.checkInTime)}</span>
          {attendance.checkOutTime && (
            <span> | Checked out: {formatTime(attendance.checkOutTime)}</span>
          )}
        </div>
      )}
        <div className="profilepic bg-blue-400 font-semibold text-white rounded-full px-[9px] py-[2px] mt-[1px]">{EmployeeFetched?.firstName.charAt(0).toUpperCase()}</div>
        <div className="proilename cursor-pointer">{EmployeeFetched?.firstName}</div>
        <Button className="bg-primary-foreground text-black hover:bg-accent border-[1px] text-sm " onClick={handleLogout}>Logout</Button>
      </div>

    </div>
  )
}

export default Navbar

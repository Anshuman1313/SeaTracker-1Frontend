import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import Pie_Chart from "./Pie_Chart"
import Employee_Card from "./cards/Employee_Card"
import Leave_Card from "./cards/Leave_Card"


const Tabs_Toggle = () => {
    return (
        <div className='flex flex-col '>

            <Tabs defaultValue="overview">


                <TabsList className="w-[40vw] items-center my-2" >
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="employees">Employees</TabsTrigger>
                    <TabsTrigger value="leave_requests">Leave Requests</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="overview"><Pie_Chart /></TabsContent>
                <TabsContent value="employees"><Employee_Card employee={{
                    id: "6",
                    name: "James Wilson",
                    position: "DevOps Engineer",
                    department: "Engineering",
                    status: "present",
                    avatar: "/placeholder.svg?height=40&width=40",
                    email: "james.w@company.com",
                    phone: 16789012,
                    location: "Denver, CO",
                }} />
                </TabsContent>
                <TabsContent value="leave_requests"><Leave_Card leave_employee={
                    {
                        leave_id: 1,
                        from_date: "2025-07-15",
                        to_date: "2025-07-20",
                        status: "Approved",
                        leave_type: "Annual",
                        reason: "Family vacation",
                    }

                } employee={{
                    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
                    employeeName: "Emily Davis",
                    employeeId: "EMP004",
                    department: "Marketing",

                }} /></TabsContent>
                <TabsContent value="analytics">Change your analytics in here.</TabsContent>
            </Tabs>


        </div>



    )
}

export default Tabs_Toggle

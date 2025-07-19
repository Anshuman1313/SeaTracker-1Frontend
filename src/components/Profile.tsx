import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Mail, Phone, Building, User, Edit } from "lucide-react"
interface EmployeeData {
  employeeId: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string; // ISO string format, you could use `Date` if you parse it
  profileImage: string;
}
interface EmployeeStats {
  availableLeaveDays: number;       // e.g., 24
  attendanceRate: number;           // e.g., 95 (as percentage)
  yearsOfService: number;           // e.g., 2.5
}
const employeeStats: EmployeeStats = {
  availableLeaveDays: 24,
  attendanceRate: 95,
  yearsOfService: 2.5
};



// Mock employee data - replace with actual data from your API
const employeeData:EmployeeData= {
  employeeId: 1,
  userId: 101,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@company.com",
  phone: "+1 (555) 123-4567",
  department: "Human Resources",
  designation: "Senior HR Manager",
  joiningDate: "2022-03-15",
  profileImage: "/placeholder.svg?height=120&width=120",
}

export default function Profile() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  }

  return (
    <div className="p-8 bg-gray-50/30 h-[calc(100vh-49px)] w-full  overflow-y-scroll">
      <div className="max-w-6xl mx-auto space-y-8 ">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-gray-900">Employee Profile</h1>
            <p className="text-gray-500 mt-1">Manage your personal and professional information</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Edit className="w-4 h-4" />
            Edit Profile
          </Button>
        </div>

        {/* Main Profile Card */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={employeeData.profileImage || "/placeholder.svg"} alt="Profile" />
                <AvatarFallback className="text-[45px] font-medium bg-blue-100 text-blue-700">
                  {getInitials(employeeData.firstName, employeeData.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h2 className="text-2xl font-medium text-gray-900">
                  {employeeData.firstName} {employeeData.lastName}
                </h2>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                  {employeeData.designation}
                </Badge>
                <p className="text-gray-500 text-sm">Employee ID: {employeeData.employeeId}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-900">
                <User className="w-5 h-5 text-gray-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/50">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium text-gray-900">{employeeData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/50">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium text-gray-900">{employeeData.phone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-900">
                <Building className="w-5 h-5 text-gray-600" />
                Professional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/50">
                  <Building className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium text-gray-900">{employeeData.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/50">
                  <CalendarDays className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Joining Date</p>
                    <p className="font-medium text-gray-900">{formatDate(employeeData.joiningDate)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

    
      

        {/* Additional Information */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-900">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-lg bg-green-50">
                <div className="text-2xl font-semibold text-green-700">{employeeStats.availableLeaveDays}</div>
                <div className="text-sm text-green-600">Available Leave Days</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-blue-50">
                <div className="text-2xl font-semibold text-blue-700">{employeeStats.attendanceRate}</div>
                <div className="text-sm text-blue-600">Attendance Rate</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-purple-50">
                <div className="text-2xl font-semibold text-purple-700">{employeeStats.yearsOfService}</div>
                <div className="text-sm text-purple-600">Years of Service</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

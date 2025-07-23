

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight } from "lucide-react"
import api from "@/api/axiosInstance"

type Employee = {
  id: string
  name: string
  designation: string
  status: "PENDING" | "On LEAVE" | "PRESENT" | "ABSENT"
  email: string
  mobile: string
  department: string
  appliedOn: string
  avatar: string
  [key: string]: string | number // Add index signature
}

type SortField = "name" | "designation" | "status" | "email" | "mobile" | "department" | "appliedOn"

export default function AllEmployee() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [sortField, setSortField] = useState<SortField>("name")
  const [currentPage, setCurrentPage] = useState(1)
  // const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])
  const itemsPerPage = 10

  useEffect(() => {
       // In a real app, this would be an API call
    const mockEmployees: Employee[] = [
      {
        id: "1",
        name: "Annette Black",
        designation: "Project Manager",
        status: "PENDING",
        email: "annetteblack@gmail.com",
        mobile: "+966 56 811 1212",
        department: "Management",
        appliedOn: "12/01/2023",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "2",
        name: "Fatima Nuhan",
        designation: "Sr. Designer",
        status: "On LEAVE",
        email: "fatimanuhan@gmail.com",
        mobile: "+966 56 811 1212",
        department: "Design",
        appliedOn: "17/01/2023",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "3",
        name: "Kristin Watson",
        designation: "Graphic Designer",
        status: "PRESENT",
        email: "kristin_watson@gmail.com",
        mobile: "+966 56 811 1212",
        department: "Design",
        appliedOn: "17/01/2023",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "4",
        name: "Makson Abbot",
        designation: "Business Analyst",
        status: "ABSENT",
        email: "makson_abbot@gmail.com",
        mobile: "+966 56 811 1212",
        department: "Business",
        appliedOn: "17/01/2023",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "5",
        name: "Andrew Niles",
        designation: "Business Analyst",
        status: "PRESENT",
        email: "andrewniles@gmail.com",
        mobile: "+966 56 811 1212",
        department: "Business",
        appliedOn: "17/01/2023",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "6",
        name: "Alberta Hussein",
        designation: "Project Manager",
        status: "PENDING",
        email: "albertahussein@gmail.com",
        mobile: "+966 56 811 1212",
        department: "Management",
        appliedOn: "17/01/2023",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "7",
        name: "Mark Wood",
        designation: "Business Analyst",
        status: "On LEAVE",
        email: "markwood@hotmail.com",
        mobile: "+966 56 811 1212",
        department: "Business",
        appliedOn: "17/01/2023",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "8",
        name: "Kirgis Nusan",
        designation: "Graphic Designer",
        status: "PRESENT",
        email: "kirgisnusan@neom.com",
        mobile: "+966 56 811 1212",
        department: "Design",
        appliedOn: "17/01/2023",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "9",
        name: "Fatima Nuhan",
        designation: "Sr. Designer",
        status: "ABSENT",
        email: "fatimanuhan@gmail.com",
        mobile: "+966 56 811 1212",
        department: "Design",
        appliedOn: "17/01/2023",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "10",
        name: "Ameer Hussein",
        designation: "Business Analyst",
        status: "PRESENT",
        email: "ameerhussein@gmail.com",
        mobile: "+966 56 811 1212",
        department: "Business",
        appliedOn: "17/01/2023",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "11",
        name: "Ameer Hussein",
        designation: "Business Analyst",
        status: "PRESENT",
        email: "ameerhussein@gmail.com",
        mobile: "+966 56 811 1212",
        department: "Business",
        appliedOn: "17/01/2023",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
    id: "12",
    name: "Zara Khan",
    designation: "UI/UX Designer",
    status: "PENDING",
    email: "zarakhan@example.com",
    mobile: "+91 98765 43210",
    department: "Design",
    appliedOn: "12/02/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "13",
    name: "Rahul Mehta",
    designation: "Frontend Developer",
    status: "PRESENT",
    email: "rahulmehta@example.com",
    mobile: "+91 98123 45678",
    department: "Engineering",
    appliedOn: "23/02/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "14",
    name: "Lina D'Souza",
    designation: "HR Manager",
    status: "ABSENT",
    email: "lina.dsouza@example.com",
    mobile: "+91 97654 32109",
    department: "Human Resources",
    appliedOn: "03/03/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "15",
    name: "Sahil Arora",
    designation: "Backend Developer",
    status: "PRESENT",
    email: "sahilarora@example.com",
    mobile: "+91 91234 56789",
    department: "Engineering",
    appliedOn: "15/03/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "16",
    name: "Fatima Noor",
    designation: "QA Engineer",
    status: "PENDING",
    email: "fatimanoor@example.com",
    mobile: "+91 96543 21098",
    department: "Quality Assurance",
    appliedOn: "21/03/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "17",
    name: "Aman Raj",
    designation: "Marketing Executive",
    status: "PRESENT",
    email: "amanraj@example.com",
    mobile: "+91 93456 78901",
    department: "Marketing",
    appliedOn: "01/04/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "18",
    name: "Neha Sharma",
    designation: "Sales Associate",
    status: "ABSENT",
    email: "nehasharma@example.com",
    mobile: "+91 99887 66554",
    department: "Sales",
    appliedOn: "07/04/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "19",
    name: "Kabir Joshi",
    designation: "Data Scientist",
    status: "PRESENT",
    email: "kabirjoshi@example.com",
    mobile: "+91 99871 23456",
    department: "Data",
    appliedOn: "13/04/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "20",
    name: "Priya Verma",
    designation: "Finance Analyst",
    status: "PENDING",
    email: "priyaverma@example.com",
    mobile: "+91 90123 45678",
    department: "Finance",
    appliedOn: "20/04/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "21",
    name: "Arjun Singh",
    designation: "System Admin",
    status: "PRESENT",
    email: "arjunsingh@example.com",
    mobile: "+91 95555 66777",
    department: "IT",
    appliedOn: "25/04/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  
  {
    id: "22",
    name: "Meera Nair",
    designation: "Content Writer",
    status: "PENDING",
    email: "meeranair@example.com",
    mobile: "+91 91111 22233",
    department: "Content",
    appliedOn: "01/05/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "23",
    name: "Rohan Das",
    designation: "DevOps Engineer",
    status: "PRESENT",
    email: "rohandas@example.com",
    mobile: "+91 92222 33344",
    department: "Engineering",
    appliedOn: "04/05/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "24",
    name: "Isha Malhotra",
    designation: "Recruiter",
    status: "ABSENT",
    email: "ishamalhotra@example.com",
    mobile: "+91 93333 44455",
    department: "HR",
    appliedOn: "07/05/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "25",
    name: "Tariq Siddiqui",
    designation: "Support Engineer",
    status: "PENDING",
    email: "tariqs@example.com",
    mobile: "+91 94444 55566",
    department: "Support",
    appliedOn: "10/05/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "26",
    name: "Alisha Jain",
    designation: "Business Analyst",
    status: "PRESENT",
    email: "alishajain@example.com",
    mobile: "+91 95555 66677",
    department: "Business",
    appliedOn: "13/05/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "27",
    name: "Sameer Sheikh",
    designation: "Product Manager",
    status: "PENDING",
    email: "sameers@example.com",
    mobile: "+91 96666 77788",
    department: "Product",
    appliedOn: "16/05/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "28",
    name: "Divya Kapoor",
    designation: "Graphic Designer",
    status: "ABSENT",
    email: "divyak@example.com",
    mobile: "+91 97777 88899",
    department: "Design",
    appliedOn: "19/05/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "29",
    name: "Nikhil Bansal",
    designation: "Database Admin",
    status: "PRESENT",
    email: "nikhilb@example.com",
    mobile: "+91 98888 99900",
    department: "IT",
    appliedOn: "22/05/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "30",
    name: "Sneha Rao",
    designation: "Legal Advisor",
    status: "PENDING",
    email: "snehar@example.com",
    mobile: "+91 90001 11223",
    department: "Legal",
    appliedOn: "25/05/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "31",
    name: "Yusuf Ali",
    designation: "Security Specialist",
    status: "PRESENT",
    email: "yusufali@example.com",
    mobile: "+91 91112 22334",
    department: "Security",
    appliedOn: "28/05/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "32",
    name: "Tanvi Bhatt",
    designation: "Copywriter",
    status: "ABSENT",
    email: "tanvib@example.com",
    mobile: "+91 92223 33445",
    department: "Content",
    appliedOn: "30/05/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "33",
    name: "Jay Patel",
    designation: "Network Engineer",
    status: "PENDING",
    email: "jaypatel@example.com",
    mobile: "+91 93334 44556",
    department: "IT",
    appliedOn: "02/06/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "34",
    name: "Ananya Iyer",
    designation: "HR Executive",
    status: "PRESENT",
    email: "ananyai@example.com",
    mobile: "+91 94445 55667",
    department: "Human Resources",
    appliedOn: "05/06/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "35",
    name: "Manav Chopra",
    designation: "SEO Analyst",
    status: "PENDING",
    email: "manavc@example.com",
    mobile: "+91 95556 66778",
    department: "Marketing",
    appliedOn: "07/06/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "36",
    name: "Sara Sheikh",
    designation: "PR Manager",
    status: "ABSENT",
    email: "saras@example.com",
    mobile: "+91 96667 77889",
    department: "Public Relations",
    appliedOn: "09/06/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "37",
    name: "Nitin Arora",
    designation: "Lead Engineer",
    status: "PRESENT",
    email: "nitina@example.com",
    mobile: "+91 97778 88990",
    department: "Engineering",
    appliedOn: "12/06/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "38",
    name: "Tanya Gill",
    designation: "Accountant",
    status: "PENDING",
    email: "tanyag@example.com",
    mobile: "+91 98889 99001",
    department: "Finance",
    appliedOn: "14/06/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "39",
    name: "Mohit Raina",
    designation: "Solutions Architect",
    status: "PRESENT",
    email: "mohitr@example.com",
    mobile: "+91 90002 00112",
    department: "Engineering",
    appliedOn: "17/06/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "40",
    name: "Ayesha Siddiqui",
    designation: "Operations Manager",
    status: "ABSENT",
    email: "ayeshas@example.com",
    mobile: "+91 91113 11223",
    department: "Operations",
    appliedOn: "20/06/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "41",
    name: "Deepak Yadav",
    designation: "Technical Writer",
    status: "PENDING",
    email: "deepaky@example.com",
    mobile: "+91 92224 22334",
    department: "Content",
    appliedOn: "22/06/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "42",
    name: "Kavya Sharma",
    designation: "UI Developer",
    status: "PRESENT",
    email: "kavyas@example.com",
    mobile: "+91 93335 33445",
    department: "Design",
    appliedOn: "25/06/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "43",
    name: "Vikram Solanki",
    designation: "Finance Manager",
    status: "ABSENT",
    email: "vikrams@example.com",
    mobile: "+91 94446 44556",
    department: "Finance",
    appliedOn: "27/06/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "44",
    name: "Naina Sethi",
    designation: "Talent Acquisition",
    status: "PENDING",
    email: "nainas@example.com",
    mobile: "+91 95557 55667",
    department: "HR",
    appliedOn: "29/06/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "45",
    name: "Harshit Bhalla",
    designation: "Mobile Developer",
    status: "PRESENT",
    email: "harshitb@example.com",
    mobile: "+91 96668 66778",
    department: "Engineering",
    appliedOn: "01/07/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "46",
    name: "Reena Das",
    designation: "Graphic Illustrator",
    status: "PENDING",
    email: "reenad@example.com",
    mobile: "+91 97779 77889",
    department: "Design",
    appliedOn: "03/07/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "47",
    name: "Omar Qureshi",
    designation: "Full Stack Developer",
    status: "ABSENT",
    email: "omarqu@example.com",
    mobile: "+91 98880 88990",
    department: "Engineering",
    appliedOn: "05/07/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "48",
    name: "Ishaan Gulati",
    designation: "Tech Support",
    status: "PENDING",
    email: "ishaang@example.com",
    mobile: "+91 90003 99001",
    department: "Support",
    appliedOn: "07/07/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "49",
    name: "Simran Kaur",
    designation: "Customer Success",
    status: "PRESENT",
    email: "simrank@example.com",
    mobile: "+91 91114 00112",
    department: "Customer Service",
    appliedOn: "09/07/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "50",
    name: "Arnav Bhatia",
    designation: "Junior Engineer",
    status: "PENDING",
    email: "arnavb@example.com",
    mobile: "+91 92225 11223",
    department: "Engineering",
    appliedOn: "11/07/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "51",
    name: "Saloni Mishra",
    designation: "Marketing Manager",
    status: "ABSENT",
    email: "salonim@example.com",
    mobile: "+91 93336 22334",
    department: "Marketing",
    appliedOn: "13/07/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "52",
    name: "Aditya Roy",
    designation: "Engineering Intern",
    status: "PENDING",
    email: "adityar@example.com",
    mobile: "+91 94447 33445",
    department: "Engineering",
    appliedOn: "15/07/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "53",
    name: "Krishna Gopal",
    designation: "HR Intern",
    status: "PRESENT",
    email: "krishnag@example.com",
    mobile: "+91 95558 44556",
    department: "HR",
    appliedOn: "17/07/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "54",
    name: "Aarti Pandey",
    designation: "Finance Intern",
    status: "PENDING",
    email: "aartip@example.com",
    mobile: "+91 96669 55667",
    department: "Finance",
    appliedOn: "19/07/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "55",
    name: "Yash Khurana",
    designation: "Sales Executive",
    status: "ABSENT",
    email: "yashk@example.com",
    mobile: "+91 97770 66778",
    department: "Sales",
    appliedOn: "21/07/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "56",
    name: "Anjali Reddy",
    designation: "Software Tester",
    status: "PRESENT",
    email: "anjalir@example.com",
    mobile: "+91 98881 77889",
    department: "Quality Assurance",
    appliedOn: "23/07/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "57",
    name: "Karan Oberoi",
    designation: "Tech Lead",
    status: "PRESENT",
    email: "karano@example.com",
    mobile: "+91 90004 88990",
    department: "Engineering",
    appliedOn: "25/07/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "58",
    name: "Ritika Arora",
    designation: "SaaS Specialist",
    status: "PENDING",
    email: "ritikaa@example.com",
    mobile: "+91 91115 99001",
    department: "Product",
    appliedOn: "27/07/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "59",
    name: "Dev Malhotra",
    designation: "Analytics Consultant",
    status: "ABSENT",
    email: "devm@example.com",
    mobile: "+91 92226 00112",
    department: "Data",
    appliedOn: "29/07/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "60",
    name: "Nisha Rawat",
    designation: "Brand Manager",
    status: "PRESENT",
    email: "nishar@example.com",
    mobile: "+91 93337 11223",
    department: "Marketing",
    appliedOn: "31/07/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "61",
    name: "Rajiv Sen",
    designation: "Research Associate",
    status: "PENDING",
    email: "rajivs@example.com",
    mobile: "+91 94448 22334",
    department: "Research",
    appliedOn: "02/08/2023",
    avatar: "/placeholder.svg?height=40&width=40",
  }


    ]

    setEmployees(mockEmployees)
  }, [])

  const sortedEmployees = [...employees].sort((a, b) => {
    const aValue = a[sortField] || ""
    const bValue = b[sortField] || ""

    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue)
    }

    return 0
  })

  const paginatedEmployees = sortedEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(employees.length / itemsPerPage)

  // const handleSelectAll = () => {
  //   if (selectedEmployees.length === paginatedEmployees.length) {
  //     setSelectedEmployees([])
  //   } else {
  //     setSelectedEmployees(paginatedEmployees.map((emp) => emp.id))
  //   }
  // }

  // const handleSelectEmployee = (id: string) => {
  //   if (selectedEmployees.includes(id)) {
  //     setSelectedEmployees(selectedEmployees.filter((empId) => empId !== id))
  //   } else {
  //     setSelectedEmployees([...selectedEmployees, id])
  //   }
  // }

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-orange-100 text-orange-800"
      case "ON LEAVE":
        return "bg-purple-100 text-purple-800"
      case "PRESENT":
        return "bg-green-100 text-green-800"
      case "ABSENT":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (

    <div className="space-y-4 w-[100vw] mx-[4vw] mt-8">
      <div className="text-3xl ">ALL EMPLOYEE</div>

      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Sort by:</span>
        <Select value={sortField} onValueChange={(value) => setSortField(value as SortField)} >
          <SelectTrigger className="w-[180px] ">
            <SelectValue placeholder="Select field" />
          </SelectTrigger>
          <SelectContent className="opacity-100 bg-white">
            <SelectItem value="name" >Name</SelectItem>
            <SelectItem value="designation">Designation</SelectItem>
            <SelectItem value="status">Status</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="mobile">Mobile Number</SelectItem>
            <SelectItem value="department">Department</SelectItem>
            <SelectItem value="appliedOn">Applied On</SelectItem>
          </SelectContent>
        </Select>
      </div>
       <div className="flex items-center justify-between">
        <div className="text-sm ">
          Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, employees.length)} of{" "}
          {employees.length} results
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: Math.min(1, totalPages) }, (_, i) => {
            const pageNumber = i + 1
            return (
              <Button
                key={i}
                variant={pageNumber === currentPage ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(pageNumber)}
              >
                {currentPage }
              </Button>
            )
          })}
          {totalPages >1 && currentPage != totalPages && <span>...</span>}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
            {/* Table */}
      <div className="rounded-md border border-gray-200 shadow-xl h-[430px] overflow-scroll overflow-x-hidden">
        <Table>
          <TableHeader >
            <TableRow className="border-gray-200 ">
              {/* <TableHead className="w-[50px] ">
                {/* <Checkbox
                  checked={selectedEmployees.length === paginatedEmployees.length && paginatedEmployees.length > 0}
                  onCheckedChange={handleSelectAll}
                /> */}
              {/* </TableHead>  */}
              <TableHead className="text-center">No.</TableHead>
              <TableHead >Name</TableHead>
              <TableHead >Designation</TableHead>
              <TableHead >Status</TableHead>
              <TableHead >Email</TableHead>
              <TableHead >Mobile Number</TableHead>
              <TableHead >Department</TableHead>
              <TableHead >Joined Date</TableHead>
              {/* <TableHead className="text-center">Action</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedEmployees.map((employee,index) => (
              <TableRow key={employee.id} className="border-gray-400">
                <TableCell className="text-gray-800 text-center">
                  {/* <Checkbox
                    checked={selectedEmployees.includes(employee.id)}
                    onCheckedChange={() => handleSelectEmployee(employee.id)}
                  /> */}
                  {index+1}
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                      {/* <AvatarFallback>{employee?.name?.charAt(0)}</AvatarFallback> */}
                    </Avatar>
                    {employee.name}
                  </div>
                </TableCell>
                <TableCell className="text-gray-800">{employee.designation}</TableCell>
                <TableCell className="text-gray-800">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBgColor(employee.status)}`}>
                    {employee.status}
                  </span>
                </TableCell>
                <TableCell className="text-gray-800">{employee.email}</TableCell>
                <TableCell className="text-gray-800">{employee.mobile}</TableCell>
                <TableCell className="text-gray-800">{employee.department}</TableCell>
                <TableCell className="text-gray-800">{employee.appliedOn}</TableCell>
                {/* <TableCell className="text-gray-800">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-green-100 hover:bg-green-200 text-green-800 border-0"
                    >
                      Notes
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-purple-100 hover:bg-purple-200 text-purple-800 border-0"
                    >
                      View
                    </Button>
                  </div>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    
    </div>
  )
}

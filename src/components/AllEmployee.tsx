import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertTriangle, Building, Calendar, ChevronLeft, ChevronRight, Divide, Mail, MoreHorizontalIcon, Phone, User } from "lucide-react"
import api from "@/api/axiosInstance"
import { Input } from "./ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { toast } from "sonner"
import { Description } from "@radix-ui/react-dialog"
import { Separator } from "@radix-ui/react-select"
import { Badge } from "./ui/badge"

type Employee = {
  employeeId: string
  name: string
  firstName: string
  lastName: string
  designation: string
  status: "PENDING" | "On LEAVE" | "PRESENT" | "ABSENT"
  email: string
  phone: string
  department: string
  joiningDate: string
  avatar: string
  [key: string]: string | number // Add index signature
}
type SortField = "firstName" | "designation" | "status" | "email" | "phone" | "department" 

export default function AllEmployee() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [sortField, setSortField] = useState<SortField>("firstName")
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setsearch] = useState("")
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10

  const getEmployee = async () => {
    let res = await api.get(`/Employees?pageNumber=1&pageSize=1000`)

    console.log(res.data)
    console.log(typeof (res.data.data))
    let emply = res.data.data;
    console.log(Array.isArray(emply), "is array")
    let total = res.data.totalItems
    setEmployees(emply)
    setTotalCount(total)
    return res.data.data;
  }
  async function deleteEmployee(emplyId: any) {
    try {

      let res = await api.delete(`/Employees/${emplyId}`)
      console.log(res.data)
      console.log("deleted employee id is  ", emplyId)
      toast.success("Employee Deleted Successfully"), {
      }
      getEmployee();
    }
    catch (error) {
      toast("Something went wrong", {
        description: `${error}`
      })
    }
  }

  useEffect(() => {
    getEmployee() //calling API
  }, [])
  useEffect(() => {
    setCurrentPage(1)

  }, [search])

  const pagination = function (array: Employee[], currentpage: number, pagesize: number): Employee[] {
    let startIndex = (currentpage - 1) * pagesize;
    let endIndex = startIndex + pagesize;
    return array.slice(startIndex, endIndex);
  }

  const filteredEmployees = employees.sort((a, b) => {
        const fieldA = a[sortField]?.toLowerCase?.() ?? "";
        // console.log(fieldA,"fieldA")
        // console.log(a[sortField] , "whithot lowercase")
        const fieldB = b[sortField]?.toLowerCase?.() ?? "";
        //   console.log(fieldB,"fieldb")
        // console.log(b[sortField] , "whithot lowercase")
        
        return fieldA.localeCompare(fieldB);
    }
    ).filter((e) => {
    let fullname = e.firstName + " " + e.lastName;
    return fullname.toLowerCase().includes(search.toLowerCase())
  }

  );

  const paginatedEmployees = pagination(filteredEmployees, currentPage, itemsPerPage);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const getPageNumbers = (current: number, total: number, maxVisible = 3) => {
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(current - half, 1);
    let end = start + maxVisible - 1;

    if (end > total) {
      end = total;
      start = Math.max(end - maxVisible + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

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
    <div className="space-y-4 mx-[4vw] w-full overflow-scroll mt-8">
      <div className="text-3xl ">ALL EMPLOYEE</div>

      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Sort by:</span>
        <Select value={sortField} onValueChange={(value) => setSortField(value as SortField)} >
          <SelectTrigger className="w-[180px] ">
            <SelectValue placeholder="Select field" />
          </SelectTrigger>
          <SelectContent className="opacity-100 bg-white">
            <SelectItem value="firstName" >Name</SelectItem>
            <SelectItem value="designation">Designation</SelectItem>
            <SelectItem value="status">Status</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="phone">Mobile Number</SelectItem>
            <SelectItem value="department">Department</SelectItem>
          </SelectContent>
        </Select>

      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm grow-2">
          Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredEmployees.length)}
        </div>

        <Input type="text" className="w-[250px] mx-2 " placeholder="Search by Name..." value={search} onChange={(e) => setsearch(e.target.value)} />

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {getPageNumbers(currentPage, totalPages).map((page, index) => (
            <Button key={index} className={(currentPage != page) ? "bg-white text-black" : ""} onClick={() => setCurrentPage(page)}> {page}</Button>
          ))
          }
          {totalPages > 3 && currentPage != totalPages && <span>...</span>}
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

              <TableHead className="text-center">No.</TableHead>
              <TableHead >Name</TableHead>
              <TableHead >Designation</TableHead>
              <TableHead >Status</TableHead>
              <TableHead >Email</TableHead>
              <TableHead >Mobile Number</TableHead>
              <TableHead >Department</TableHead>
              <TableHead > </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedEmployees.map((employee, index) => (
              <TableRow key={index} className="border-gray-400">
                <TableCell className="text-gray-800 text-center">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                      <AvatarFallback>{employee?.firstName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {`${employee.firstName} ${employee.lastName} `}
                  </div>
                </TableCell>
                <TableCell className="text-gray-800">{employee.designation}</TableCell>
                <TableCell className="text-gray-800">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBgColor(employee.status)}`}>
                    {employee.status}
                  </span>
                </TableCell>
                <TableCell className="text-gray-800">{employee.email}</TableCell>
                <TableCell className="text-gray-800">{employee.phone}</TableCell>
                <TableCell className="text-gray-800">{employee.department}</TableCell>
                {/* <TableCell className="text-gray-800">{employee.joiningDate}</TableCell> */}
                <TableCell className="text-gray-800">
                  <Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>


                        <DropdownMenuItem onClick={() => {
                          setShowViewModal(prev => !prev)
                          setSelectedEmployee(employee);
                        }}>View Employee</DropdownMenuItem>


                        <DropdownMenuItem onClick={() => {
                          setShowEditModal(prev => !prev)
                          setSelectedEmployee(employee);
                        }}>Edit Employee</DropdownMenuItem>
                        <DialogTrigger>
                          <DropdownMenuItem variant={"destructive"} >
                            Delete Employee
                          </DropdownMenuItem>
                        </DialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>


                    {/* Delete Dialog (Modal) */}
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="text-red-500" />
                          <DialogTitle>Delete Employee</DialogTitle>
                        </div>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete the employee record.
                        </DialogDescription>
                        <div className="mt-4 text-sm space-y-1">
                          <p>
                            <span className="font-medium text-foreground">Name:</span> {employee.firstName} {employee.lastName}
                          </p>
                          {/* <p>
                            <span className="font-medium text-foreground">Employee ID:</span> {employee.employeeId}
                          </p> */}
                          <p>
                            <span className="font-medium text-foreground">Email:</span> {employee.email}
                          </p>
                          <p>
                            <span className="font-medium text-foreground">Designation:</span> {employee.designation}
                          </p>
                        </div>
                      </DialogHeader>

                      <div className="bg-red-100 border border-red-300 rounded-md p-4 text-sm text-red-700">
                        <p className="font-semibold mb-1 flex items-center gap-1">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          Warning: This action is irreversible
                        </p>
                        <p>
                          All employee data, including performance records, time logs, and associated documents will be permanently deleted.
                        </p>
                      </div>

                      <DialogFooter className="mt-6 sm:justify-end">
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button variant="destructive" onClick={() => deleteEmployee(employee.employeeId)} >Delete Employee</Button>

                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>



                  </Dialog>

                </TableCell>

              </TableRow>
            ))}
          </TableBody>
          {/* View modal */}
          <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl">View Employee</DialogTitle>
              </DialogHeader>
              {selectedEmployee && (
                <div className="grid gap-6 py-4">
                  {/* Avatar and Name Section */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold">
                        {selectedEmployee.firstName} {selectedEmployee.lastName}
                      </h3>
                      <Badge variant="secondary" className="mt-1">
                        {selectedEmployee.designation}
                      </Badge>
                    </div>
                  </div>
                  <Separator />
                  {/* Contact Information */}
                  <div className="grid grid-cols-2 gap-10">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{selectedEmployee.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">{selectedEmployee.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Department</p>
                        <p className="text-sm text-muted-foreground">{selectedEmployee.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Designation</p>
                        <p className="text-sm text-muted-foreground">{selectedEmployee.designation}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Joining Date</p>
                        <p className="text-sm text-muted-foreground">{selectedEmployee.joiningDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button onClick={() => setShowViewModal(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* Edit Dialog (Modal) */}
          <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
              <DialogContent>
                <DialogHeader>
                  Edit Employee
                </DialogHeader>
              </DialogContent>
          </Dialog>
        </Table>
      </div>
    </div>
  )
}

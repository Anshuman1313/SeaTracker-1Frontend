import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

type Leave_Employee = {
    leave_id: number,
    from_date: string,
    to_date: string,
    status: string,
    leave_type: string,
    reason: string,
}
type Employee = {
     avatar?: string,
    employeeName: string,
    employeeId: string,
    department: string

}
type Card_Props = {
    leave_employee: Leave_Employee,
    employee: Employee;
   
}

const Leave_Card: React.FC<Card_Props> = ({leave_employee,employee}) => {
  return (
    <div>
      <Card className="mb-4 gap-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={employee.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {employee.employeeName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{employee.employeeName}</h3>
              <p className="text-sm text-muted-foreground">
                {employee.employeeId} • {employee.department}
              </p>
            </div>
          </div>
          <Badge
            variant={
              leave_employee.status === "approved" ? "default" : leave_employee.status === "rejected" ? "destructive" : "secondary"
            }
            className={
              leave_employee.status === "approved"
                ? "bg-green-100 text-green-800"
                : leave_employee.status === "rejected"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
            }
          >
            {leave_employee.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
            {leave_employee.status === "approved" && <CheckCircle className="h-3 w-3 mr-1" />}
            {leave_employee.status === "rejected" && <XCircle className="h-3 w-3 mr-1" />}
            {leave_employee.status.charAt(0).toUpperCase() + leave_employee.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Leave Type</p>
            <p className="font-medium">{leave_employee.leave_type}</p>
          </div>
          {/* <div>
            <p className="text-muted-foreground">Duration</p>
            <p className="font-medium">{leave_employee.days} days</p>
          </div> */}
          <div>
            <p className="text-muted-foreground">Start Date</p>
            <p className="font-medium">{new Date(leave_employee.from_date).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">End Date</p>
            <p className="font-medium">{new Date(leave_employee.to_date).toLocaleDateString()}</p>
          </div>
        </div>

        <div>
          <p className="text-muted-foreground text-sm mb-1">Reason</p>
          <p className="text-sm bg-gray-50 p-3 rounded-lg">{leave_employee.reason}</p>
        </div>

        {/* {leave_employee.status === "rejected" && leave_employee.rejectionReason && (
          <div>
            <p className="text-muted-foreground text-sm mb-1">Rejection Reason</p>
            <p className="text-sm bg-red-50 text-red-800 p-3 rounded-lg">{leave_employee.rejectionReason}</p>
          </div>
        )} */}

        <div className="flex items-center justify-between pt-2">
          {/* <p className="text-xs text-muted-foreground">
            Applied on {new Date(leave_employee.appliedDate).toLocaleDateString()}
            {leave_employee.approvedDate && ` • Approved on ${new Date(leave_employee.approvedDate).toLocaleDateString()}`}
            {leave_employee.rejectedDate && ` • Rejected on ${new Date(leave_employee.rejectedDate).toLocaleDateString()}`}
          </p> */}

          {/* {leave_employee.status === "pending" && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleReject(leave_employee.id)}
                className="text-red-600 hover:text-red-700"
              >
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </Button>
              <Button size="sm" onClick={() => handleApprove(leave_employee.id)} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-1" />
                Approve
              </Button>
            </div>
          )} */}
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

export default Leave_Card

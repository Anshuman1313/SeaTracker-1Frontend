import React from 'react'
import { useState } from "react"
import { Clock, FileText, CheckCircle, XCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const AttendenceLeave = () => {
  const [attendanceStatus, setAttendanceStatus] = useState<"present" | "absent" | null>(null)
  const [loginTime, setLoginTime] = useState("10:00")
  const [logoutTime, setLogoutTime] = useState("18:00")
  const [leaveType, setLeaveType] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [reason, setReason] = useState("")
  const [leaveSubmitted, setLeaveSubmitted] = useState(false)
  const handleMarkAttendance = (status: "present" | "absent") => {
    setAttendanceStatus(status)
  }

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (leaveType && startDate && endDate && reason) {
      setLeaveSubmitted(true)
      // Reset form after 3 seconds
      setTimeout(() => {
        setLeaveSubmitted(false)
        setLeaveType("")
        setStartDate("")
        setEndDate("")
        setReason("")
      }, 3000)
    }
  }

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  return (
    <div className="w-full overflow-y-scroll h-[calc(100vh-49px) ] overflow-y-scroll">
      <div className='mx-[4vw]  h-[calc(100vh-49px)]'>
        <main className="flex-1 p-8  ">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance & Leave Management</h1>
              <p className="text-gray-600">{currentDate}</p>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Attendance Section */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-xl">
                    <Clock className="w-6 h-6 text-blue-600" />
                    <span>Mark Attendance</span>
                  </CardTitle>
                  <CardDescription>Track your daily attendance and working hours</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Attendance Buttons */}
                  <div className="flex space-x-4">
                    <Button
                      onClick={() => handleMarkAttendance("present")}
                      className={`flex-1 h-12 ${attendanceStatus === "present"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-green-500 hover:bg-green-600"
                        }`}
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Mark Present
                    </Button>
                    <Button
                      onClick={() => handleMarkAttendance("absent")}
                      variant="destructive"
                      className={`flex-1 h-12 ${attendanceStatus === "absent" ? "bg-red-600 hover:bg-red-700" : ""}`}
                    >
                      <XCircle className="w-5 h-5 mr-2" />
                      Mark Absent
                    </Button>
                  </div>

                  {/* Time Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-time">Login Time</Label>
                      <Input
                        id="login-time"
                        type="time"
                        value={loginTime}
                        onChange={(e) => setLoginTime(e.target.value)}
                        className="bg-gray-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="logout-time">Logout Time</Label>
                      <Input
                        id="logout-time"
                        type="time"
                        value={logoutTime}
                        onChange={(e) => setLogoutTime(e.target.value)}
                        className="bg-gray-50"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Status Display */}
                  <div className="text-center py-4">
                    {attendanceStatus === "present" && (
                      <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm">
                        ✅ You are marked Present for today
                      </Badge>
                    )}
                    {attendanceStatus === "absent" && (
                      <Badge className="bg-red-100 text-red-800 px-4 py-2 text-sm">
                        ❌ You are marked Absent for today
                      </Badge>
                    )}
                    {!attendanceStatus && (
                      <Badge variant="outline" className="px-4 py-2 text-sm">
                        Please mark your attendance for today
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Leave Section */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-xl">
                    <FileText className="w-6 h-6 text-blue-600" />
                    <span>Apply for Leave</span>
                  </CardTitle>
                  <CardDescription>Submit your leave application with required details</CardDescription>
                </CardHeader>
                <CardContent>
                  {leaveSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-green-800 mb-2">Leave Applied Successfully!</h3>
                      <p className="text-green-600">Your leave application has been submitted for approval.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleLeaveSubmit} className="space-y-6">
                      {/* Leave Type */}
                      <div className="space-y-2">
                        <Label htmlFor="leave-type">Leave Type</Label>
                        <Select value={leaveType} onValueChange={setLeaveType}>
                          <SelectTrigger className="bg-gray-50">
                            <SelectValue placeholder="Select leave type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="casual">Casual Leave</SelectItem>
                            <SelectItem value="sick">Sick Leave</SelectItem>
                            <SelectItem value="earned">Earned Leave</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Date Range */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="start-date">Start Date</Label>
                          <Input
                            id="start-date"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="bg-gray-50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-date">End Date</Label>
                          <Input
                            id="end-date"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="bg-gray-50"
                          />
                        </div>
                      </div>

                      {/* Reason */}
                      <div className="space-y-2">
                        <Label htmlFor="reason">Reason</Label>
                        <Textarea
                          id="reason"
                          placeholder="Please provide a reason for your leave..."
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          className="bg-gray-50 min-h-[100px]"
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                        disabled={!leaveType || !startDate || !endDate || !reason}
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Apply Leave
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-0">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-blue-600">22</div>
                  <div className="text-sm text-gray-600">Days Present</div>
                </CardContent>
              </Card>
              <Card className="bg-white/60 backdrop-blur-sm border-0">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <div className="text-sm text-gray-600">Pending Leaves</div>
                </CardContent>
              </Card>
              <Card className="bg-white/60 backdrop-blur-sm border-0">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-green-600">15</div>
                  <div className="text-sm text-gray-600">Available Leaves</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AttendenceLeave

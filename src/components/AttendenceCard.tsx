import React, { useCallback, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { CheckCircle, Clock } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useAttendanceStore } from '@/store/useAttendanceStore'

type AttendanceProps = {
  employeeId: string
}



const AttendenceCard: React.FC<AttendanceProps> = ({ employeeId }) => {
  const { markAttendance, attendance, fetchAttendance, markCheckout } = useAttendanceStore();
    // ✅ Generate today's date for API fetch (fixed for daily record)
  const todayDate = new Date().toISOString().split('T')[0];

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };
  
  // Derive states from Zustand store
  const checkIn = attendance?.checkInTime ? true : false;
  const checkOut = attendance?.checkOutTime ? true : false;
  const attendanceId = attendance?.attendanceId;

  console.log(getCurrentTime)
  const markattendance = useCallback(async () => {
    await markAttendance(employeeId, getCurrentTime());
  }, [employeeId, getCurrentTime()]);

  const handleMarkCheckout = useCallback(async () => {
    if (attendanceId) {
      await markCheckout(attendanceId, getCurrentTime());
    }
  }, [attendanceId, getCurrentTime()]);

  useEffect(() => {
    // Fetch attendance data on component mount
    fetchAttendance(employeeId, todayDate);
  }, [employeeId, todayDate, fetchAttendance]);

  console.log(checkIn, "checkin")
  console.log(checkOut, "checkOut")

  return (
    <div>
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-xl">
            <Clock className="w-6 h-6 text-blue-600" />
            <span>Mark Attendance</span>
          </CardTitle>
          <CardDescription>Track your daily attendance and working hours</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex space-x-4">
            {(checkIn === false && checkOut === false) && (
              <div>
                <Button
                  className={`flex-1 h-12`}
                  onClick={markattendance}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Clock In
                </Button>
              </div>)
            }
            {(checkIn === true && checkOut === false) && (
              <div>
                <Button
                  className={`flex-1 h-12`}
                  onClick={handleMarkCheckout}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Clock out
                </Button>
              </div>)
            }
            {(checkOut === true && checkIn === true) && (
              <div>
                <Badge variant={'secondary'} className='bg-green-700 text-[15px] text-white'>
                  Attendance is marked for today
                </Badge>
              </div>)
            }
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AttendenceCard

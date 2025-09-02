import api from '@/api/axiosInstance';
import { create } from 'zustand';

interface AttendanceData {
  attendanceId: number;
  employeeId: string | any;
  attendanceDate: string;
  checkInTime: string;
  checkOutTime: string | null;
  status: string;
  remarks: string | null;
}

interface AttendanceState {
  attendance: AttendanceData | null;
  isLoading: boolean;
  fetchAttendance: (employeeId: string | any, date: string) => Promise<void>;
  markAttendance: (employeeId: string, currentTime: string) => Promise<void>;
  markCheckout: (attendanceId: number, currentTime: string) => Promise<void>;
}

export const useAttendanceStore = create<AttendanceState>((set, get) => ({
  attendance: null,
  isLoading: false,
  
  fetchAttendance: async (employeeId: string, date: string) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`Attendence/${employeeId}?date=${date}`);
      if (response.data.success) {
        set({ attendance: response.data.data, isLoading: false });
      }
    } catch (error) {
      console.log(error);
      set({ attendance: null, isLoading: false });
    }
  },

  markAttendance: async (employeeId: string, currentTime: string) => {
    try {
      const response = await api.post(`Attendence/mark`, { 
        employeeId: employeeId, 
        checkInTime: currentTime 
      });
      
      if (response.data.success) {
        console.log(response.data.data);
        
        // After successful POST, fetch updated attendance data
        const today = new Date().toISOString().split('T')[0];
        await get().fetchAttendance(employeeId, today);
      }
      
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  },

  markCheckout: async (attendanceId: number, currentTime: string) => {
    try {
      await api.patch(`Attendence/${attendanceId}`, {
        checkOutTime: currentTime, 
        status: "Present"
      });
      
      // After successful checkout, fetch updated attendance data
      const { attendance } = get();
      if (attendance) {
        const today = new Date().toISOString().split('T')[0];
        await get().fetchAttendance(attendance.employeeId, today);
      }
    } catch (error) {
      console.log(error);
    }
  },
}));

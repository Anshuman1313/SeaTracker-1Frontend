import React from 'react'
import { Users, UserPlus, Clock, CircleUser } from "lucide-react";
import { NavLink } from 'react-router';
import { useAuth } from '@/auth/AuthContext';
const Menubar = () => {
  type MenuItems = {
    title: string,
    icon: React.ReactNode,
    path: string,
    roles?: string[]; //allowed roles like ['Admin'], ['Employee'], or undefined (visible to all)
  }

  const { userRole } = useAuth();

  const menuitems: MenuItems[] = [
    {
      title: "All Employees",
      icon: <Users />,
      path: "/allemployee",
      roles: ['Admin']
    },
    {
      title: "Add Employee",
      icon: <UserPlus />,
      path: "/addemployee",
      roles: ['Admin']
    },
    {
      title: "Attendance",
      icon: <Clock />,
      path: "/attendance",
      roles: ['Admin', 'Employee'] // both can access
    },
    {
      title: "Profile",
      icon: <CircleUser />,
      path: "/profile",
      roles: ['Admin', 'Employee']
    }
  ];

  return (

    <div className='flex flex-col w-[4%] hover:w-[18%] sticky top-0 group hover:transition-all transition-all bg-blue-500 '>
      {menuitems
        .filter(item => !item.roles || item.roles.includes(userRole || '')) // show if no role restriction or user has the role
        .map((i, index) => (
          <NavLink
            key={index}
            to={i.path}
            className={({ isActive }) => (isActive ? 'bg-blue-600' : 'bg-blue-500')}
          >
            <div className="relative flex items-center p-2 h-[10vh] hover:bg-sky-500 rounded-md cursor-pointer space-x-2">
              <div className="text-white ml-1">{i.icon}</div>
              <div
                className={` ${i.title.length > 25 ? 'top-1/2' : 'mt-4 whitespace-nowrap '} -translate-y-1/2 scale-95 hidden group-hover:inline transition-all duration-300 ease-in-out justify-center items-center text-white px-2`}
              >
                <div className='transition-all duration-300 ease-in-out'>{i.title}</div>
              </div>
            </div>
            
          </NavLink>
        ))}
    </div>
  )
}

export default Menubar

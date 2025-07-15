import React from 'react'
import Summary_Card from './cards/Summary_Card'
import { Users, UserCheck, UserX, Clock } from "lucide-react";
import Tabs_Toggle from './Tabs_Toggle'

type Summary_Card_Items = {
  title?: string,
  icon?: React.ElementType,
  color?: string,
  content_stats: string | number,
  content_sub_stats: string
}
type Stats = {
  totalEmployees: number,
  present: number,
  onLeave: number,
  pendingRequests: number
}

const stats: Stats = {
  totalEmployees: 100,
  present: 80,
  onLeave: 9,
  pendingRequests: 11
}


const summaryCards: Summary_Card_Items[] = [
  {
    title: "Total Employees",
    icon: Users,
    content_stats: stats.totalEmployees,
    content_sub_stats: "+2 from last month",
    color: "foreground", // neutral text (no specific color)
  },
  {
    title: "Present Today",
    icon: UserCheck,
    content_stats: stats.present,
    content_sub_stats: "91% attendance rate",
    color: "green-600",
  },
  {
    title: "On Leave",
    icon: UserX,
    content_stats: stats.onLeave,
    content_sub_stats: "9% of workforce",
    color: "orange-600",
  },
  {
    title: "Pending Requests",
    icon: Clock,
    content_stats: stats.pendingRequests,
    content_sub_stats: "Requires attention",
    color: "blue-600",
  },
];

// const summary_card_items

const Dashboard = () => {
  return (
    <div className='overflow-y-scroll w-full'>
      <div className='mx-4 mt-2 space-y-5'>

        <div className='grid grid-cols-4 gap-4 '>

          {summaryCards.map((card, idx) => (
            <Summary_Card
              key={idx}
              title={card.title}
              icon={card.icon}
              color={card.color}
              content_stats={card.content_stats}
              content_sub_stats={card.content_sub_stats}
            />
          ))}
        </div>



        <Tabs_Toggle />

      </div>

    </div>
  )
}

export default Dashboard

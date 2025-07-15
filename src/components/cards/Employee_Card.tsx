import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '../ui/button'

type Employee = {
    id?: string,
    name: string,
    position?: string,
    department?: string,
    status?: string,
    avatar?: string,
    email?: string,
    phone?: number,
    location?: string,
}
type CardProps = {
    employee: Employee,
    icon?: React.ElementType,
}

const Employee_Card: React.FC<CardProps> = ({ employee }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow gap-2" >
                <CardHeader >
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                    {employee.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold text-sm">{employee.name}</h3>
                                <p className="text-xs text-muted-foreground">{employee.position}</p>
                            </div>
                        </div>
                        <Badge
                            variant={employee.status === "present" ? "default" : "secondary"}
                            className={
                                employee.status === "present" ? "bg-green-100 text-green-800 text-sm" : "bg-orange-100 text-sm  text-orange-800"
                            }
                        >

                            {employee.status === "present" ? "Present" : "On Leave"}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                            {employee.department}
                        </Badge>
                    </div>

                    {/* {employee.status === "on-leave" && (
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-orange-800">{employee.leaveType}</p>
                  <p className="text-xs text-orange-600">Returns: {employee.leaveEnd}</p>
                </div>
              )} */}

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            <span className="truncate">{employee.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            <span>{employee.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{employee.location}</span>
                        </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1 text-xs bg-transparent">
                            View Profile
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 text-xs bg-transparent">
                            Contact
                        </Button>
                    </div>
                </CardContent>
            </Card>
            
        </div>

    )
}

export default Employee_Card

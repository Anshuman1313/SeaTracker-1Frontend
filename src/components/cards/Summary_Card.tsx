import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface CardProps  {
    title?: string,
    icon?: React.ElementType,
    content_stats?: string | number,
    content_sub_stats?: string | number,
    color?: string
}
const Summary_Card: React.FC<CardProps> = ({title,icon:Icon,content_stats,content_sub_stats,color}) => {
    return (
        <div>
            
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{title} </CardTitle>
                  {Icon && <Icon className={`h-4 w-4  text-${color}`} />}
                    
                </CardHeader>
                <CardContent>
                    <div className={`text-2xl font-bold text-${color}`}>{content_stats}</div>
                    <p className="text-xs text-muted-foreground">{content_sub_stats}</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default Summary_Card

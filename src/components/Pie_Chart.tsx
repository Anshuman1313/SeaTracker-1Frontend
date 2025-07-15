import { Pie, PieChart, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
// type LeaveTypeData = {
//     name: string,
//     value: number,
//     color: string
// }
const getIntroOfPage = (label: any) => {
    if (label === 'Annual Leave') {
        return "Annual Leave is about Total Leave";
    }
    if (label === 'Sick Leave') {
        return "Page B is about women's dress";
    }
    if (label === 'Personal Leave') {
        return "Page C is about women's bag";
    }
    if (label === 'Maternity/Paternity') {
        return 'Page D is about household goods';
    }
    if (label === 'Emergency Leave') {
        return 'Page E is about food';
    }
    return '';
};

const CustomTooltip = ({ active, payload }: any) => {
    const isVisible = active && payload && payload.length;
    return (
        <div className="custom-tooltip bg-accent p-3 rounded-2xl" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
            {isVisible && (
                <>
                    <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
                    <p className="intro">{getIntroOfPage(payload[0].name)}</p>
                    {/* <p className="desc">Made by Anshuman Rana .</p> */}
                </>
            )}
        </div>
    );
};

const leaveTypeData = [
    { name: "Annual Leave", value: 45, fill: "red" },
    { name: "Sick Leave", value: 28, fill: "#ef4444" },
    { name: "Personal Leave", value: 18, fill: "#f59e0b" },
    { name: "Maternity/Paternity", value: 12, fill: "#10b981" },
    { name: "Emergency Leave", value: 8, fill: "#8b5cf6" },
];
const Pie_Chart = () => {
    return (
        <div>
            <Card>
                <CardHeader>

                <CardTitle className='text-xl'>Leave Type Distribution</CardTitle>
                <CardDescription>Breakdown of leave requests by type</CardDescription>
                </CardHeader>

                <CardContent className='flex justify-center'>
                    
                    <PieChart width={200} height={200}>
                        <Pie data={leaveTypeData} dataKey="value" cx="50%" cy="50%" outerRadius={90} paddingAngle={5} />
                        <Tooltip content={CustomTooltip} />
                    </PieChart>

                </CardContent>
            </Card>
            {/* //what i need is with pie chart */}

        </div>
    )
}

export default Pie_Chart

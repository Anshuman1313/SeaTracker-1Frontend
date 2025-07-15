import { TextAnimate } from "./magicui/text-animate"
import { VideoText } from "./magicui/video-text"
import axios from 'axios'
import { API_URL } from "@/constant"
import { axios_service_get } from "@/services/axios-services"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
interface Jurisdiction {
  id: number;
  name: string;
}

interface Report {
  id: number;
  name: string;
}


function MainHome() {
 const [jurisdictions] = useState<Jurisdiction[]>([
    { id: 1, name: 'Punjab' },
    { id: 2, name: 'Haryana' },
  ]);

  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('');
  const [reports, setReports] = useState<Report[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const fakeFetchReports = (jurisdictionId: string): Promise<Report[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockReports: Record<string, Report[]> = {
        '1': [
          { id: 101, name: 'Punjab Report A' },
          { id: 102, name: 'Punjab Report B' },
        ],
        '2': [
          { id: 201, name: 'Haryana Report A' },
          { id: 202, name: 'Haryana Report B' },
        ],
      };

      resolve(mockReports[jurisdictionId] || []);
    }, 2000); // simulate 2 second delay
  });
};


  const handleJurisdictionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
  const value = e.target.value;
  setSelectedJurisdiction(value);
  setReports([]);
  // setIsLoading(true);

  try {
    const res = await fakeFetchReports(value);
    setReports(res);
  } catch (error) {
    console.error('Error fetching fake reports:', error);
  } finally {
    // setIsLoading(false);
  }
};

  // axios.get( 'https://localhost:44314/api/Employees')
  // .then((response)=>{
  //   console.log(response.data,"this for my backend");
  // })
  // .catch((error)=>{
  //   console.log("My backend error",error)
  // })
  axios_service_get("api/Employees");

axios.post(`${API_URL}/Auth/login`, {
  "username": "admin",
  "password": "admin@123",
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error posting data:', error);
  });
  
  axios.post('https://localhost:44358/api/Auth/login',{
     "userName": "admin",
  "password": "admin@123"
  })
  .then((response)=>{
    console.log(response)
  })
  .catch((error)=>{
    console.log(error)
  })

  
  return (
   <div className="p-8 bg-gray-50/30 h-[91vh]  overflow-y-scroll flex flex-col">
      <div className="max-w-4xl mx-auto space-y-8 text-5xl ">
          <TextAnimate animation="blurInUp" by="character" once>
      Welcome To...
    </TextAnimate>
       <div>
      <h1>Home Page</h1>

      <label htmlFor="jurisdiction">Jurisdiction</label>
      <select
        id="jurisdiction"
        data-cy="jurisdiction-dropdown"
        value={selectedJurisdiction}
        onChange={handleJurisdictionChange}
      >
        <option value="">Select Jurisdiction</option>
        {jurisdictions.map((j) => (
          <option key={j.id} value={j.id.toString()}>
            {j.name}
          </option>
        ))}
      </select>

      <label htmlFor="report">Reports</label>
      <select id="report" data-cy="report-dropdown">
        <option value="">Select Report</option>
        {reports.map((r) => (
          <option key={r.id} value={r.id.toString()}>
            {r.name}
          </option>
        ))}
      </select>
    </div>
     <Tabs defaultValue="password" className="w-[400px] ">
                <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">Make changes to your account here.</TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
    

      
    </div>
    <div className="relative h-[500px] w-full overflow-hidden">
  <VideoText src="https://cdn.magicui.design/ocean-small.webm" fontSize={'110'}>SEA TECHNOLOGIES</VideoText>
</div>
    </div>
  )
}

export default MainHome

import { Button } from "./ui/button"

const Navbar = () => {
  
  type UserCredential = {
    name: string
  }
 const Username : UserCredential = {
  name: "Anshuman"
 }


  return (
    <div className="w-[100%] h-[49px] bg-white border-b border-gray-200 px-4 flex justify-between items-center  ">
      <div>

            <span className="text-blue-500 text-2xl font-medium ">SEA</span>
            <span className="text-black text-2xl font-medium ">TECHNOLOGIES</span>
        
      </div>
      <div className="flex gap-3 justify-center items-center">
        <div className="profilepic bg-blue-400 font-semibold text-white rounded-full px-[9px] py-[2px] mt-[1px]">{Username.name?.charAt(0).toUpperCase()}</div>
        <div className="proilename cursor-pointer">{Username.name}</div>
   
        
        <Button className="bg-primary-foreground text-black hover:bg-accent border-[1px] text-sm ">Logout</Button>

      
      </div>
      
    </div>
  )
}

export default Navbar

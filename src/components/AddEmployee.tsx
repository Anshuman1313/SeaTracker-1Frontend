import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Upload, User, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useState } from "react"
import api from "@/api/axiosInstance"



const formSchema = z.object({
 

  firstName: z.string().min(3, "First name must be at least 2 characters"),
  lastName: z.string().min(3, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  department: z.string().min(1, "Please select a department"),
  designation: z.string().min(2, "Designation must be at least 2 characters"),
  externalId: z.string().min(1, "External ID is required"),

})
const departments = [
  "Human Resources",
  "Engineering",
  "Marketing",
  "Sales",
  "Finance",
  "Operations",
  "Customer Support",
  "Legal",
  "Product Management",
  "Design",
]

const AddEmployee = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
  //defining my form 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
   
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      externalId: "",
    }
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{

      setIsSubmitting(true);
      console.log(values, "submitted")
          const res = await api.post('/Employees',values);
          
      console.log(res.data)
      // form.reset()
    }
    catch(error){
      console.log(error,"error hai bhai")
    }
    finally{
      setIsSubmitting(false)
    }
  }

  

  return (
    <div className="w-full  h-[calc(100vh-49px)] pt-8">
      <div className='mx-[4vw]'>

        <Card>
          <CardHeader>

            <CardTitle>Add New Employee</CardTitle>
            <CardDescription>Fill in the employee details below to add them to the system.</CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

           

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

               {/* Work Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Designation *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter job title/designation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                   />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}  >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select department"  />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

               
               
              </div>
                {/* External ID */}
                <FormField
                  control={form.control}
                  name="externalId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>External ID *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter external ID or employee number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.reset()

                    }}
                  >
                    Reset Form
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Adding Employee..." : "Add Employee"}
                  </Button>
                </div>
              </form>

            </Form>

          </CardContent>
        </Card>
      </div>
    </div>

  )
}

export default AddEmployee

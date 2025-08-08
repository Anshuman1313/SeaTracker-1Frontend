import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar"
import { Upload, User, X } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { useState } from "react"
import api from "@/api/axiosInstance"
import { toast } from "sonner"

const formSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 2 characters"),
  lastName: z.string().min(3, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits")
  .max(10, "Phone number must be exactly 10 digits"),
  department: z.string().min(1, "Please select a department"),
  designation: z.string().min(1, "Please select a designation"),
  externalId: z.string().min(1, "External ID is required"),
  imageBase64: z.string(),
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
const designations = [
  "Software Engineer",
  "Software Developer Intern",
  "Product Manager",
  "Sales Executive",
  "Marketing Specialist",
  "Finance Analyst",
  "Legal Advisor",
  "UI/UX Designer",
  "Business Development Executive (BDE)",
  "SQL Developer Intern",
  "Engineer",
];

const AddEmployee = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

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
      imageBase64: "",
    },
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast("File too large", {
        description: "Please select an image smaller than 5MB",
      })
      return
    }

    if (!file.type.startsWith("image/")) {
      toast("Invalid file type", {
        description: "Please select a valid image file",
      })
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setImagePreview(base64String)
      form.setValue("imageBase64", base64String)
    }

    reader.readAsDataURL(file)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true)


      if (!values.imageBase64) {
        toast("No image uploaded")
      }

      console.log("Submitted values:", values)

      const res = await api.post('/Employees', values)
      console.log(res.data)
      form.reset()
      setImagePreview(null)
      toast.success("Success!", {
        description: "Employee added  successfuly.",
        style: {
          backgroundColor: "#dcfce7", // light green
          color: "#166534", // dark green text
        }
      })

    } catch (error) {
      toast.error("Something went wrong", {
        description: `${error}`
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    form.setValue("imageBase64", "")
  }

  return (
    <div className="w-full h-[calc(100vh-49px)] pt-8 overflow-y-scroll">
      <div className="mx-[4vw]">
        <Card>
          <CardHeader>
            <CardTitle>Add New Employee</CardTitle>
            <CardDescription>
              Fill in the employee details below to add them to the system.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Profile pic additon */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={imagePreview || ""} alt="Employee photo" />
                      <AvatarFallback className="text-lg">
                        <User className="w-8 h-8" />
                      </AvatarFallback>
                    </Avatar>
                    {imagePreview && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                        onClick={removeImage}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="flex items-center space-x-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                        <Upload className="w-4 h-4" />
                        <span className="text-sm">Upload Photo</span>
                      </div>
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <p className="text-xs text-muted-foreground">
                      Max file size: 5MB. Supported formats: JPG, PNG, GIF
                    </p>
                  </div>
                </div>

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
                          <Input type="tel" maxLength={10} placeholder="Enter phone number" {...field} />
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
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
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
                    <FormField
                    control={form.control}
                    name="designation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Designation *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select designation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {designations.map((desig) => (
                              <SelectItem key={desig} value={desig}>
                                {desig}
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
                      setImagePreview(null)
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

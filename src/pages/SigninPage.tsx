import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useState } from "react"
import { Eye, EyeOff } from 'lucide-react';

interface InputFormEmail {
  email: string,
  password: string
}

export default function SignInPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<InputFormEmail>()
  const onsubmit: SubmitHandler<InputFormEmail> = (data) => console.log(data)
  const [pwdFlag, setPwdFlag] = useState(false)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center h-[100px]">
            <h1 className="text-black font-semibold text-[80px] font-serif">S</h1>
            <h1 className="text-blue-500 font-semibold text-[80px] font-serif">T</h1>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-slate-900">Welcome Back</CardTitle>
            <CardDescription className="text-slate-600">Sign in to your Sea Technologies account</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                maxLength={50}
                {...register("email")}
                required
              />
              {errors?.email?.type === "required" && <p className="bg-red-500">This field is required</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">
                Password
              </Label>
              <div className="flex justify-around gap-2 ">


                <Input
                  id="password"
                  type={pwdFlag ? "text" : "password"}
                  placeholder="Enter your password"
                  className="border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                  maxLength={20}
                  {...register("password", {
                    required: true, minLength: 5, pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: "Password must include uppercase, lowercase, number, and special character"
                    },



                  })}


                  // (?=.*[a-z]) – at least one lowercase letter

                  // (?=.*[A-Z]) – at least one uppercase letter

                  // (?=.*\d) – at least one digit

                  // (?=.*[@$!%*?&]) – at least one special character

                  // {8,} – minimum 8 characters in total
                  required
                />
                <div>
                  {pwdFlag ? <Eye size={20} strokeWidth={1.5} className="absolute  my-2 ml-[-35px]"  onClick={(() => setPwdFlag(!pwdFlag))} /> :

                    <EyeOff size={20} strokeWidth={1.5} className="absolute my-2 ml-[-35px] "  onClick={(() => setPwdFlag(!pwdFlag))} />}

                </div>
              </div>
              {errors?.password && (
                <p className="text-red-400 text-sm">{errors?.password?.message}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  className="border-slate-300 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                />
                <Label htmlFor="remember" className="text-sm text-slate-600">
                  Remember me
                </Label>
              </div>
              <a href="/forgot-password" className="text-sm text-cyan-600 hover:text-cyan-700 hover:underline">
                Forgot password?
              </a>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white font-medium py-2.5"
            >
              Sign In
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-300" />
            </div>
            {/* <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Or continue with</span>
            </div> */}
          </div>

          {/* <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="border-slate-300 hover:bg-slate-50">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="border-slate-300 hover:bg-slate-50">
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
              </svg>
              Facebook
            </Button>
          </div> */}

          <div className="text-center text-sm text-slate-600">
            {"Don't have an account? "}
            {/* <a href="/signup" className="text-cyan-600 hover:text-cyan-700 hover:underline font-medium">
              Sign up here
            </a> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

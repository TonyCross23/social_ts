import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios";
import { useNavigate } from "react-router";

const LoginSchema = z.object({
    email: z.string().min(1,"Email is required").email("Invalid email"),
    password: z.string().min(1, "Password required"),
})

  type FormData = z.infer<typeof LoginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: {errors}, reset } = useForm<FormData>({
    resolver: zodResolver(LoginSchema)
  })
const onSubmit = async (data: FormData) => {
    axios.defaults.withCredentials = true
    try {
        const response = await axios.post("http://localhost:5000/api/v1/auth/login", {
            email: data.email,
            password: data.password,
        })
         console.log("Registration success:", response.data)
         alert("Registration successful!")
         reset()
         navigate('/')
    } catch (error: any) {
        console.error("Registration error:", error.response?.data || error.message)
      alert(error.response?.data?.message || "Something went wrong")
    }
}

  return (
    <>
      <form className="max-w-sm mx-auto mt-48" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="text"  {...register("email")} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
             {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" {...register("password")} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
         {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
    </>
  )
}

export default Login

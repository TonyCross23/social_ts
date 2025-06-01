import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios";
import { useNavigate } from "react-router";
import { registerSchema, type RegisterData } from "../../schema/formSchema";


const Registre = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: {errors}, reset } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema)
  })
const onSubmit = async (data: RegisterData) => {
    try {
        const response = await axios.post("http://localhost:5000/api/v1/auth/register", {
            name: data.name,
            email: data.email,
            password: data.password,
            passwordConfirmation: data.passwordConfirmation
        })
         console.log("Registration success:", response.data)
         alert("Registration successful!")
         reset()
         navigate('/login')
    } catch (error: any) {
        console.error("Registration error:", error.response?.data || error.message)
      alert(error.response?.data?.message || "Something went wrong")
    }
}

  return (
    <>
      <form className="max-w-sm mx-auto mt-48" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
            <input type="text"  {...register("name")} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john doe" />
             {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
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
        <div className="mb-5">
            <label htmlFor="passwordConfirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
            <input type="password" {...register("passwordConfirmation")} id="passwordConfirmation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
         {errors.passwordConfirmation && <p className="text-red-500">{errors.passwordConfirmation.message}</p>}
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
    </>
  )
}

export default Registre

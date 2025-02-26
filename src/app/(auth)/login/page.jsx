'use client'
import React, { useEffect, useState } from 'react'
import Button from '@/components/Button'
import Floating_input, { Floating_Form_input, handleFormInputChange } from '@/components/Floating_Form_input'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/navigation'
import { Icon } from "@iconify/react"
import { z } from "zod"
import { getPageTitle } from '@/app/commonVariable'
import DisplayErrors from '@/components/DisplayErrors'
import { Floating_password, Floating_select} from '@/components/Floating_Form_input'


const schema = z.object({
/* id: z.union([
        z.string().nonempty({ message: "Select User." }),
        z.number().min(1, { message: "Select User." }), // Ensures a valid number
    ]),*/
   email: z.string().email().min(3,{ message: "enter your email" } ),
    password: z.string().min(3, { message: "Password must be at least 3 characters." }),
})

const Login = () => {
    const router = useRouter()
    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/organization/my-organizations',
    })

    const [users, setUsers] = useState([])
    const [user_id, setUserId] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState(null)
    const [passwordType, setPasswordType] = useState('password')
    const [isDisabled, setIsDisabled] = useState(true)

   /* const fetchUsers = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-users-list`)
            const data = await response.json()
            setUsers(
                data.map((user) => ({
                    value: user.id,
                    label: user.first_name,
                }))
            )
        } catch (err) {
            console.error("Error fetching users:", err)
        }
    }*/

   /* useEffect(() => {
        fetchUsers()
    }, [])
*/
    const togglePasswordType = () => {
        setPasswordType((prevType) => (prevType === "password" ? "text" : "password"))
    }

    const validateAndSubmit = async (event) => {
        event.preventDefault()

        // Validate form inputs with Zod
        try {
            schema.parse({ email, password })
            setErrors({}) // Clear errors if validation passes

            // Submit form data
            login({
                //id: user_id,
                email,
                password,
                remember: shouldRemember,
                setErrors,
                setStatus,
            })
        } catch (validationError) {
            const validationErrors = {}
            validationError.errors.forEach((error) => {
                validationErrors[error.path[0]] = error.message
            })
            setErrors(validationErrors)
        }
    }

    return (
        <div className="w-full">
            <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900 text-center">
                ERPSYSTEM - POS 👋
            </div>

            <div className="2xl:text-lg text-base text-default-600 mt-2 leading-6 text-center">
                Enter Credentials.

                <DisplayErrors error={errors.credentials }/>
            </div>

            <form onSubmit={validateAndSubmit} className="2xl:mt-7 mt-8">
                <Floating_Form_input
                    id="email"
                    input_label="Email"
                    error={errors.email}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        handleFormInputChange(e, setErrors, ['email'])
                    }}
                />
                {/*  <div className="relative">

                   <Floating_select
                        input_label="User"
                        placeholder="Select Username"
                        options={users}
                        onChange={(selectedOption) => {
                            setShouldRemember(false)
                            setUserId(selectedOption?.value)
                            setErrors((prevErrors) => ({
                                ...prevErrors,
                                id: '',
                                credentials: '',
                            }))
                            if (selectedOption?.value == 1) {
                                setIsDisabled(false)
                            }
                            else {
                                setIsDisabled(true)
                            }

                        }}
                    />
                    <DisplayErrors error={errors.id }/>
                </div>*/}

                <Floating_password
                    input_label='Password'
                    id = 'password'
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            password: '',
                            credentials: '',
                        }))
                    }}
                />
                <DisplayErrors error={errors.password }/>

                <div className={`${isDisabled ? 'hidden' : 'block'} mt-4`}>
                    <label htmlFor="remember_me" className="inline-flex items-center">
                        <input
                            id="remember_me"
                            type="checkbox"
                            name="remember"
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-200"
                            onChange={(e) =>
                                setShouldRemember(e.target.checked)}
                            checked={shouldRemember}
                            disabled={isDisabled}

                        />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-evenly mt-4">
                    <Button className="w-full">Login</Button>
                </div>
            </form>
        </div>
    )
}

export default Login




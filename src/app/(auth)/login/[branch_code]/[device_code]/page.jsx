'use client'
import React, { useEffect, useState } from 'react'
import Button from '@/components/Button'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/navigation'
import { z } from "zod"
import DisplayErrors from '@/components/DisplayErrors'
import { Floating_password, Floating_select} from '@/components/Floating_Form_input'
import { listLoginNames} from '@/hooks/users'
import LoadingModal from '@/components/LoadingModal'

const schema = z.object({
 id: z.union([
        z.string().nonempty({ message: "Select User." }),
        z.number().min(1, { message: "Select User." }), // Ensures a valid number
    ]),
    password: z.string().min(3, { message: "Password must be at least 3 characters." }),
})

const Login = ({ params }) => {
    const router = useRouter()
    const {branch_code ,device_code } = params;
    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/home',
    })
    const {data:users, loading:loadingUsers } = listLoginNames(branch_code,device_code)
    const [user_id, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState(null)
    const [isDisabled, setIsDisabled] = useState(true)



    const validateAndSubmit = async (event) => {
        event.preventDefault()

        // Validate form inputs with Zod
        try {
            schema.parse({ id: user_id, password })
            setErrors({}) // Clear errors if validation passes

            // Submit form data
            login({
                id: user_id,
                password,
                remember: shouldRemember,
                device_code,
                branch_code,
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
    let loading = loadingUsers;

    if (loading) {
        return (

            <LoadingModal
                /*  onClose={() => onClose(null)}
                  closeModal = { onClose }*/
            />
        )
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

                <div className="relative">
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
                </div>

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




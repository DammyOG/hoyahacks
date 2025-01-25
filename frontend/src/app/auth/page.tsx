'use client'

import LoginForm from '@/components/signinForm'
import SignupForm from '@/components/signupForm'
import React from 'react'

enum FormType {
    LOGIN = 'login',
    SIGNUP = 'signup'
}

const page = () => {
    const [formType, setFormType] = React.useState<FormType>(FormType.LOGIN)

    const handleFormType = (type: FormType) => {
        setFormType(type)
    }


    return (
        <div className='flex justify-center items-center h-screen'>
            {FormType.LOGIN === formType ? (
                <LoginForm handleClick={() => handleFormType(FormType.SIGNUP)} />
            ) : (
                <SignupForm handleClick={() => handleFormType(FormType.LOGIN)} />
            )}
        </div>

    )
}

export default page
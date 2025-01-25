"use client"

import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const signupSchema = z.object({
    firstname: z.string().min(2, { message: 'Firstname must be at least 2 characters' }),
    lastname: z.string().min(2, { message: 'Lastname must be at least 2 characters' }),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'Password confirmation is required' })
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords do not match',
            path: ['confirmPassword'],
        });
    }
})



interface SignupFormProps {
    handleClick: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ handleClick }) => {
    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <Card className='flex flex-col justify-center items-center gap-4 w-1/2 sm:w-2/5 md:w-1/3 lg:w-1/4 xl:w-1/5'>
            <CardHeader>
                <CardTitle className='text-2xl'>Sign-up</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col justify-center">
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-medium'>Firstname</FormLabel>
                                    <FormControl>
                                        <Input placeholder="firstname" {...field} hasError={!!form.formState.errors.firstname} />
                                    </FormControl>
                                    <div className='h-1 italic text-xs md:text-sm'>
                                        {form.formState.errors.firstname && (
                                            <FormMessage>{form.formState.errors.firstname?.message}</FormMessage>
                                        )}
                                    </div>
                                </FormItem>
                            )}
                        /><FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-medium'>Lastname</FormLabel>
                                    <FormControl>
                                        <Input placeholder="lastname" {...field} hasError={!!form.formState.errors.lastname} />
                                    </FormControl>
                                    <div className='h-1 italic text-xs md:text-sm'>
                                        {form.formState.errors.lastname && (
                                            <FormMessage>{form.formState.errors.lastname?.message}</FormMessage>
                                        )}
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-medium'>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="@edu.com" {...field} hasError={!!form.formState.errors.email} />
                                    </FormControl>
                                    <div className="h-1 italic text-xs md:text-sm">
                                        {form.formState.errors.email && (
                                            <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                                        )}
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-medium'>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} hasError={!!form.formState.errors.password} />
                                    </FormControl>
                                    <div className="h-1 italic text-xs md:text-sm">
                                        {form.formState.errors.password && (
                                            <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                                        )}
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-medium'>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} hasError={!!form.formState.errors.confirmPassword} />
                                    </FormControl>
                                    <div className="h-1 italic text-xs md:text-sm">
                                        {form.formState.errors.confirmPassword && (
                                            <FormMessage>{form.formState.errors.confirmPassword?.message}</FormMessage>
                                        )}
                                    </div>
                                </FormItem>
                            )}
                        />
                        <div className='flex justify-between'>
                            <Button type="submit">Submit</Button>
                            <Button variant={'secondary'} onClick={() => handleClick()} >Sign-in</Button>
                        </div>

                    </form>
                </Form>

            </CardContent>
        </Card>
    )
}

export default SignupForm
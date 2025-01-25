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
    firstname: z.string().min(2),
    lastname: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
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
        },
    })

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <Card className='flex flex-col justify-center items-center gap-4'>
            <CardHeader>
                <CardTitle className='text-2xl'>Sign-up</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col justify-center items-center">
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-medium'>Firstname</FormLabel>
                                    <FormControl>
                                        <Input placeholder="firstname" {...field} />
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.firstname?.message}</FormMessage>
                                </FormItem>
                            )}
                        /><FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-medium'>Lastname</FormLabel>
                                    <FormControl>
                                        <Input placeholder="lastname" {...field} />
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.lastname?.message}</FormMessage>
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
                                        <Input placeholder="email" {...field} />
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.email?.message}</FormMessage>
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
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <div className='flex gap-4'>
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
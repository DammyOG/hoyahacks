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

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})


interface LoginFormProps {
    handleClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleClick }) => {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <Card className='flex flex-col justify-center items-center gap-4 w-1/3 md:w-1/5'>
            <CardHeader>
                <CardTitle className='text-2xl'>Sign-in</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex flex-col justify-center">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-medium'>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email" {...field} />
                                    </FormControl>
                                    <div className="h-1">
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
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <div className="h-1">
                                        {form.formState.errors.password && (
                                            <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                                        )}
                                    </div>
                                </FormItem>
                            )}
                        />
                        <div className='flex justify-between'>
                            <Button type="submit">Submit</Button>
                            <Button variant={'secondary'} onClick={() => handleClick()} >Sign-up</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default LoginForm
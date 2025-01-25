"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInParameters, signIn } from "@/lib/Auth";
import { useRouter } from "next/navigation";

const signinSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

interface SigninFormProps {
  handleClick: ((params: SignInParameters) => Promise<any>) | (() => void);
}

const SigninForm: React.FC<SigninFormProps> = ({ handleClick }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    try {
      if (handleClick.length > 0) {
        const result = await handleClick({
          email: data.email,
          password: data.password,
        });
        console.log("Login successful");
        router.push("/uploadtest");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      alert(error.message);
    }
  };

  return (
    <Card className="flex flex-col justify-center items-center gap-4 w-1/2 sm:w-2/5 md:w-1/3 lg:w-1/4 xl:w-1/5">
      <CardHeader>
        <CardTitle className="text-2xl">Sign-in</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex flex-col justify-center"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="@edu.com"
                      {...field}
                      hasError={!!form.formState.errors.email}
                    />
                  </FormControl>
                  <div className="h-1  text-xs md:text-sm">
                    {form.formState.errors.email && (
                      <FormMessage>
                        {form.formState.errors.email?.message}
                      </FormMessage>
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
                  <FormLabel className="font-medium">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      hasError={!!form.formState.errors.password}
                    />
                  </FormControl>
                  <div className="h-1 text-xs md:text-sm">
                    {form.formState.errors.password && (
                      <FormMessage>
                        {form.formState.errors.password?.message}
                      </FormMessage>
                    )}
                  </div>
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SigninForm;

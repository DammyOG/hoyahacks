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
  handleSwitch: () => void;
}

const LoginForm: React.FC<SigninFormProps> = ({
  handleClick,
  handleSwitch,
}) => {
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

        // Navigate first, then reload the current page
        await router.push("/home");
        router.refresh(); // This refreshes the current page without full reload
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      alert(error.message);
    }
  };

  return (
    <div className="relative h-lvh bg-[#001337] flex justify-center items-center">
      {/* <div className="relative h-screen w-full bg-[#000e4f]"> */}
      {/* Pink Circle */}
      <div className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-[#FF0051] to-[#3C003D] top-1/4 left-1/4 mix-blend-screen z-30"></div>
      {/*Orange Circle*/}
      <div className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-[#FF2600] to-[#FFFF00] top-1/3 right-1/4 mix-blend-screen z-20"></div>
      {/*Circle*/}
      <div className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-[#00eaff] to-[#33007A] top-1/2 left-1/3 mix-blend-screen z-10"></div>
      {/* </div> */}

      <Card className="absolute flex flex-col justify-center items-center backdrop-blur-md bg-white/40 stroke-white gap-4 w-2/3 md:w-2/5 lg:w-96 z-40">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">Sign-in</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 flex flex-col justify-center"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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
                    <FormLabel>Password</FormLabel>
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
                <Button variant={"secondary"} onClick={() => handleSwitch()}>
                  Sign-up
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;

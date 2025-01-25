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
import { SignUpParameters } from "@/lib/Auth";
import { useRouter } from "next/navigation";
const signupSchema = z
  .object({
    firstname: z
      .string()
      .min(2, { message: "Firstname must be at least 2 characters" }),
    lastname: z
      .string()
      .min(2, { message: "Lastname must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password confirmation is required" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

interface SignupFormProps {
  handleClick: ((params: SignUpParameters) => Promise<any>) | (() => void);
}

const SignupForm: React.FC<SignupFormProps> = ({ handleClick }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    try {
      const signUpData: SignUpParameters = {
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        password: data.password,
      };

      if (handleClick.length > 0) {
        const result = await handleClick(signUpData);
        console.log("Signup successful");
        router.push("/auth");
      }
    } catch (error: any) {
      console.error("Signup failed:", error);
      if (error.message) {
        alert(error.message);
      }
    }
  };

  //   return (
  //     <Card className="flex flex-col justify-center items-center gap-4 w-1/2 sm:w-2/5 md:w-1/3 lg:w-1/4 xl:w-1/5">
  //       <CardHeader>
  //         <CardTitle className="text-2xl">Sign-up</CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <Form {...form}>
  //           <form
  //             onSubmit={form.handleSubmit(onSubmit)}
  //             className="space-y-6 flex flex-col justify-center"
  //           >
  //             <FormField
  //               control={form.control}
  //               name="firstname"
  //               render={({ field }) => (
  //                 <FormItem>
  //                   <FormLabel className="font-medium">Firstname</FormLabel>
  //                   <FormControl>
  //                     <Input
  //                       placeholder="firstname"
  //                       {...field}
  //                       hasError={!!form.formState.errors.firstname}
  //                     />
  //                   </FormControl>
  //                   <div className="h-1 italic text-xs md:text-sm">
  //                     {form.formState.errors.firstname && (
  //                       <FormMessage>
  //                         {form.formState.errors.firstname?.message}
  //                       </FormMessage>
  //                     )}
  //                   </div>
  //                 </FormItem>
  //               )}
  //             />
  //             <FormField
  //               control={form.control}
  //               name="lastname"
  //               render={({ field }) => (
  //                 <FormItem>
  //                   <FormLabel className="font-medium">Lastname</FormLabel>
  //                   <FormControl>
  //                     <Input
  //                       placeholder="lastname"
  //                       {...field}
  //                       hasError={!!form.formState.errors.lastname}
  //                     />
  //                   </FormControl>
  //                   <div className="h-1 italic text-xs md:text-sm">
  //                     {form.formState.errors.lastname && (
  //                       <FormMessage>
  //                         {form.formState.errors.lastname?.message}
  //                       </FormMessage>
  //                     )}
  //                   </div>
  //                 </FormItem>
  //               )}
  //             />
  //             <FormField
  //               control={form.control}
  //               name="email"
  //               render={({ field }) => (
  //                 <FormItem>
  //                   <FormLabel className="font-medium">Email</FormLabel>
  //                   <FormControl>
  //                     <Input
  //                       placeholder="@edu.com"
  //                       {...field}
  //                       hasError={!!form.formState.errors.email}
  //                     />
  //                   </FormControl>
  //                   <div className="h-1 italic text-xs md:text-sm">
  //                     {form.formState.errors.email && (
  //                       <FormMessage>
  //                         {form.formState.errors.email?.message}
  //                       </FormMessage>
  //                     )}
  //                   </div>
  //                 </FormItem>
  //               )}
  //             />
  //             <FormField
  //               control={form.control}
  //               name="password"
  //               render={({ field }) => (
  //                 <FormItem>
  //                   <FormLabel className="font-medium">Password</FormLabel>
  //                   <FormControl>
  //                     <Input
  //                       type="password"
  //                       placeholder="********"
  //                       {...field}
  //                       hasError={!!form.formState.errors.password}
  //                     />
  //                   </FormControl>
  //                   <div className="h-1 italic text-xs md:text-sm">
  //                     {form.formState.errors.password && (
  //                       <FormMessage>
  //                         {form.formState.errors.password?.message}
  //                       </FormMessage>
  //                     )}
  //                   </div>
  //                 </FormItem>
  //               )}
  //             />
  //             <FormField
  //               control={form.control}
  //               name="confirmPassword"
  //               render={({ field }) => (
  //                 <FormItem>
  //                   <FormLabel className="font-medium">
  //                     Confirm Password
  //                   </FormLabel>
  //                   <FormControl>
  //                     <Input
  //                       type="password"
  //                       placeholder="********"
  //                       {...field}
  //                       hasError={!!form.formState.errors.confirmPassword}
  //                     />
  //                   </FormControl>
  //                   <div className="h-1 italic text-xs md:text-sm">
  //                     {form.formState.errors.confirmPassword && (
  //                       <FormMessage>
  //                         {form.formState.errors.confirmPassword?.message}
  //                       </FormMessage>
  //                     )}
  //                   </div>
  //                 </FormItem>
  //               )}
  //             />
  //             <div className="flex justify-between">
  //               <Button type="submit">Submit</Button>
  //             </div>
  //           </form>
  //         </Form>
  //       </CardContent>
  //     </Card>
  //   );
  // };

  // export default SignupForm;
  // bg-gradient-to-r from-[#ff7f50] to-[#6a5acd]
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

      {/* <div className='z-40'> */}
      <Card className="absolute flex flex-col justify-center items-center backdrop-blur-md bg-white/40 stroke-white gap-4 w-2/3 md:w-2/5 lg:w-96 z-40">
        <CardHeader className="pb-2 ">
          <CardTitle className="text-2xl">Sign-up</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 flex flex-col justify-center"
            >
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firstname</FormLabel>
                    <FormControl>
                      <Input placeholder="firstname" {...field} />
                    </FormControl>
                    <div className="h-1">
                      {form.formState.errors.firstname && (
                        <FormMessage>
                          {form.formState.errors.firstname?.message}
                        </FormMessage>
                      )}
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input placeholder="lastname" {...field} />
                    </FormControl>
                    <div className="h-1">
                      {form.formState.errors.lastname && (
                        <FormMessage>
                          {form.formState.errors.lastname?.message}
                        </FormMessage>
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>
                    <div className="h-1">
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
                      />
                    </FormControl>
                    <div className="h-1">
                      {form.formState.errors.password && (
                        <FormMessage>
                          {form.formState.errors.password?.message}
                        </FormMessage>
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
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <div className="h-1">
                      {form.formState.errors.confirmPassword && (
                        <FormMessage>
                          {form.formState.errors.confirmPassword?.message}
                        </FormMessage>
                      )}
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button type="submit">Submit</Button>
                {/* <Button variant={'secondary'} onClick={() => handleClick()} >Sign-in</Button> */}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      {/* </div> */}
    </div>
  );
};

export default SignupForm;

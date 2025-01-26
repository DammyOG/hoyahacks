"use client";

import LoginForm from "@/components/signinForm";
import SignupForm from "@/components/signupForm";
import { signIn, signUp } from "@/lib/Auth";
import { Amplify } from "aws-amplify";
import awsConfig from "@/lib/aws-exports";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation"; // For reading query params
import { useToast } from "@/hooks/use-toast";

Amplify.configure(awsConfig as any);

enum FormType {
    SIGNIN = "sign-in",
    SIGNUP = "sign-up",
}

const Page = () => {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const formParam = searchParams.get("form"); // Get the "form" query param
    const [formType, setFormType] = React.useState<FormType>(FormType.SIGNIN);

    useEffect(() => {
        if (formParam === FormType.SIGNUP) {
            setFormType(FormType.SIGNUP);
        } else {
            setFormType(FormType.SIGNIN);
        }
    }, [formParam]);

    const handleFormType = (type: FormType) => {
        setFormType(type);
    };

    const handleSignUp = async (signUp: (params: { firstName: string; lastName: string; email: string; password: string }) => Promise<any>, params: { firstName: string; lastName: string; email: string; password: string }) => {
        try {
            await signUp(params);
            toast({
                "title": "Sign up successful",
            });
        } catch (error) {
            console.error("Error signing up", error);
        }
    }

    const handleSignIn = async (signIn: (params: { email: string; password: string }) => Promise<any>, params: { email: string; password: string }) => {
        try {
            await signIn(params);
            toast({
                "title": "Sign in successful",
            });
        } catch (error) {
            console.error("Error signing in", error);
        }
    }


    return (
        <div>
            {formType === FormType.SIGNIN ? (
                <LoginForm
                    handleClick={(params) => handleSignIn(signIn, params)}
                    handleSwitch={() => handleFormType(FormType.SIGNUP)}
                />
            ) : (
                <SignupForm
                    handleClick={(params) => handleSignUp(signUp, params)}
                    handleSwitch={() => handleFormType(FormType.SIGNIN)}
                />
            )}
        </div>
    );
};

export default Page;

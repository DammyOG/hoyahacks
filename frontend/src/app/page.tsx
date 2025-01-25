"use client";
import FileUpload from "./uploadtest/upload";
import SignupForm from "@/components/signupForm";
import { signIn, signUp } from "@/lib/Auth";
import { Amplify } from "aws-amplify";
import awsConfig from "@/lib/aws-exports";
import SigninForm from "@/components/signinForm";
//   const cognitoAuthConfig = {
//   authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_6qTZmBFD5",
//   client_id: "6uqqi9n1nhi9obns6hnfrseu6r",
//   redirect_uri: "https://d84l1y8p4kdic.cloudfront.net",
//   response_type: "code",
//   scope: "phone openid email",
// };
Amplify.configure(awsConfig as any);
const handleClick = () => {
  console.log("Clicked");
};
export default function Home() {
  // return <AuthProvider {...cognitoAuthConfig}>
  //   <SignupForm handleClick={handleClick}/>
  // </AuthProvider>

  return (
    <SignupForm handleClick={signUp} />
    // <SigninForm handleClick={signIn} />
  );
}

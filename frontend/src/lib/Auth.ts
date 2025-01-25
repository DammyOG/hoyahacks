import { signUp as awsSignUp, signIn as awsSignIn } from 'aws-amplify/auth';

export type SignInParameters = {
   email:string;
   password:string;
};
export async function signIn({email, password}: SignInParameters){
   try{
      console.log("Attempting signin with email:", email);

      const result = await awsSignIn({
         username:email,
         password,
         options: {
            authFlowType: "USER_SRP_AUTH"
         }
      })

      console.log("Signin result:", result);
      return result;
   } catch (error: any) {
      console.error('Error signing in:', error);
      throw error;
   }
}
export type SignUpParameters = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export async function signUp({
  firstName,
  lastName,
  email,
  password
}: SignUpParameters) {
  try {
    console.log("Attempting signup with:", { email, firstName, lastName,password});
    
    const result = await awsSignUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          given_name: firstName,
          family_name: lastName
        },
        autoSignIn: true
      }
    });
    
    console.log("Signup result:", result);
    return result;
  } catch (error: any) {
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
    throw error;
  }
}
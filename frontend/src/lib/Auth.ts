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

// Add MongoDB user creation function
async function createMongoUser(userData: SignUpParameters) {
  try {
    const response = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        skills: [],
        createdAt: new Date(),
        updatedAt: new Date()
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create user in MongoDB');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating MongoDB user:', error);
    throw error;
  }
}

export async function signUp({
  firstName,
  lastName,
  email,
  password
}: SignUpParameters) {
  try {
    console.log("Attempting signup with:", { email, firstName, lastName });
    
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
    
    // After successful Cognito signup, create MongoDB user
    await createMongoUser({ firstName, lastName, email, password });
    
    console.log("Signup result:", result);
    return result;
  } catch (error: any) {
    console.error('Error details:', error);
    throw error;
  }
}
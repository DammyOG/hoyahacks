import { Amplify } from 'aws-amplify';
import awsConfig from "./aws-exports";
import { signUp as awsSignUp, signIn as awsSignIn, getCurrentUser as getCurrentAuthenticatedUser, signOut } from 'aws-amplify/auth';


// Ensure Amplify is configured
Amplify.configure(awsConfig);

export type SignInParameters = {
   email:string;
   password:string;
};

export type UserSession = {
  name: string;
  email: string;
};

export function setUserSession(userData: UserSession) {
  localStorage.setItem("userSession", JSON.stringify(userData));
  // Dispatch custom event
  window.dispatchEvent(new Event('sessionUpdate'));
}

export async function signIn({email, password}: SignInParameters){

   try{
      console.log("Attempting signin with email:", email);

      const result = await awsSignIn({
         username:email,
         password,
         options: {
            authFlowType: "USER_SRP_AUTH"
         }
      });

      // After successful login, fetch and store user data
      try {
         const response = await fetch(`http://localhost:5000/api/users/${email}`);
         if (response.ok) {
            const userData = await response.json();
            // Only store name and email
            setUserSession({
               name: userData.name,
               email: userData.email
            });
            console.log("🟢 User data stored:", userData.name);
         }
      } catch (error) {
         console.error("Error fetching user data:", error);
      }

      
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
        s3FolderPath: `users/${userData.email}/`,
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

// Add this new function after the createMongoUser function
async function createUserS3Folder(email: string) {
  try {
    const response = await fetch('http://localhost:5000/api/users/create-folder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create user S3 folder');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating user S3 folder:', error);
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
    
    // Create S3 folder and get the path
    const { s3Path } = await createUserS3Folder(email);
    
    // After successful Cognito signup, create MongoDB user with S3 path
    await createMongoUser({ 
      firstName, 
      lastName, 
      email, 
      password 
    });
    
    console.log("Signup result:", result);
    return result;
  } catch (error: any) {
    console.error('Error details:', error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const { username } = await getCurrentAuthenticatedUser();
    const response = await fetch(`http://localhost:5000/api/users/${username}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error getting current user:', error);
    throw error;
  }
}

export async function handleSignOut() {
  try {
    // Make sure we're using the configured instance
    await signOut({ global: true });
    localStorage.removeItem("userSession");
    console.log("🔵 User signed out");
    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    // Even if Cognito fails, clear local session
    localStorage.removeItem("userSession");
    return true; // Return true anyway to ensure redirect
  }
}

export async function uploadFile(file: File, email: string) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('relativePath', file.webkitRelativePath);

    const response = await fetch(`http://localhost:5000/api/users/upload/${email}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function uploadProjectPicture(file: File, email: string, projectName: string) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectName', projectName);

    const response = await fetch(`http://localhost:5000/api/users/upload-project-picture/${email}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload project picture');
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading project picture:', error);
    throw error;
  }
}
// "use client";

// import LoginForm from "@/components/signinForm";
// import SignupForm from "@/components/signupForm";
// import { signIn, signUp } from "@/lib/Auth";
// import React from "react";

// enum FormType {
//   LOGIN = "login",
//   SIGNUP = "signup",
// }

// const Page = () => {
//   const [formType, setFormType] = React.useState<FormType>(FormType.LOGIN);

//   const handleFormType = () => {
//     setFormType(formType === FormType.LOGIN ? FormType.SIGNUP : FormType.LOGIN);
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       {FormType.LOGIN === formType ? (
//         <LoginForm handleClick={signIn} />
//       ) : (
//         <SignupForm handleClick={signUp} />
//       )}
//     </div>
//   );
// };

"use client";

import LoginForm from "@/components/signinForm";
import SignupForm from "@/components/signupForm";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation"; // For reading query params

enum FormType {
  SIGNIN = "sign-in",
  SIGNUP = "sign-up",
}

const Page = () => {
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

  return (
    <div>
      {formType === FormType.SIGNIN ? (
        <LoginForm handleClick={() => handleFormType(FormType.SIGNUP)} />
      ) : (
        <SignupForm handleClick={() => handleFormType(FormType.SIGNIN)} />
      )}
    </div>
  );
};

export default Page;

const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_6qTZmBFD5",
      userPoolClientId: "6uqqi9n1nhi9obns6hnfrseu6r",
      loginWith: {
        email: true,
        username: false
      },
      authenticationFlowType: "USER_SRP_AUTH"
    }
  }
};

export default awsConfig;

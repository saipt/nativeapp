import React from 'react';
import { Button,View,Text } from 'react-native';

import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator,withAuthenticator } from '@aws-amplify/ui-react-native';
import amplifyconfig from './src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);
import { fetchAuthSession,PubSub } from 'aws-amplify/auth';

import awsExports from './src/aws-exports';
Amplify.configure(awsExports);
import { signUp,SignOut } from 'aws-amplify/auth';
window.LOG_LEVEL = 'DEBUG';

// retrieves only the current value of 'user' from 'useAuthenticator'
const userSelector = (context) => [context.user];

async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}
fetchAuthSession().then((info) => {
  const cognitoIdentityId = info.identityId;
  console.log("cognitoIdentityId",cognitoIdentityId)
});

const App = () => (
  <View>
    <Text>App1</Text>
  </View>

);
export default withAuthenticator(App);
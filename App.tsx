import React, {useEffect} from 'react';
import { Button,View,Text,Alert,StyleSheet,Pressable } from 'react-native';
import {pubsub} from './src/utils/pubsub.ts'
import {Amplify,CONNECTION_STATE_CHANGE, ConnectionState ,PubSub}  from 'aws-amplify';
import { Hub } from 'aws-amplify/utils';
import { Authenticator, useAuthenticator,withAuthenticator, Heading } from '@aws-amplify/ui-react-native';
import amplifyconfig from './src/amplifyconfiguration.json';
import { fetchAuthSession,AuthUser } from 'aws-amplify/auth';
import {AWSIoTProvider}  from '@aws-amplify/pubsub/';
import { type UseAuthenticator } from "@aws-amplify/ui-react-core";


import awsExports from './src/aws-exports';
//Amplify.configure(awsExports);
import { signUp,SignOut } from 'aws-amplify/auth';
window.LOG_LEVEL = 'DEBUG';

// // retrieves only the current value of 'user' from 'useAuthenticator'
// const userSelector = (context) => [context.user];

fetchAuthSession().then((info) => {
  const cognitoIdentityId = info.identityId;
  console.log("--cognitoIdentityId",cognitoIdentityId)
});


Hub.listen('pubsub', (data) => {
  const { payload } = data;
//  console.log("---",payload.event)
  });

// pubsub is defined in "./src/utils/pubsub.ts" path
pubsub.subscribe({ topics: 'myTopic' }).subscribe({
  next: (data) => console.log('Message received', data),
  error: (error) => console.error(error),
  complete: () => console.log('Done')
});

async function publishMessage() {
  const out = pubsub.publish({ topics: 'myTopic', message: { msg: 'Message from React Native App' } });
}

const App = () => (
<View>
    <Text>App1</Text>
    <Button
      onPress={() => publishMessage()}
      title="Publish"
      color="#841584"
    />
</View>
);
export default withAuthenticator(App);
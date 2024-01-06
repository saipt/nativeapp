import React, {useEffect} from 'react';
import { Button,View,Text,Alert } from 'react-native';
import {pubsub} from './src/utils/pubsub.ts'
import {Amplify,CONNECTION_STATE_CHANGE, ConnectionState ,PubSub}  from 'aws-amplify';
import { Hub } from 'aws-amplify/utils';
import { Authenticator, useAuthenticator,withAuthenticator, Heading } from '@aws-amplify/ui-react-native';
import amplifyconfig from './src/amplifyconfiguration.json';
//Amplify.configure(amplifyconfig);
import { fetchAuthSession } from 'aws-amplify/auth';
import {AWSIoTProvider}  from '@aws-amplify/pubsub/';

import { type AuthUser } from "aws-amplify/auth";
import { type UseAuthenticator } from "@aws-amplify/ui-react-core";


import awsExports from './src/aws-exports';
//Amplify.configure(awsExports);
import { signUp,SignOut } from 'aws-amplify/auth';
//window.LOG_LEVEL = 'DEBUG';

// retrieves only the current value of 'user' from 'useAuthenticator'
const userSelector = (context) => [context.user];

fetchAuthSession().then((info) => {
  const cognitoIdentityId = info.identityId;
  console.log("--cognitoIdentityId",cognitoIdentityId)
});


// Amplify.addPluggable(new AWSIoTProvider({
//      aws_pubsub_region: 'us-east-1',
//      aws_pubsub_endpoint: 'wss://a2vh905c4kwt1m-ats.iot.us-east-1.amazonaws.com/mqtt',
//    }));

Hub.listen('pubsub', (data) => {
  const { payload } = data;
  console.log("---",payload.event)
  });

pubsub.subscribe({ topics: 'myTopic' }).subscribe({
  next: (data) => console.log('Message received', data),
  error: (error) => console.error(error),
  complete: () => console.log('Done')
});

type AppProps = {
  signOut?: UseAuthenticator["signOut"]; //() => void;
  user?: AuthUser;
};

async function publishMessage() {
    const out = pubsub.publish({ topics: 'myTopic', message: { msg: 'Message from React Native' } });
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
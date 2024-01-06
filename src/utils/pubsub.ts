import { PubSub } from '@aws-amplify/pubsub';
export const pubsub = new PubSub({
  region: 'us-east-1',
  endpoint:
    'wss://a2vh905c4kwt1m-ats.iot.us-east-1.amazonaws.com/mqtt'
});
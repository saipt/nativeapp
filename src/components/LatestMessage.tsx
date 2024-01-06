import { useState, useEffect } from 'react';
import { pubsub } from '../utils/pubsub';

export function LatestMessage() {
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    pubsub.subscribe({topics: ['messages']}).subscribe({
        next: (data) => {
          setMessage(data.msg);
        }
    });
  }, [])
  return <>{message}</>
}
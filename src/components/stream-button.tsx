import { useEffect } from "react"

const API_KEY = import.meta.env.VITE_CRYPTOCOMPARE_API_KEY

export const StreamButton = () => {

  useEffect(() => {
    const ccStreamer = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + API_KEY);
    ccStreamer.onopen = function onStreamOpen() {
        const subRequest = {
            "action": "SubAdd",
            "subs": ["0~Coinbase~BTC~USD"]
        };
        ccStreamer.send(JSON.stringify(subRequest));
    }

    ccStreamer.onmessage = function onStreamMessage(event) {
        const message = event.data;
        console.log("Received from Cryptocompare: " + message);
    }

    return () => {
        ccStreamer.close();
    }
  }, [])
  
  return <div>
    <button className="bg-slate-400 rounded-lg p-1 mr-3">Start</button>
    <button className="bg-slate-400 rounded-lg p-1">Stop</button>
  </div>
}
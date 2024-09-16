import { useCryptoCompareWebSocket } from "@/hooks/use-cryptocompare-web-socket"

export const StreamButton = () => {
  const { isConnected, subscribe, unsubscribe } = useCryptoCompareWebSocket();

  function toggleStreaming() {
    if (isConnected) {
      unsubscribe();
    } else {
      subscribe();
    }
  }

  return (
    <div>
      <button
        onClick={toggleStreaming}
        className="bg-slate-400 rounded-lg py-1 px-2 mr-3"
      >
        {isConnected ? "Stop" : "Start"}
      </button>
    </div>
  );
};

import { useCryptoCompareWebSocket } from "@/hooks/use-cryptocompare-web-socket";
import { PlayIcon, PauseIcon } from "@radix-ui/react-icons";

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
    <button
      onClick={toggleStreaming}
      className="text-white text-sm flex flex-col items-center "
    >
      <div>
        {isConnected ? (
          <PauseIcon className="w-8 h-8" />
        ) : (
          <PlayIcon className="w-8 h-8" />
        )}
      </div>

      <div>
        {isConnected ? (
          <span className="color-gray-300 rounded w-3/4 animate-pulse">
            Streaming
          </span>
        ) : (
          <span className="color-gray-300 rounded w-3/4">Stopped</span>
        )}
      </div>
    </button>
  );
};

import { monitorPageTradesAtom } from "@/global-sate";
import { formatNumber } from "@/lib/utils";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const MonitorPage = () => {
  const [trades] = useAtom(monitorPageTradesAtom);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [trades]);

  return (
    <div
      ref={scrollRef}
      className="bg-[#000212] p-4 h-screen overflow-y-scroll font-[Inconsolata] -mt-24 text-white"
    >
      {trades.map((trade) => {
          return (
            <div
              key={trade.ID}
              className={`p-2 rounded-md flex justify-between items-center`}
            >
              <div className="w-1/4">
                <span className="text-yellow-400">P:</span> $
                {formatNumber(trade.P)}
              </div>
              <div className="w-1/4">
                <span className="text-yellow-400">Q:</span> {trade.Q} BTC
              </div>
              <div className="w-1/4">
                <span className="text-yellow-400">TOTAL:</span> $
                {formatNumber(trade.TOTAL)}
              </div>
              <div className="w-1/5">
                <span className="text-yellow-400">TS:</span>{" "}
                {new Date(trade.TS * 1000).toLocaleTimeString()}
              </div>
              <div className="w-1/4">
                <span className="text-yellow-400">RTS:</span>{" "}
                {new Date(trade.RTS * 1000).toLocaleTimeString()}
              </div>
              <div className="w-1/6">
                <span className="text-yellow-400">TYPE:</span> {trade.TYPE}
              </div>
              <div className="w-1/6">
                <span className="text-yellow-400">M:</span> {trade.M}
              </div>
              <div className="w-1/6">
                <span className="text-yellow-400">FSYM:</span> {trade.FSYM}
              </div>
              <div className="w-1/6">
                <span className="text-yellow-400">TSYM:</span> {trade.TSYM}
              </div>
            </div>
          );
      })}
    </div>
  );
};

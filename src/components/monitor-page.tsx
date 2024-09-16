import { tradesAtom } from "@/global-sate";
import { Trade } from "@/types";
import { useAtom } from "jotai";

export const MonitorPage = () => {
  const [trades] = useAtom(tradesAtom);

  const formatNumber = (num: number) =>
    num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const getAlertClass = (trade: Trade) => {
    if (trade.P < 50000) return "text-green-500";
    if (trade.Q > 10) return "text-orange-500";
    if (trade.TOTAL > 1000000) return "text-red-500";
    return "";
  };

  return (
    <div className="bg-black text-green-400 p-4 h-screen overflow-hidden font-mono text-sm">
      {trades.map((trade) => (
        <div key={trade.ID} className={`${getAlertClass(trade)}`}>
          {`ID: ${trade.ID} | Price: $${formatNumber(
            trade.P
          )} | Quantity: ${formatNumber(trade.Q)} BTC | Total: $${formatNumber(
            trade.TOTAL
          )} | Time: ${new Date(trade.TS).toLocaleTimeString()}`}
        </div>
      ))}
    </div>
  );
};

import { alertsPageTradesAtom } from "@/global-sate";
import { alertRules } from "@/lib/alert-rules";
import { formatNumber } from "@/lib/utils";
import { AlertRule } from "@/types";
import { useAtom } from "jotai";

export const AlertsPage = () => {
  const [alertsPageTrades] = useAtom(alertsPageTradesAtom);

  function getMatchingTrades(rule: AlertRule) {
    return alertsPageTrades.filter((trade) =>
      rule.condition(trade.P, trade.Q, trade.TOTAL)
    );
  }

  function getAlertCount(rule: AlertRule) {
    const matchingTrades = getMatchingTrades(rule);

    if (matchingTrades.length > 0) {
      return matchingTrades.length;
    }

    return 0;
  }

  return (
    <div className="space-y-8 pt-10 px-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alertRules.map((rule) => (
          <div
            key={rule.name}
            className={`p-4 rounded-lg ${rule.color} border-[3px] border-white/10`}
          >
            <h2 className="text-xl font-semibold mb-2">{rule.name}</h2>
            <p className="text-3xl ">{getAlertCount(rule)}</p>
          </div>
        ))}
      </div>
      {alertRules.map((rule) => {
        const matchingTrades = getMatchingTrades(rule);

        if (matchingTrades.length === 0) {
          return null;
        }

        return (
          <div key={rule.name}>
            <h2 className={`text-xl font-semibold mb-2 ${rule.color}`}>
              {rule.name}
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full  rounded-lg overflow-hidden">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left">Alert Message</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    matchingTrades.map((trade) => (
                      <tr key={trade.ID}>
                        <td className="border-t border-gray-700 px-4 py-2">
                          {rule.name}
                        </td>
                        <td className="border-t border-gray-700 px-4 py-2">
                          ${formatNumber(trade.P)}
                        </td>
                        <td className="border-t border-gray-700 px-4 py-2">
                          {formatNumber(trade.Q)} BTC
                        </td>
                        <td className="border-t border-gray-700 px-4 py-2">
                          ${formatNumber(trade.TOTAL)}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

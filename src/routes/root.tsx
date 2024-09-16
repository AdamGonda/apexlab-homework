import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { StreamButton } from "@/components/stream-button";
import { isConnectedAtom } from "@/global-sate";
import { useAtom } from "jotai";

export const Root = () => {
  const location = useLocation();
  const [isConnected] = useAtom(isConnectedAtom);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 backdrop-blur-[8px] bg-white/10 z-10">
        <nav className="flex justify-between items-center px-7">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">Crypto Alerts</h1>
            <div className="pt-[2px]">
              {isConnected ? (
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              ) : (
                <div className="w-3 h-3 bg-red-500 rounded-full" />
              )}
            </div>
          </div>

          <StreamButton />

          <ul className="flex space-x-4 items-center text-lg font-semibold">
            <li>
              <Link
                to="/"
                className={`hover:text-gray-300 ${
                  location.pathname === "/" ? "underline" : ""
                }`}
              >
                Monitor
              </Link>
            </li>
            <li>
              <Link
                to="/alerts"
                className={`hover:text-gray-300 ${
                  location.pathname === "/alerts" ? "underline" : ""
                }`}
              >
                Alerts
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main id="detail">
        <Outlet />
      </main>
    </div>
  );
};

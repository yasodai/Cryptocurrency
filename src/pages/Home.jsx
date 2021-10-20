import React from "react";
import millify from "millify";
import { useGetCryptosQuery } from "../api/cryptoApi";
import { Link } from "react-router-dom";
import { Cryptocurrencies, News } from ".";

function Row({ children }) {
  return <div className="grid grid-cols-2 gap-4 mt-5">{children}</div>;
}
function Col({ title, value }) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}

export function Home() {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <>Loading...</>;
  return (
    <>
      {/* Global Crypto Stats */}
      <div>
        <h2 className="text-2xl font-semibold">Global Crypto Stats</h2>
        <Row>
          <Col
            title="Total Cryptocurrencies"
            value={globalStats.total.toLocaleString()}
          />
          <Col
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
          <Col
            title="Total Market Cap:"
            value={millify(globalStats.totalMarketCap)}
          />
          <Col
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />
          <Col
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Row>
      </div>
      {/* Top 10 Cryptos In The World */}
      <div>
        <div className="flex justify-between mt-14 text-xl font-semibold">
          <h2 className="">Top 10 Cryptos In The World</h2>
          <Link className="text-blue-500" to="/cryptocurrencies">
            Show More
          </Link>
        </div>
        <Cryptocurrencies simplified />
      </div>
      {/* Latest Crypto News */}
      <div>
        <div className="flex justify-between mt-14 text-xl font-semibold">
          <h2 className="">Latest Crypto News</h2>
          <Link className="text-blue-500" to="/news">
            Show More
          </Link>
        </div>
        <News simplified />
      </div>
    </>
  );
}

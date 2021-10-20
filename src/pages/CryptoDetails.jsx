import React, { cloneElement, useState } from "react";
import parse from "html-react-parser";

import millify from "millify";
import { useParams } from "react-router-dom";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../api/cryptoApi";
import { Icon } from "../components";
import { LineChart } from ".";

export function CryptoDetails() {
  const { id } = useParams();
  const [timeperiod, setTimeperiod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(id);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ id, timeperiod });

  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <>Loading...</>;

  const time = ["24h", "7d", "30d", "1y", "5y"];
  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <Icon.Dollar />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <Icon.Hashtag /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
      icon: <Icon.lightning />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <Icon.Dollar />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <Icon.Star />,
    },
  ];
  const genericstats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <Icon.Chart />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <Icon.Currency />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails.approvedSupply,
      icon: <Icon.Exclamation />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails.totalSupply)}`,
      icon: <Icon.Exclamation />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
      icon: <Icon.Exclamation />,
    },
  ];
  const State = ({ stateValue }) => {
    return (
      <>
        <ul className="p-3">
          {stateValue.map(({ title, value, icon }) => (
            <li
              key={title}
              className="flex justify-between items-center p-5  hover:bg-white border-b border-border"
            >
              <div className="flex gap-2 text-gray-600 text-sm">
                {cloneElement(icon, { className: "w-5 h-5 " })} <p>{title}</p>
              </div>
              <p className="text-black font-semibold">{value}</p>
            </li>
          ))}
        </ul>
      </>
    );
  };
  const onChange = (e) => {
    setTimeperiod(e.target.value);
  };

  return (
    <>
      {/* title */}
      <div className="flex flex-col items-center gap-10 mt-10">
        <h1 className="text-3xl text-pink font-black">
          {cryptoDetails.name} ({cryptoDetails.slug}) Price{" "}
        </h1>
        <p>
          {cryptoDetails.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </div>
      {/* chart */}
      <div className="space-y-3 px-3 border-t border-border mt-10 py-5">
        <select
          onChange={onChange}
          defaultValue="7d"
          className="transition-all duration-300 px-2 py-1 text-sm w-52  border border-border hover:ring-1 ring-blue-300 focus:outline-none focus:ring-1"
        >
          {time.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(cryptoDetails.price)}
          coinName={cryptoDetails.name}
        />
      </div>
      {/* stats */}
      <div className="flex flex-col gap-7 lg:flex-row">
        <div>
          <div className="flex flex-col  gap-5 px-3">
            <h1 className="text-2xl text-pink font-black">
              {cryptoDetails.name} Value Statistics
            </h1>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </div>
          <State stateValue={stats} />
        </div>
        <div>
          <div className="flex flex-col  gap-5 px-3">
            <h1 className="text-2xl text-pink font-black">Other Stats Info</h1>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </div>
          <State stateValue={genericstats} />
        </div>
      </div>
      {/* info & link */}
      <div className="px-3 mt-10 flex flex-col gap-10 lg:flex-row">
        <div className="desc flex-1">
          <h5 className="text-2xl text-pink font-black">
            What is {cryptoDetails.name}?
          </h5>
          {parse(cryptoDetails.description)}
        </div>
        <div className="flex-1">
          <h5 className="text-2xl text-pink font-black">
            {cryptoDetails.name} Links
          </h5>
          <ul className="mt-5">
            {cryptoDetails.links?.map((link, i) => (
              <li
                key={i}
                className="flex justify-between p-5 font-bold  hover:bg-white border-b border-border "
              >
                <h4>{link.type}</h4>
                <a
                  className="text-pink"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

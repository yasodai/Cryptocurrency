import React, { useState } from "react";
import { useGetCryptoExchangesQuery } from "../api/cryptoApi";
import parser from "html-react-parser";
import millify from "millify";
function Accordion({
  rank,
  iconUrl,
  name,
  volume,
  numberOfMarkets,
  marketShare,
  description,
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className="grid grid-cols-9 gap-2 text-sm items-center bg-white p-2.5 border  border-border"
      >
        <span className="flex gap-3 items-center flex-wrap col-span-3">
          <strong>{rank}.</strong>
          <img className="w-8 h-8" src={iconUrl} alt="" />
          <strong>{name}</strong>
        </span>
        <span className="col-span-2">${volume}</span>
        <span className="col-span-2">{numberOfMarkets}</span>
        <span className="col-span-2">{marketShare}%</span>
      </div>
      <div
        className={`${
          open && "max-h-screen py-4 "
        } desc max-h-0 bg-white px-4 overflow-hidden ease duration-300  border-l border-r border-border `}
      >
        {parser(description || "")}
      </div>
    </>
  );
}

export function Exchanges() {
  const { data, isFetching } = useGetCryptoExchangesQuery();

  if (isFetching) return <>Loading...</>;
  const exchanges = data.data.exchanges;

  return (
    <>
      <ul className="">
        <li className="grid grid-cols-9 gap-2 text-sm ">
          <span className="col-span-3">Exchanges</span>
          <span className="col-span-2">24h Trade Volume</span>
          <span className="col-span-2">Markets</span>
          <span className="col-span-2">Change</span>
        </li>
        {exchanges.map((exchange) => (
          <li key={exchange.id}>
            <Accordion
              rank={exchange.rank}
              iconUrl={exchange.iconUrl}
              name={exchange.name}
              volume={millify(exchange.volume)}
              numberOfMarkets={millify(exchange.numberOfMarkets)}
              marketShare={millify(exchange.marketShare)}
              description={exchange.description}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

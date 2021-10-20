import React, { useEffect, useState } from "react";
import millify from "millify";
import { useGetCryptosQuery } from "../api/cryptoApi";
import { Link } from "react-router-dom";

function Row({ children }) {
  return (
    <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-7">
      {children}
    </div>
  );
}
function Card({ rank, name, icon, price, marketCap, change }) {
  return (
    <div className="bg-white hover:shadow-card transition-all duration-300">
      <div className="card-header flex justify-between px-5 py-4 border-b-2 border-bgSecondary items-center">
        <h5 className="text-sm font-semibold  tracking-wide">
          {`${rank}. ${name}`}{" "}
        </h5>
        <img className="h-9 w-9 object-scale-down" src={icon} alt={name} />
      </div>
      <div className="card-body flex flex-col gap-5 px-5 py-7 text-[13px]">
        <span>{`Price: ${price}`}</span>
        <span>{`Market Cap: ${marketCap}`}</span>
        <span>{`Daily Change: ${change}`}</span>
      </div>
    </div>
  );
}
export function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <>Loading...</>;
  return (
    <>
      {!simplified && (
        <div className="flex justify-center ">
          <input
            className="px-2.5 py-1.5 text-sm w-64 border border-border hover:ring-1 ring-blue-300 focus:outline-none focus:ring-1"
            type="search"
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row>
        {cryptos?.map((currency) => (
          <Link key={currency.id} to={`/crypto/${currency.id}`}>
            <Card
              rank={currency.rank}
              name={currency.name}
              icon={currency.iconUrl}
              price={millify(currency.price)}
              marketCap={millify(currency.marketCap)}
              change={millify(currency.change)}
            />
          </Link>
        ))}
      </Row>
    </>
  );
}

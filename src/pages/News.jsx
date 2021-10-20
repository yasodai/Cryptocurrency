import React, { useState } from "react";
import { useGetCryptoNewsQuery } from "../api/cryptoNewsApi";
import { useGetCryptosQuery } from "../api/cryptoApi";
import moment from "moment";
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
function Row({ children }) {
  return (
    <div className="grid xs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-7 mt-7">
      {children}
    </div>
  );
}
function Card({
  name,
  image,
  description,
  provider,
  thumbnail,
  datePublished,
}) {
  return (
    <div className="flex flex-col justify-between bg-white p-6 h-full hover:shadow-card transition-all duration-300">
      <header className="flex justify-between">
        <h5 className="font-semibold">{name}</h5>
        <img className="object-scale-down self-start" src={image} alt="news" />
      </header>
      <section className="text-[15px] py-4">
        {description > 100
          ? `${description.substring(0, 100)}...`
          : description}
      </section>
      <footer className="flex justify-between items-center py-3 text-[13px]">
        <div className="flex items-center">
          <img
            src={thumbnail}
            alt="news"
            className="h-7 w-7 rounded-full object-center mr-2"
          />
          <span>{provider}</span>
        </div>
        <span>{moment(datePublished).startOf("second").fromNow()}</span>
      </footer>
    </div>
  );
}
export function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const onChange = (e) => {
    e.preventDefault();
    setNewsCategory(e.target.value);
  };

  if (!cryptoNews?.value) return <>Loading...</>;
  return (
    <>
      {!simplified && (
        <div className="">
          <select
            className="px-2.5 py-1.5 text-sm w-64  border border-border hover:ring-1 ring-blue-300 focus:outline-none focus:ring-1"
            onChange={onChange}
          >
            <option value="" disabled selected hidden>
              Select a Crypto
            </option>
            <option value="Cryptocurrency">Cryptocurrency</option>
            {data?.data?.coins.map((coin, i) => (
              <option key={i} value={coin.name}>
                {coin.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <Row>
        {cryptoNews.value.map((news, i) => (
          <a key={i} href={news.url} target="_blank" rel="noopener noreferrer">
            <Card
              name={news.name}
              image={news?.image?.thumbnail?.contentUrl || demoImage}
              description={news.description}
              provider={news.provider[0]?.name}
              thumbnail={
                news.provider[0]?.image?.thumbnail?.contentUrl || demoImage
              }
              datePublished={news.datePublished}
            />
          </a>
        ))}
      </Row>
    </>
  );
}

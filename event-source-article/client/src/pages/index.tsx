import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<{ num: number } | null>();
  useEffect(() => {
    const evtSource = new EventSource("http://localhost:4000/event-source");
    evtSource.addEventListener("interval", (event) => {
      if (event.data) {
        setData(JSON.parse(event.data));
      }
    });
    /* 
    Or if you are using straight up messages and not custom events:
    */
    evtSource.onmessage = (event) => {
      if (event.data) {
        setData(JSON.parse(event.data));
      }
    };
  }, []);
  return (
    <>
      <Head>
        <title>Blog Project</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <h1>Welcome</h1>
        {data && (
          <div>
            <p>Counter: {data.num}</p>
          </div>
        )}
      </div>
    </>
  );
}

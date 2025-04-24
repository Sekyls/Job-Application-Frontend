import { useState, useEffect } from "react";
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const abortCont = new AbortController();
    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setPending(false);
        setError(null);
      })
      .catch((e) => {
        if (e.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setError(e.message);
          setPending(false);
        }
      });
    return () => abortCont.abort();
  }, [url]);

  return { data, pending, error };
};

export default useFetch;

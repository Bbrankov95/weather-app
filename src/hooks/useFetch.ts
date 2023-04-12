import { useCallback, useEffect, useState } from "react";

import { BASE_URL } from "api";

type UseFetch = ({ url }: { url: string }) => void;

const useFetch: UseFetch = ({ url }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState<unknown | null>(null);

  const fetchUrl = useCallback(async () => {
    try {
      const res = await (await fetch(`${BASE_URL}${url}`)).json();
      setData(res);
    } catch (error: unknown) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    fetchUrl();
  }, [url]);

  return [data, error];
};

export default useFetch;

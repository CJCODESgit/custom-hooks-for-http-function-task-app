import { useState } from "react";

import(useState)

const useHttp = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const sendRequests = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers,
        body: JSON.stringify(requestConfig.body)
      }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      applyData(data);

    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };

  return {
    // since we are using the same property names as variable names we can omit the names on the right but i won't be doing that for the sake of better readability
    isLoading: isLoading,
    error: error,
    sendRequests: sendRequests
  }
};

export default useHttp;
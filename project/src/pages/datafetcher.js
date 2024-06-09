import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataFetcher = ({ id }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/data/${id}`);
        setData(response.data);
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default DataFetcher;

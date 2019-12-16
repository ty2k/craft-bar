import React, { useCallback, useEffect, useState } from 'react';
import Beer from './Beer';
import Spinner from '../components/Spinner';

function BeerList() {
  const [message, setMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [beers, setBeers] = useState([]);
  const [url, setUrl] = useState('/api');

  const fetchData = useCallback(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        setBeers(json.beers);
        setMessage(`${json.beers.length} beers and counting!`);
        setIsFetching(false);
      }).catch(e => {
        setMessage(`API call failed: ${e}`);
        setIsFetching(false);
      })
  }, [url]);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);

  return (
    <div className="BeerList">
      <p><strong>{isFetching ? 'Counting beers...' : message}</strong></p>
      <div>
        {isFetching
          ? <Spinner/>
          : beers.map(beer => <Beer beer={beer}/>)}
      </div>
    </div>
  );
}

export default BeerList;

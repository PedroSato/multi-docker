import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  const fetchValues = async () => {
    const resultValues = await axios.get('/api/values/current');
    setValues(resultValues.data);
  };
  const fetchIndexes = async () => {
    const resultSeenIndexes = await axios.get('/api/values/all');
    setSeenIndexes(resultSeenIndexes.data);
  };

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(', ');
  };

  const renderValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>,
      );
    }
    return entries;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('/api/values', {
      index,
    });
    setIndex('');
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={event => {
            setIndex(event.target.value);
          }}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated values:</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;

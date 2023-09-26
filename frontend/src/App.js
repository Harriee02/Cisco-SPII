import React, { useState } from 'react';

function App() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8070/helloworld');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.text();
      setData(responseData);
      console.log(responseData);
      setLoading(false);
    } catch (error) {
      setError('An error occurred while fetching data.');
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Frontend</h1>
        <button onClick={fetchData} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>
        {error && <div className="error-message">{error}</div>}
        <div className="data-container">
          {data && (
            <div>
              <h2>Data Received:</h2>
              <p>{data}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;

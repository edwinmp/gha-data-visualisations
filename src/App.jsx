import React, { useEffect, useState } from 'react';
import renderDonorsChart from './charts/donors';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    renderDonorsChart();
  }, []);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default App;

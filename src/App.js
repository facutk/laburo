import React, { useEffect, useState } from 'react';

const App = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    fetch('/api/time')
      .then(r => r.json())
      .then(({ time }) => setTime(time))
  }, []);

  return (
    <div>
      <h3>react app</h3>
      server time is: {time}
    </div>
  );
}

export default App;

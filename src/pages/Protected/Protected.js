import React, { useEffect } from 'react';

const Protected = () => {
  useEffect(() => {
    fetch("/api/auth/protected")
      .then(r => r.json())
      .then(console.log);
  }, [])
  
  return <h3>Protected</h3>;
}

export default Protected;

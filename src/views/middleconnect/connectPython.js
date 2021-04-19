import React, { useState, useEffect } from 'react';
import axios from 'axios';
function ConnectPython() {
  const [currentTime, setCurrentTime] = useState(10);

  useEffect(() => {
 
    axios.get('http://localhost:8000/', {
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          }
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
      console.log(res.data.Hello);
      setCurrentTime(res.data.Hello);
    })

  }, []);

  return (
    <div className="App">
      <header className="App-header">

        ... no changes in this part ...

        <p>The current time is {currentTime}.</p>
      </header>
    </div>
  );
}

export default ConnectPython;
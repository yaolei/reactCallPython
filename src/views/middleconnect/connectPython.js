import React, { useState, useEffect, useContext } from 'react';
import {FatherContext} from '../migrationMainLayout'
import RegistrationForm from '../reportFroms'
import axios from 'axios';

function ConnectPython() {
  const [currentTime, setCurrentTime] = useState(10);
  const pathName = useContext(FatherContext);

  const [currentPathName, setCurrentPathName] = useState(pathName)

  useEffect(() => {
    let URL =  "http://localhost:8000" + currentPathName;
    axios.get(URL, {
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
        <RegistrationForm />
        <p>The current time is {currentTime}.</p>
      </header>
    </div>
  );
}

export default ConnectPython;
import React, { useState, useEffect } from 'react';
import API from './API';
import style from './Weather.module.css';

function Weather() {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [temp, setTemp] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setLoading(true);
    API.readTaipeiWeather().then(response => {
      setLoading(false);
      if ('error' in response) {
        setError(response.error);
      } else {
        const data = response.result;
        const { temp, description } = data;
        setTemp(temp == null ? '--' : `${temp} °C`);
        setDescription(description == null ? '--' : `${description}`);
      }
    });
  }, []);

  return (
    <div className={style.container}>
      <div className={style.location}> Taipei </div>
      {isLoading ? (
        <div className={style.loading}> Loading Weather... </div>
      ) : error == '' ? (
        <>
          <div className={style.temp}> {temp} </div>
          <div className={style.desc}>{description} </div>
        </>
      ) : (
        <div className={style.error}> {error} </div>
      )}
    </div>
  );
}

export default Weather;

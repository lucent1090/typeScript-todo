import React, { useState, useEffect } from 'react';
import Api, { WeatherValidResult } from './Api';
import style from './Weather.module.css';

function Weather() {
  const [temp, setTemp] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    Api.readTaipeiWeather()
      .then(response => {
        switch(response.valid) {
          case true:
            const data = (response as WeatherValidResult).result;
            const { temp, description } = data;
            setTemp(temp == null ? '--' : `${temp} °C`);
            setDescription(description == null ? '--' : `${description}`);
            break;
          case false:
          default:
            break;
        }
      })
  }, []);

  return (
    <div className={style.container}>
      <div className={style.location}> Taipei </div>
      <div className={style.temp}> {temp} </div>
      <div className={style.desc}>{description} </div>
    </div>
  );
};

export default Weather;
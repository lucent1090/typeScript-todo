import React, { useState, useEffect } from 'react';
import Api, { WeatherValidResult } from './Api';

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
            setTemp(temp == null ? '--' : `${temp}`);
            setDescription(description == null ? '--' : `${description}`);
            break;
          case false:
          default:
            break;
        }
      })
  }, [temp]);

  return (
    <div>
      {temp}
      {description}
    </div>
  );
};

export default Weather;
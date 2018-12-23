import React, { useState, useEffect } from 'react';
import Api, { WeatherValidResult } from './Api';

function Weather() {
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    Api.readTaipeiWeather()
      .then(data => {
        switch(data.valid) {
          case true:
            const result = (data as WeatherValidResult).result;
            const temp = result.temp == null ? 0 : result.temp;
            setTemp(temp);
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
    </div>
  );
};

export default Weather;
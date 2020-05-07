import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cities = () => {

  const [cities] = useState([
    {
      name: 'Lviv'
    },
    {
      name: 'Kyiv'
    },
    {
      name: 'Odessa'
    }
  ]);

  return(
    <div>
      <h1>Cities</h1>
      {cities.map(city => (
        <Link key={city.name} to={'/cities/' + city.name}>
          <div>
            {city.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Cities;
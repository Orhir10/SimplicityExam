import React from "react";

const CountryData = ({ data }) => {
  return (
    <div>
      <h3>
        Country : <span>{data[0].name}</span>
      </h3>
      <h3>
        Language : <span>{data[0].language}</span>
      </h3>
      <h3>
        Currency : <span>{data[0].currency}</span>
      </h3>
      <h3>
        Capital : <span>{data[0].capital}</span>
      </h3>
    </div>
  );
};

export default CountryData;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const query = `query {countries {
    edges {
        node {
            name
        }
    }
}}`;

const CountrySelect = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Albania");

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.post("https://graphql.country/graphql", {
        query: query,
        headers: { "content-type": "application/json" },
      });
      setCountries(response.data.data.countries.edges);
      console.log(response.data.data.countries.edges);
    };

    fetch();
  }, []);

  return (
    <div className='map'>
      <div className='countries'>
        <div className='countries-list'>
          <select
            onChange={(e) => {
              setSelectedCountry(e.target.value);
            }}>
            {countries.map((country) => {
              return (
                <option
                  style={{
                    backgroundImage:
                      "url(" +
                      "https://www.countryflags.io/be/flat/64.png" +
                      ")",
                    backgroundPosition: "center",

                    backgroundRepeat: "no-repeat",
                  }}
                  key={country.node.name}>
                  {country.node.name}
                </option>
              );
            })}
          </select>
          <Link to={`/${selectedCountry}`}>
            <button>Load country data</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CountrySelect;

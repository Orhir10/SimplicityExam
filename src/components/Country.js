import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Graph from "./Graph";
import CountryData from "./CountryData";
import { Link } from "react-router-dom";

function Country() {
  let { country } = useParams();
  const [data, setData] = useState(false);
  const [currentRepresentation, setCurrentRepresentation] = useState(true);

  const handleSwitchScale = () => {
    setCurrentRepresentation(!currentRepresentation);
  };

  useEffect(() => {
    const query = `query {
      countries(name: "${country}") {
        edges {
          node {
            name
            capital
            latLng
            population
            area
            currencies {
              edges {
                node {
                  name
                }
              }
            }
            languages {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }`;

    axios
      .post("https://graphql.country/graphql", {
        query: query,
        headers: { "content-type": "application/json" },
      })
      .then((response) => {
        console.log(response);
        setData([
          {
            name: response.data.data.countries.edges[0].node.name,
            x: response.data.data.countries.edges[0].node.latLng[0],
            y: response.data.data.countries.edges[0].node.latLng[1],
            currency:
              response.data.data.countries.edges[0].node.currencies.edges[0]
                .node.name,
            language:
              response.data.data.countries.edges[0].node.languages.edges[0].node
                .name,
            capital: response.data.data.countries.edges[0].node.capital,
            population: response.data.data.countries.edges[0].node.population,
            area: response.data.data.countries.edges[0].node.area,
          },
        ]);
      });
  }, []);

  console.log(data);
  if (!data) {
    return <div>loading</div>;
  }
  return (
    <div className='full-content'>
      <div className='content'>
        <Graph data={data} currentRepresentation={currentRepresentation} />
        <CountryData data={data} />
      </div>
      <div className='switchButton'>
        <button onClick={handleSwitchScale}>Switch Ratio</button>
        <h3>
          Ratio by :{" "}
          <span>{currentRepresentation ? "population" : "area"}</span>
        </h3>
      </div>
      <div className='back-button'>
        <Link to={`/`}>
          <button>Back</button>
        </Link>
      </div>
    </div>
  );
}

export default Country;

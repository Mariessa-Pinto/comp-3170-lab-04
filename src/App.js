import "./styles.css";
import data from "./data/countries";
import Country from "./components/Country";
import { useState } from "react";

//SORT

// Compare alphabetically
function alphaCompare(a, b) {
  return a.name.localeCompare(b.name);
}

function alphaSort(list) {
  return list.sort(alphaCompare);
}

// Compare Ascending

function lessThan(a, b) {
  return a.population - b.population;
}

function ascSort(list) {
  return list.sort(lessThan);
}

// Compare Descending

function moreThan(a, b) {
  return b.population - a.population;
}

function desSort(list) {
  return list.sort(moreThan);
}

// Shuffle Sort

function shuffSort(list) {
  const shuffledList = [...list];
  for (let i = shuffledList.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    [shuffledList[i], shuffledList[r]] = [shuffledList[r], shuffledList[i]];
  }
  return shuffledList;
}

// Filter by Population

function less100M(country) {
  return country.population < 100000000;
}

function more100M(country) {
  return country.population >= 100000000;
}

function more200M(country) {
  return country.population >= 200000000;
}

function more500M(country) {
  return country.population >= 500000000;
}

function more1B(country) {
  return country.population >= 1000000000;
}

// Compare by Continent

function filterByContinent(list, option) {
  return list.filter(function (item) {
    return item.continent.toLowerCase() === option;
  });
}

// Sort Defaults

export default function App() {
  const [sortOrder, setSortOrder] = useState(">");
  const [filterOption, setFilterOption] = useState("all");

  function handleSort(e) {
    setSortOrder(e.target.value);
  }

  function sort(list) {
    if (sortOrder === "alpha") {
      return alphaSort(list);
    } else if (sortOrder === "<") {
      return ascSort(list);
    } else if (sortOrder === ">") {
      return desSort(list);
    } else if (sortOrder === "shuffle") {
      return shuffSort(list);
    } else {
      return list;
    }
  }

  //Filter Defaults

  function handleFilter(e) {
    setFilterOption(e.target.value);
  }

  function filter(list) {
    if (filterOption === "<100M") {
      return list.filter(less100M);
    } else if (filterOption === ">100M") {
      return list.filter(more100M);
    } else if (filterOption === ">200M") {
      return list.filter(more200M);
    } else if (filterOption === ">500M") {
      return list.filter(more500M);
    } else if (filterOption === ">1B") {
      return list.filter(more1B);
    } else if (filterOption !== "all") {
      return filterByContinent(list, filterOption);
    } else {
      return list;
    }
  }

  const sorted = sort(data.countries);
  const filtered = filter(sorted);

  return (
    <div className="App">
      <h1>World's Largest Countries by Population</h1>
      <div className="filters">
        <label>
          Sort by:
          <select value={sortOrder} onChange={handleSort}>
            <option value=">">Population Descending</option>
            <option value="<">Population Ascending</option>
            <option value="alpha">Alphabetically</option>
            <option value="shuffle">Shuffle</option>
          </select>
        </label>
        <label>
          Filters:
          <select value={filterOption} onChange={handleFilter}>
            <optgroup label="By Continent">
              <option value="all">All</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="europe">Europe</option>
              <option value="north america">North America</option>
              <option value="south america">South America</option>
            </optgroup>
            <optgroup label="By Population">
              <option value="<100M">Less than 100M</option>
              <option value=">100M">100M or More</option>
              <option value=">200M">200M or More</option>
              <option value=">500M">500M or More</option>
              <option value=">1B">1B or More</option>
            </optgroup>
          </select>
        </label>
      </div>
      <div className="countries">
        {filtered.map(function (country) {
          return <Country details={country} key={country.id} />;
        })}
      </div>
    </div>
  );
}

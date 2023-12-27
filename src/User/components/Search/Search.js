import React, { useEffect, useState } from 'react';
import { Button, Input, AutoComplete } from 'antd';
import Card from '../Home/Card';

const SearchResult = ({ result }) => {
  return (
    <div style={{ marginRight: '10px' }}>
      <Card in4phim={result} />
    </div>
  );
};

const Search = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/film/');
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    // Update filtered options based on the current input
    const newFilteredOptions = data
      .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
      .map((item) => ({ value: item.name }));
    setFilteredOptions(newFilteredOptions);
  }, [query, data]);

  const handleSearch = () => {
    // Update the results based on the current input
    const filteredResults = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ marginBottom: '20px', color: '#ee0000' }}>Tìm kiếm</h1>
      <AutoComplete
        options={filteredOptions}
        onSelect={(value) => setQuery(value)}
        style={{ width: '80%', marginBottom: '20px' }}
      >
        <Input.Search
          placeholder="Tìm kiếm gì đó..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={handleSearch}
          enterButton={<Button type="primary" style={{ backgroundColor: '#ee0000' }}>Tìm kiếm</Button>}
          style={{
            width: '100%',
            height: '32px',
            borderColor: '#7d7d7d',
          }}
        />
      </AutoComplete>

      <h2 style={{ marginTop: '20px', color: '#ee0000' }}>Kết quả tìm kiếm</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {results.length !== 0 ? results.map((result) => (
          <SearchResult key={result.id} result={result} />
        )) : <p style={{ marginTop: '20px' }}>Không có gì ở đây cả...</p>}
      </div>
      <div style={{ marginBottom: 20 }}></div>
    </div>
  );
};

export default Search;

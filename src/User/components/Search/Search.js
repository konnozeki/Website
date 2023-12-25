// App.js
import React, { useState } from 'react';
import { Button, Input } from 'antd';
import Card from '../Home/Card';

const SearchResult = ({ result }) => {
  return (
    <div style={{ marginRight: '10px' }}>
      <Card in4phim={result}/>
    </div>
  );
};

const data = [
    { id: 1, Avatar: "https://i.pinimg.com/474x/ce/d1/92/ced19202fc726b274caf80d96fb2fd0a.jpg", Name: "Elemental" },
    { id: 2, Avatar: "https://i.pinimg.com/564x/85/ae/77/85ae77b56085ea73c502c33c09c71d86.jpg", Name: "Flash" },
    { id: 3, Avatar: "https://i.pinimg.com/564x/47/39/39/4739399af136287e7358a49b563e81c8.jpg", Name: "Braven" },
    { id: 4, Avatar: "https://i.pinimg.com/564x/53/18/94/53189487f23a8de96411f6deb0e647cc.jpg", Name: "Gundala Gundala Gundala Gundala" },
    { id: 5, Avatar: "https://i.pinimg.com/474x/ce/d1/92/ced19202fc726b274caf80d96fb2fd0a.jpg", Name: "Elemental" },
    { id: 6, Avatar: "https://i.pinimg.com/564x/85/ae/77/85ae77b56085ea73c502c33c09c71d86.jpg", Name: "Flash" },
    { id: 7, Avatar: "https://i.pinimg.com/564x/47/39/39/4739399af136287e7358a49b563e81c8.jpg", Name: "Braven" }
  ]

  const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
  
    const handleSearch = () => {
      // Perform search logic here
      const filteredResults = data.filter((item) =>
        item.Name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    };
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ marginBottom: '20px', color:'#ee0000' }}>Search</h1>
        {/* Use Ant Design Input.Search */}
        <Input.Search
          placeholder="Search Anything"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={handleSearch}
          enterButton={<Button type="primary" style={{ backgroundColor: '#ee0000' }}>Search</Button>}
          style={{
            width: '80%',
            height: '32px',
            borderColor: '#7d7d7d',
            ':hover': {
              borderColor: '#ee0000',
              boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
            }
          }}
        />

        <h2 style={{ marginTop: '20px', color:'#ee0000' }}>Results</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        
          {results.length !== 0 ? results.map((result) => (
            <SearchResult key={result.id} result={result} />
          )) : <p style={{marginTop: '20px'}}>There is nothing in here...</p>}
        </div>
        <div style={{marginBottom: 20}}></div>
      </div>
    );
  };
  
  export default Search;
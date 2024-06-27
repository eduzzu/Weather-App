import {TextField, Stack, Autocomplete} from '@mui/material';
import { useState, useEffect } from 'react';


const Search = () => {

    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        setRecentSearches(storedSearches);
    }, []);

    const handleSearchSubmit = (event, value) => {
        if(event.key === "Enter" && value) {
            event.preventDefault();
            updateRecentSearches(value);
        }
    }

        const handleOptionSelect = (event, value) => {
            if(value) {
                updateRecentSearches(value);
            }
        }

        const updateRecentSearches = (value) => {
            if (!recentSearches.includes(value)) {
              const updatedSearches = [value, ...recentSearches.slice(0, 4)];
              setRecentSearches(updatedSearches);
              localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    }
        }  
    

  return (
    <Stack 
        spacing={2} 
        sx={{
            width: "50%",
            m: "0 auto",
            position: "absolute",
            top: 0,
            left: "50%",
            transform: 'translateX(-50%)',
            mt: "2%"
            }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={recentSearches}
        onChange={handleOptionSelect}
        renderInput={(params) => <TextField {...params} label="Search" sx={{'& .MuiOutlinedInput-root': {
                borderRadius: '20px'
              },}} onKeyDown={(event) => handleSearchSubmit(event, params.inputProps.value)} />}
      />
    </Stack>
  );
}

export default Search;
import React from "react";

const SearchBar = ({searchTerm, setSearchTerm}) =>{
    return(
        <input 
        type="text"
        placeholder="Search the recipe"
        value={searchTerm}
        onChange={(e) =>  setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
        />
    )
}
export default SearchBar
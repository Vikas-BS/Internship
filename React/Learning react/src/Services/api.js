const Api_Key="0c0fee3fa5647ecc6542b11376d4136b"
const Base_Url="https://api.themoviedb.org/3"
export const getPopularMovies = async() =>{
    const response = await fetch(`${Base_Url}/movie/popular?api_key=${Api_Key}`)
const data = await response.json()
return data.results
};


export const SearchMovies = async(query) =>{
    const response = await fetch(`${Base_Url}/search/movie?api_key=${Api_Key}&query=${encodeURIComponent(
      query)}`)
const data = await response.json()
return data.results
};
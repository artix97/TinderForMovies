import React, { useState, useEffect, createContext, useMemo, createRef } from "react";

const MoviesData = createContext()

export const MovieDataContext = ({children}) => {
  const [database, setDatabase] = useState();
 
  const [isReady, setIsReady] = useState(false)
  
  async function getData() {
    return fetch("http://localhost:8080/recommendations").then((response) =>
      response.json()
    );
  }
  useEffect(() => {
    const fetchData = async () => {
      const movieData = await getData();
      setDatabase(movieData.data);
      setIsReady(true)
    };
    fetchData();
 
},[isReady]);



if(isReady){
    return (
        <MoviesData.Provider value={{database, setDatabase}}>
            {children}
        </MoviesData.Provider> 
      )
}
  
}

export default MoviesData;

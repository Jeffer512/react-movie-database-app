import { createContext, useContext, useState } from 'react';

// Initialize the React Context
export const Context = createContext();

/**
 * Custom hook to access the global state.
 * Note: This is functionally identical to useStateContext below.
 */
export const useGlobalState = () => {
    const context = useContext(Context);
    return context;
};

/**
 * Context Provider component that wraps the application.
 * It holds the global state for searching and navigation logic.
 */
export const StateContext = ({ children }) => {
    // searchType: 'movie', 'tv', or 'person'
    const [searchType, setSearchType] = useState("movie");
    
    // query: The live string from the search input
    const [query, setQuery] = useState("");
    
    // id: The unique ID for the currently selected media/person
    const [id, setId] = useState("");
    
    // endpoint: Determines if the app should use 'search' or 'discover' (genre) logic
    const [endpoint, setEndpoint] = useState("search");

    return (
        <Context.Provider value={{ 
            searchType, query, id, endpoint, 
            setSearchType, setQuery, setId, setEndpoint 
        }}>
            {children}
        </Context.Provider>
    );
};

// The primary hook used across the app to access global state
export const useStateContext = () => useContext(Context);
import { createContext, useState, useContext, Children } from "react";

const ItemContext =createContext();

export const HouseProvider = ({ children}) =>{
    const [houses,setHouses] = useState([]);
    const addHouse = (newHouse) =>{
        setHouses((prevHouses) => [...prevHouses, newHouse]);
    }
    return (
        <ItemContext.Provider value={{houses,addHouse}}>
            {children}
        </ItemContext.Provider>
    );

};

export const useItemContext = () =>{
    return useContext(ItemContext);
};
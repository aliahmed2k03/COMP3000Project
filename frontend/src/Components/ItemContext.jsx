import { createContext, useState, useContext, Children } from "react";
import axios from "axios";
const ItemContext =createContext();

export const HouseProvider = ({ children}) =>{
    const [houses,setHouses] = useState([]);
    const addHouse = (newHouse) =>{
        setHouses((prevHouses) => [...prevHouses, newHouse]);
    }
    const removeHouse = async (houseToRemove) => {
        const username = localStorage.getItem("username");
        setHouses(prevHouses => prevHouses.filter(h => h.address !== houseToRemove.address));
        try {
            await axios.delete("http://localhost:5000/deleteHouse", {
            data: {
                username, address: houseToRemove.address
            }
            });
        } catch (err) {
            console.error("Failed to delete house from DB", err);
        }
    };

    const loadUserHouses = async (username) => {
        try {
          const res = await axios.get(`http://localhost:5000/Houses/${username}`);
          setHouses(res.data);
        } catch (err) {
          console.error("Failed to load saved houses", err);
        }
    };
    
    return (
        <ItemContext.Provider value={{houses,addHouse,removeHouse,loadUserHouses}}>
            {children}
        </ItemContext.Provider>
    );

};

export const useItemContext = () =>{
    return useContext(ItemContext);
};
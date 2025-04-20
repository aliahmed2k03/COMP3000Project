import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
} from "@vis.gl/react-google-maps";

function Location() {
    const location = useLocation(); 
    const queryParams = new URLSearchParams(location.search);
    const address = queryParams.get("address"); 

    const [coordinates, setCoordinates] = useState({ lat: 51.5, lng: 0.12 }); 

    useEffect(() => {
        console.log("the address is",address)
        if (address) {
            getCoordinates(address);
        }
    }, [address]);

    const getCoordinates = async (address) => {
        try {
            const apiKey = "AIzaSyCZPYOASUrajNHwTK2WJO2bozseJhR0g-w";
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
            );
            const data = await response.json();
            console.log(data)

            if (data.status === "OK") {
                const location = data.results[0].geometry.location;
                setCoordinates({ lat: location.lat, lng: location.lng });
            } else {
                console.error("Geocoding error:", data.status);
            }
        } catch (error) {
            console.error("Error fetching coordinates:", error);
        }
    };

    return (
        <div className="bg-gray-100 h-screen w-screen">
            <Sidebar />
            <div className="absolute top-3 left-60 right-5 h-16 px-6 py-3 bg-white shadow-lg rounded-2xl">
                <span className="absolute text-black font-bold text-4xl top-2.6 left-4 cursor-default">
                    Locations
                </span>
            </div>
            <APIProvider apiKey="AIzaSyCZPYOASUrajNHwTK2WJO2bozseJhR0g-w">
                <div className="w-[75%] h-[75vh] absolute top-26 left-70 rounded-lg">
                    <Map defaultZoom={11} defaultCenter={coordinates} mapId={"9b70925e950d7ec7"} options={{ gestureHandling: "greedy", zoomControl: true, streetViewControl: false, fullscreenControl: false }}>
                        <AdvancedMarker position={coordinates}>
                            <Pin background={"red"} />
                        </AdvancedMarker>
                    </Map>
                </div>
            </APIProvider>
        </div>
    );
}

export default Location;
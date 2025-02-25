"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from "@vis.gl/react-google-maps";


function Location(){
    const london = {lat:51.5, lng:0.12}
    return (
        <div className=" bg-gray-100 h-screen w-screen">
            <Sidebar />
            <div className="absolute top-3 left-60 right-5 h-16 px-6 py-3 bg-white shadow-lg rounded-2xl">
                <span className="absolute text-black font-bold text-4xl top-2.6 left-4 cursor-default">Locations</span>
            </div>
            <APIProvider apiKey="AIzaSyCZPYOASUrajNHwTK2WJO2bozseJhR0g-w">
                <div className="w-[75%] h-[75vh] absolute top-26 left-70 rounded-lg">
                <Map zoom={18} defaultCenter={london} options={{gestureHandling: "greedy",  zoomControl: false, streetViewControl: false,  fullscreenControl: false}}> 
                </Map>
                </div>
            </APIProvider>
        </div>
    );
};

export default Location;
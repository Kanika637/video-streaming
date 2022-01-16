import React from "react"
import {  Route,  ReactLocation } from "react-location";
import Player from "./Player";
import Home from "./Home";

export const routes: Route[] = [
    {
        path:"/",
        element:<Home/>
    },   

{
    path:"/player",
    element:<Player/>
},


];

export const location = new ReactLocation();
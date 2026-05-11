//day 4 of 4 3 hours before the day breaks and am wild and out  lol
import { io } from "socket.io-client";


const URL = "http://localhost:3000"; 

export const socket = io(URL, {
    autoConnect: true, 
    withCredentials: true 
});

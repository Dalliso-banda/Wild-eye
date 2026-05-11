import { useState, useEffect, useContext } from "react";
import { useAuth } from "../context/UserAuth"; // Adjust path to your context

export const useLocationSync = (socket) => {
  const [neighbors, setNeighbors] = useState([]);
  const { user } = useAuth(); // Assuming user object has .id and .phone

  useEffect(() => {
    if (!socket || !user) return;

    socket.on("all-user-positions", (data) => {
      // If server sends an array, set it; if it sends one user, update the list
      setNeighbors(
        Array.isArray(data)
          ? data
          : (prev) => {
              const filtered = prev.filter((u) => u.id !== data.id);
              return [...filtered, data];
            },
      );
    });

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        socket.emit("update-location", {
          userId: user.id || user._id,
          phone: user.phone, // Adding phone here
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, timeout: 10000 },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      socket.off("all-user-positions");
    };
  }, [socket, user]);

  return neighbors;
};

import React, { useEffect, useRef } from "react";
// import image from "./anon.png";
// Variables
const GMAP = "AIzaSyCVBthtEmWi0Ul8mejDQrBlOULXB1kTB3I";
const myLocation = {
  // CN Tower Landmark
  lat: 35.6762,
  lng: 139.6503
};
// styles
const mapStyles = {
  width: "100%",
  height: "100%"
};

let currentLocation;

function ResultPage(props) {
  function showMap(position) {
    // Show a map centered at (position.coords.latitude, position.coords.longitude).

    return (currentLocation = [
      position.coords.latitude,
      position.coords.longitude
    ]);
  }

  navigator.geolocation.getCurrentPosition(showMap);
  // One-shot position request.

  // refs
  const googleMapRef = React.createRef();

  // helper functions
  let createGoogleMap = null;

  let imageH =
    "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png";

  var beaches = [
    // ["user's current location", currentLocation[0], currentLocation[1]],
    ["Coogee Beach", -33.923036, 151.259052, 5],
    ["vvvv", 35.6762, 139.6503, 3],
    ["Cronulla Beach", -34.028249, 151.157507, 3],
    ["Bondi Beach", -33.890542, 151.274856, 4],
    ["new", 20, 28, 2],
    // ["hey", currentLocation[0], currentLocation[1]],
    ["Maroubra Beach", -33.950198, 151.259302, 1],
    ["Manly Beach", -33.80010128657071, 151.28747820854187, 2]
  ];

  const createMarker = (lati, long) => {
    const marker = new window.google.maps.Marker({
      position: { lat: lati, lng: long },
      label: "You",
      icon: imageH
    });
    marker.setMap(createGoogleMap);
  };

  // useEffect Hook
  useEffect(() => {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GMAP}&libraries=places`;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener("load", () => {
      createGoogleMap = new window.google.maps.Map(googleMapRef.current, {
        zoom: 12,
        center: {
          lat: currentLocation[0],
          lng: currentLocation[1]
        }
      });

      beaches.forEach(loc => {
        createMarker(loc[1], loc[2]);
      });
    });
  });

  return currentLocation ? (
    <div id="google-map" ref={googleMapRef} style={mapStyles} />
  ) : (
    <p>Wait a moment while we find events in your area..</p>
  );
}

export default ResultPage;

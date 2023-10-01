"use client";

import {DirectionsRenderer, GoogleMap, LoadScript, Marker, MarkerClusterer} from "@react-google-maps/api";
import {useEffect, useMemo, useState} from "react";
import MapOptions = google.maps.MapOptions;
import LatLngLiteral = google.maps.LatLngLiteral;
import Distance from "@/components/ui/distance";

type DirectionsResult = google.maps.DirectionsResult;

const GoogleMapView = () => {

    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [directions, setDirections] = useState<DirectionsResult>();

    useEffect(() => {
        getUserLocation();
    }, []);

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                console.log(pos)
                return setUserLocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const mapContainerStyle = {
        width: '100%',
        height: '70vh',
    };

    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!key) {
        throw new Error('Google token is not set');
    }

    const des = useMemo<LatLngLiteral>(() => ({lat: -8.1582329, lng: 113.7049598}), []);
    const options = useMemo<MapOptions>(
        () => ({
            disableDefaultUI: true,
            clickableIcons: false,
        }),
        []
    );

    const fetchDirections = (des: LatLngLiteral) => {
        if (!userLocation) return;

        const service = new google.maps.DirectionsService();
        service.route(
            {
                origin: userLocation,
                destination: des,
                travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === "OK" && result) {
                    setDirections(result);
                }
            }
        )
    }

    return (
        <div>
            <LoadScript googleMapsApiKey={key}>
                {directions && <Distance leg={directions.routes[0].legs[0]} />}
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={des}
                    zoom={14}
                    options={options}
                >
                    {/*Directions Section*/}
                    {directions &&
                        <DirectionsRenderer
                            directions={directions}
                            options={{
                                polylineOptions: {
                                    zIndex: 50,
                                    strokeColor: "#1976D2",
                                    strokeWeight: 5,
                                }
                            }}
                        />
                    }

                    {userLocation && (
                        <>
                            <Marker
                                position={userLocation}
                            />
                            <MarkerClusterer>
                                {clusturer => des && (
                                    <Marker
                                        position={des}
                                        clusterer={clusturer}
                                        onClick={() => {
                                            fetchDirections(des)
                                        }}
                                    />
                                )
                                }
                            </MarkerClusterer>

                        </>
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}

export default GoogleMapView;
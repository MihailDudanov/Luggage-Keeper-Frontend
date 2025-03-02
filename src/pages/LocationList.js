import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LocationList() {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/location');
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching locations', error);
            }
        };

        fetchLocations();
    }, []);

    useEffect(() => {
        if (window.google) {
            const map = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: 41.1158647, lng: 20.8001276 }, // Adjust the center point
                zoom: 12,
            });

            locations.forEach(location => {
                new window.google.maps.Marker({
                    position: { lat: location.latitude, lng: location.longitude },
                    map: map,
                    title: location.name,
                });
            });
        }
    }, [locations]);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Locations</h2>
            <br></br>
            <br></br>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <iframe
                        title="Map of Apartments Dudanovi"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3005.854677102756!2d20.800127575904103!3d41.115864771335694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1350dca19dcd2bf7%3A0xc0a62af60b4c710c!2sApartments%20Dudanovi!5e0!3m2!1sen!2smk!4v1738528308369!5m2!1sen!2smk"
                        width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className="col-md-6 mb-3">
                    <iframe
                        title="Map of GLP Rent a Car"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2964.8950827199133!2d21.40654988586904!3d42.00252716371897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135414447b52b609%3A0x6cb47d403ac746d2!2sGLP%20RENT%20A%20CAR%20%26%20TRANSPORT%2C%20Nikola%20Tesla%204%2C%20Skopje%201000!5e0!3m2!1sen!2smk!4v1738528962406!5m2!1sen!2smk"
                        width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>

            <div className="row justify-content-between">
                {locations.map((location) => (
                    <div key={location.id} className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{location.name}</h5>
                                <p className="card-text">{location.address}</p>
                                <p className="card-text">Capacity: {location.capacity}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div id="map" style={{ width: '100%', height: '400px' }}></div>
        </div>
    );
}

export default LocationList;

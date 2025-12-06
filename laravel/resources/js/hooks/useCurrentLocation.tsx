import React, { useState } from 'react';

const LocationWithoutAPI: React.FC = () => {
    const [location, setLocation] = useState<{
        latitude: number | null;
        longitude: number | null;
    }>({ latitude: null, longitude: null });

    const [error, setError] = useState<string>('');

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                (err) => {
                    setError(err.message);
                },
            );
        } else {
            setError('Geolocation is not supported by your browser.');
        }
    };

    return (
        <div>
            <h1>Geolocation Without API</h1>
            <button onClick={getLocation}>Get Location</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {location.latitude && location.longitude && (
                <div>
                    <p>
                        <strong>Latitude:</strong> {location.latitude}
                    </p>
                    <p>
                        <strong>Longitude:</strong> {location.longitude}
                    </p>
                </div>
            )}
        </div>
    );
};

export default LocationWithoutAPI;

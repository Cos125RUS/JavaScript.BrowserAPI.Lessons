console.log(navigator.userAgent);
console.log(navigator.cookieEnabled);
console.log(navigator.doNotTrack);
console.log(navigator.geolocation);
console.log('================================================================');

const calculateDistance = (location1, location2) => {
    const [lat1, lon1] = location1;
    const [lat2, lon2] = location2;

    const toRad = value => (value * Math.PI) / 180;
    const R = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.pow(Math.sin(dLon / 2), 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    
    return distance;
}

const findFastestCity = (cities) => {
    return new Promise((resolve, reject) => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                const userLocation = [position.coords.latitude, position.coords.longitude];
                let closestCity = null;
                let shortestDistance = Infinity;
                cities.forEach((city) => {
                    const distance = calculateDistance(userLocation, city.location);
                    if (distance < shortestDistance) {
                        closestCity = city.name;
                        shortestDistance = distance;
                    }
                });
                resolve(closestCity);           
            },
            err => {
                if(err.code === err.PERMISSION_DENIED) {
                    reject(new Error('User denied access to location'));
                } else {
                    reject(new Error('Find geolocation error')); 
                }
            }
        );
        } else {
            reject(new Error('Your browser not supported geolocation'));
        }
    });
}



const cities = [
    { name: 'New York', location: [40.7128, -74.0060] },
    { name: 'London', location: [51.5074, -0.1278] },
    { name: 'Tokyo', location: [35.6895, 139.6917] },
    { name: 'Moscow', location: [55.751244, 37.618423] }
];

findFastestCity(cities)
    .then(closestCity => console.log(closestCity))
    .catch(err => console.error(err.message));
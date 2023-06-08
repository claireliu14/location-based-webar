
window.addEventListener("gps-camera-update-position", async (event) => {
    if (map === undefined) {
        return;
    }
    console.log('gps-camera-update-position')


    let cameraMarker
    const position = event.detail.position
    const pos = {
        lat: position.latitude,
        lng: position.longitude,
    }

    if (cameraMarker == undefined) {
        const image =
            "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
        cameraMarker = new google.maps.Marker({
            position: pos,
            map: map,
            icon: image
        })
        console.log(cameraMarker)
    } else {
        cameraMarker.setPosition(pos)
    }
})

let map
let userMarker
const positionOptions = { enableHighAccuracy: true }
const errorCallback = (error) => console.log(error)
const successCallback = (position) => {
    const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
    }
    if (userMarker == undefined) {
        userMarker = new google.maps.Marker({
            position: pos,
            map: map,
            zIndex: 1
        })
        map.setCenter(pos)
    } else {
        userMarker.setPosition(pos)
    }
}

function initMap() {
    const mapOptions = {
        zoom: 20,
        center: { lat: 25.033708, lng: 121.564899 },
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: false
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions)
    const id = navigator.geolocation.watchPosition(successCallback, errorCallback, positionOptions)
}
/**
 * Created by xiajun on 2017/11/29.
 */

export const appConfig = {
    URL: '../rsms_2.0',
    PAGE: {
        itemsPerPage: 10
    }
};

export const mapSetting = {
    styleJson:[
        {
            "featureType": "land",
            "elementType": "geometry",
            "stylers": {
                "color": "#242731",
                "visibility": "on"
            }
        },
        {
            "featureType": "building",
            "elementType": "geometry",
            "stylers": {
                "color": "#39476d",
                "weight": "1",
                "lightness": -73,
                "saturation": -100,
                "visibility": "off"
            }
        },
        {
            "featureType": "highway",
            "elementType": "all",
            "stylers": {
                "color": "#6b7796",
                "hue": "#3d85c6",
                "lightness": -50,
                "saturation": -80,
                "visibility": "on"
            }
        },
        {
            "featureType": "arterial",
            "elementType": "geometry",
            "stylers": {
                "color": "#6b7796",
                "hue": "#3177c8",
                "weight": "1",
                "lightness": -60,
                "saturation": -85,
                "visibility": "on"
            }
        },
        {
            "featureType": "green",
            "elementType": "geometry",
            "stylers": {
                "color": "#111419",
                "visibility": "on"
            }
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": {
                "color": "#111419",
                "visibility": "on"
            }
        },
        {
            "featureType": "subway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#181818",
                "visibility": "off"
            }
        },
        {
            "featureType": "railway",
            "elementType": "geometry",
            "stylers": {
                "lightness": -52,
                "visibility": "off"
            }
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#313131"
            }
        },
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#6b7796"
            }
        },
        {
            "featureType": "manmade",
            "elementType": "geometry",
            "stylers": {
                "color": "#242731",
                "visibility": "on"
            }
        },
        {
            "featureType": "local",
            "elementType": "geometry",
            "stylers": {
                "color": "#6b7796",
                "weight": "0.4",
                "lightness": -60,
                "saturation": -80,
                "visibility": "on"
            }
        },
        {
            "featureType": "subway",
            "elementType": "geometry",
            "stylers": {
                "lightness": -65,
                "visibility": "off"
            }
        },
        {
            "featureType": "railway",
            "elementType": "all",
            "stylers": {
                "lightness": -40,
                "visibility": "off"
            }
        },
        {
            "featureType": "boundary",
            "elementType": "geometry",
            "stylers": {
                "color": "#8b8787",
                "weight": "1",
                "lightness": -29,
                "visibility": "on"
            }
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }
    ]
};

export const typeMap = {
    deviceType: {
        '0':'智能抄表',
        '1':'手工抄表'
    }
};
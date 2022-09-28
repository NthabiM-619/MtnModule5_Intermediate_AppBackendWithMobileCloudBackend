//import libraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions,TouchableOpacity,Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import ServiceList from './services';
import Loader from '../Loader';
import Carousel from 'react-native-snap-carousel';
// import { TouchableOpacity } from 'react-native-web';
import { MaterialIcons } from '@expo/vector-icons';

// create a component
const Details = () => {
    const company = Services
    let refCarousel = null
    const [currentLocation, setCurrentLocation] = useState(null);
    
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location);
        })();
    }, []);

    const RenderMarker = () => {
        // console.log(Services[0].coord['']);
        return (
            <View>
                {
                    company.map((marker, index) => {
                        return (
                            <Marker
                                key={index}
                                coordinate={{ latitude: marker.coord['latitude'], longitude: maker.coord['longitude'] }}
                                title={marker.name}
                                image={marker.avatar}
                            />
                        )

                    })
                }
            </View>

        )
    }

    const renderCard = ({ item, index }) => {
        return (
            <View style={{ backgroundColor: 'cream', borderRadius: 18, padding: 12, height: 160, display: 'flex', flexDirection: 'row' }}>
        <View style={{ margin: 12 }} >
          <Text style={{ fontSize: 20, width: Dimensions.get('window').width / 2, }}>{item.name}</Text>
          <Text style={{ fontSize: 18, fontWeight: '100' }}>{item.category}</Text>
          <Text style={{ fontSize: 16, color: '#fed8b1' }}>Reviews {item.review} <MaterialIcons name="star-rate" size={18} color="#fed8b1" /></Text>
          <View style={{ position: 'absolute', bottom: 0,display:'flex',flexDirection:"row",margin:4 }}>
            <TouchableOpacity style={{
              backgroundColor: "#333366",
              width: Dimensions.get('window').width / 3,
              height:30,
              alignItems: 'center',
              justifyContent:'center',
              borderRadius:5,
              // margin:5
              marginTop:10,

              
            }}><Text style={{color:'cream'}}>Book</Text>
            </TouchableOpacity>
            
          </View>
        </View>
        <View style={{ backgroundColor: '#ecd0d0', height: 60, borderRadius: 4, margin: 10, alignItems: "center" }}>
          <Image style={{ resizeMode: 'contain', width: 40, height: 60 }} source={item.avatar} />
        </View>
       
      </View>
        )
    }

    return (

        <View style={styles.container}>
            {company != null

                ? <View>
                    <MapView style={styles.map}
                        initialRegion={{
                            latitude: -26.106737,
                            longitude: 28.106655,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        showsUserLocation={true}
                    >
                        <RenderMarker />
                    </MapView>

                    <View>
                        <Carousel
                            ref={(c) => { refCarousel = c; }}
                            data={companies}
                            renderItem={renderCard}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={300}
                            containerCustomStyle={styles.carousel}

                        />
                    </View>

                </View>


                : <Loader />

            }

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // ...StyleSheet.absoluteFillObject,
        height: '100%',

    },
    map: {
        // ...StyleSheet.absoluteFillObject,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    carousel: {

        position: 'absolute',
        bottom: 0,
        height: Dimensions.get('window').height /3,
    }
});

//make this component available to the app
export default Details;
 
  
    
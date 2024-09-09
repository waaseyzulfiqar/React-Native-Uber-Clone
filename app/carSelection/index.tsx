import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Button,
  Alert,
} from "react-native";

import MapView, { Marker } from "react-native-maps";

import * as Location from "expo-location";

import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const params = useLocalSearchParams();
  console.log(params);

  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [fare, setFare] = useState<any>();


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setLocation(location);

      // Location.watchPositionAsync(
      //   { accuracy: 6, distanceInterval: 1, timeInterval: 2000 },
      //   (location) => {
      //     setLocation(location);
      //   }
      // );
    })();
  }, []);

  const rates: { [key: string]: number } = {
    bike: 70,
    rickshaw: 110,
    mini: 170,
    AcCar: 224,
  };

  function calculateFare(vehicle: any) {
    const baseFare = rates[vehicle];
    const distance = calcCrow(
      Number(params.pickupLatitude),
      Number(params.pickupLongitude),
      Number(params.dropoffLatitude),
      Number(params.dropoffLongitude)
    );
    console.log("basefare ===> ", baseFare);
    console.log("distance ===> ", distance);
    const fare = baseFare * distance;
    console.log("fare ===> ", fare);
    setFare(Math.round(fare));


  Alert.alert(
    "Estimated Fare!",
    `Your Est. fare will be ${Math.round(fare)}`,
    [
      { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]
  );
  
  }

  // calcualte fares

  function calcCrow(lat1:number, lon1:number, lat2:number, lon2:number) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  function toRad(Value: any) {
    return (Value * Math.PI) / 180;
  }

  return (
    <View style={styles.container}>
      {/*   
        {params && <View style={{marginLeft: 10, marginTop:10}}>
          <Text style={{marginBottom: 10}}>Pickup Location : {params.pickupAddress || params.pickupName}</Text>
          <Text>Dropoff Location : {params.dropoffAddress || params.dropoffName}</Text>
        </View>} */}

      {location && (
        <MapView
          style={styles.mapview}
          region={{
            latitude: Number(params.pickupLatitude), // Convert to number
            longitude: Number(params.pickupLongitude), // Convert to number
            latitudeDelta: 0.15,
            longitudeDelta: 0.15,
          }}
        >
          <Marker
            coordinate={{
              latitude: Number(params.pickupLatitude), // Converts the string to a number
              longitude: Number(params.pickupLongitude), // Converts the string to a number
            }}
            title={params.pickupName ? String(params.pickupName) : undefined} // Convert to string or undefined if necessary
          />

          <Marker
            coordinate={{
              latitude: Number(params.dropoffLatitude), // Converts the string to a number
              longitude: Number(params.dropoffLongitude), // Converts the string to a number
            }}
            title={params.dropoffName ? String(params.dropoffName) : undefined} // Convert to string or undefined if necessary
          />
        </MapView>
      )}

      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <TouchableOpacity
          style={{ marginBottom: 2, width: "100%" }}
          onPress={() => calculateFare("bike")}
        >
          <Text
            style={{
              backgroundColor: "#4169E1",
              color: "#ffffff",
              padding: 18,
              textAlign: "center",
            }}
          >
            Bike
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginBottom: 2, width: "100%" }}
          onPress={() => calculateFare("rickshaw")}
        >
          <Text
            style={{
              backgroundColor: "#4169E1",
              color: "#ffffff",
              padding: 18,
              textAlign: "center",
            }}
          >
            Rickshaw
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginBottom: 2, width: "100%" }}
          onPress={() => calculateFare("mini")}
        >
          <Text
            style={{
              backgroundColor: "#4169E1",
              color: "#ffffff",
              padding: 18,
              textAlign: "center",
            }}
          >
            Mini
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ width: "100%" }}
          onPress={() => calculateFare("AcCar")}
        >
          <Text
            style={{
              backgroundColor: "#4169E1",
              color: "#ffffff",
              padding: 18,
              textAlign: "center",
            }}
          >
            Ac Car
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapview: {
    width: "100%",
    height: "100%",
  },
});

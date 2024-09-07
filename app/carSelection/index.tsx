import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Button
  } from "react-native";
  
  
  import { router, useLocalSearchParams } from "expo-router";
  
  export default function HomeScreen() {

    const params = useLocalSearchParams()
    console.log(params);
  
    return (
      <View style={styles.container}>
  
        {params && <View style={{marginLeft: 10, marginTop:10}}>
          <Text style={{marginBottom: 10}}>Pickup Location : {params.pickupAddress || params.pickupName}</Text>
          <Text>Dropoff Location : {params.dropoffAddress || params.dropoffName}</Text>
        </View>}
  
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    mapview: {
      width: "100%",
      height: "80%",
    },
  });
  
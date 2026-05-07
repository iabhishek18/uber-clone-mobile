import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

export default function HomeScreen({ navigation }: any) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [destination, setDestination] = useState('');
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  const handleSearch = () => {
    if (destination.trim()) {
      navigation.navigate('Ride', { destination, pickup: location?.coords });
    }
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
        >
          <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }} title="You are here" />
        </MapView>
      )}
      <View style={styles.searchContainer}>
        <Text style={styles.greeting}>Where to?</Text>
        <TextInput style={styles.input} placeholder="Enter destination" value={destination} onChangeText={setDestination} onSubmitEditing={handleSearch} />
        <View style={styles.rideTypes}>
          {['Economy', 'Premium', 'XL'].map((type) => (
            <TouchableOpacity key={type} style={styles.rideType}>
              <Text style={styles.rideTypeText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  searchContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 10 },
  greeting: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  input: { backgroundColor: '#f0f0f0', padding: 14, borderRadius: 8, fontSize: 16 },
  rideTypes: { flexDirection: 'row', marginTop: 16, gap: 10 },
  rideType: { flex: 1, padding: 12, backgroundColor: '#f8f8f8', borderRadius: 8, alignItems: 'center' },
  rideTypeText: { fontWeight: '600' },
});

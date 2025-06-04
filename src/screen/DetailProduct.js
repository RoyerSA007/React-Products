import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Button } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';

export default function DetailProducts ({route, navigation}) {  
    const { products } = route.params;
    const [esFavorito, setEsFavorito] = useState(false);

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.titleTexto}>{products.title}</Text>
                </View>
                <TouchableOpacity onPress={() => setEsFavorito(!esFavorito)} style={styles.corazonContainer}>
                    <Text style={styles.corazon}> {esFavorito ? "❤️" : "🤍"} </Text>
                </TouchableOpacity>
            </View>
            <Image source={{ uri: products.image }} style={styles.image}/>
            <Text>{products.price}</Text>
            <Text>{products.description}</Text>
            <Text>{products.category}</Text>
            <Text>{products.rating.rate} ({products.rating.count})</Text>
            <Button title="Agregar al carrito" onPress={() => navigation.navigate('Carrito')}/>
            <Button title="Catalogo" onPress={() => navigation.goBack()}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
        backgroundColor: "#00a1fb"
    },
    cardContainer: {
        backgroundColor: "#c1c1c1",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        margin: 20
    },
    image: {
        height: 200,
        width: 200,

    },
    errorStyle: {
        color: "red",
        fontSize: 10
    },
    card: {
        marginBottom: 20,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: '#ddd',
        borderWidth: 1
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10 
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 10,
        alignItems: "center",
    },
    titleTexto: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    corazonContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    corazon: {
        fontSize: 24,
    }
})
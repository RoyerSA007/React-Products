import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from "react-native";

export default function ProductListinScreen({ navigation }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = () => {
        const URL = "https://fakestoreapi.com/products";

        fetch(URL)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Algo malo ha pasado en la conexión");
                }
                return res.json();
            })
            .then((data) => {
                setProducts(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setIsLoading(false);
            });
    };

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => navigation.navigate('ProductsDetail', { products: item })}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>
                {item.title}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>Productos</Text>
            {isLoading ? (
                <ActivityIndicator color="red" size="large" />
            ) : error ? (
                <Text style={styles.errorStyle}>{error}</Text>
            ) : (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderProduct}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: "#00a1fb"
    },
    cardContainer: {
        backgroundColor: "#c1c1c1",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        margin: 10
    },
    image: {
        height: 200,
        width: 200,
    },
    errorStyle: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
        marginTop: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        textAlign: "center"
    }
});

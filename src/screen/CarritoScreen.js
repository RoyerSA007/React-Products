import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { CarritoContext } from "../context/carritoContext";

export default function CarritoScreen() {
    const { carritoItems } = useContext(CarritoContext);

    const groupedItems = carritoItems.reduce((acc, item) => {
        const existing = acc.find(i => i.id === item.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            acc.push({ ...item, quantity: 1 });
        }
        return acc;
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <View>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemQuantity}>Cantidad: {item.quantity}</Text>
                </View>
                <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Carrito</Text>
            <FlatList
                data={groupedItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={styles.empty}>El carrito está vacío</Text>}
                showsVerticalScrollIndicator={false}
                style={styles.list}
            />
            {carritoItems.length > 0 && (
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Comprar</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    list: {
        flexGrow: 0,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemImage: {
        width: 60,
        height: 60,
        marginRight: 15,
        borderRadius: 8,
        backgroundColor: "#eee",
    },
    itemDetails: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    itemPrice: {
        fontSize: 14,
        color: "#007aff",
        marginTop: 5,
    },
    button: {
        backgroundColor: "#007aff",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
    empty: {
        fontSize: 16,
        textAlign: "center",
        color: "#888",
        marginTop: 50,
    },
    itemTotal: {
        fontSize: 14,
        color: "#555",
        marginTop: 3,
    },
    itemQuantity: {
    fontSize: 14,
    color: "#888",
    },
});

import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { CarritoContext } from "../context/carritoContext";

export default function DetailProducts({ route, navigation }) {
    const { products } = route.params;
    const [esFavorito, setEsFavorito] = useState(false);
    const { addToCarrito } = useContext(CarritoContext);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Text style={styles.title}>{products.title}</Text>
                <TouchableOpacity onPress={() => setEsFavorito(!esFavorito)}>
                    <Text style={styles.heart}>{esFavorito ? "❤️" : "🤍"}</Text>
                </TouchableOpacity>
            </View>

            <Image source={{ uri: products.image }} style={styles.image} resizeMode="contain" />
            <Text style={styles.price}>${products.price.toFixed(2)}</Text>
            <Text style={styles.category}>{products.category.toUpperCase()}</Text>
            <Text style={styles.description}>{products.description}</Text>
            <Text style={styles.rating}>⭐ {products.rating.rate} ({products.rating.count} reviews)</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button}
                    onPress={() => { 
                      addToCarrito(products);
                      navigation.navigate("Carrito");}} >
                    <Text style={styles.buttonText}>Agregar al carrito</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.outlinedButton]}
                    onPress={() => navigation.goBack()}>
                    <Text style={[styles.buttonText, styles.outlinedButtonText]}>Volver al catálogo</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40,
    backgroundColor: "#f9f9f9",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginRight: 10,
  },
  heart: {
    fontSize: 28,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#100aff",
    marginBottom: 10,
  },
  category: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#444",
    textAlign: "justify",
    marginBottom: 20,
  },
  rating: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#007aff",
    marginBottom: 15,
    alignItems: "center",
  },
  outlinedButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#007aff",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  outlinedButtonText: {
    color: "#007aff",
  },
});

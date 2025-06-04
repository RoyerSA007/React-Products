import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Dimensions} from "react-native";

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
        onPress={() => navigation.navigate("ProductsDetail", { products: item })}>
        
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
        <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Tienda</Text>
        {isLoading ? (
            <ActivityIndicator color="#007aff" size="large" />
        ) : error ? (
            <Text style={styles.errorStyle}>{error}</Text>
        ) : (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderProduct}
            contentContainerStyle={styles.productList}
            
            //numColumns={2}
            //columnWrapperStyle={{ justifyContent: 'space-between' }}

        />
      )}
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 16,
    paddingTop: 10,
    marginBottom: 40,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    alignSelf: "center",
  },
  productList: {
    paddingBottom: 20,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
    //width: (width / 2) - 24,
  },
  image: {
    width: width * 0.6,
    height: 180,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#100aff",
  },
  errorStyle: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

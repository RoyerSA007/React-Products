import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CarritoScreen from "../screen/CarritoScreen";
import DetailProduct from "../screen/DetailProduct";
import ProductListinScreen from "../screen/ProductListinScreen";

const Stack = createNativeStackNavigator();

export default function NavigationProducts() {
    return (
        <Stack.Navigator initialRouteName="Products">
            <Stack.Screen name="Products" component={ProductListinScreen}/>
            <Stack.Screen name="ProductsDetail" component={DetailProduct}/>
            <Stack.Screen name="Carrito" component={CarritoScreen}/>
        </Stack.Navigator>
    )
}
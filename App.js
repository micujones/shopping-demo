// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Firebase Exports
import { db } from './src/firebaseConfig';

// Components
import ShoppingLists from './components/ShoppingLists';
import Welcome from './components/Welcome';

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="ShoppingLists">
                    {/* Passes in additional props */}
                    {(props) => <ShoppingLists db={db} {...props} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

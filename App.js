// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Database
import { auth, db } from './src/firebaseConfig';

// Components
import ShoppingLists from './components/ShoppingLists';
import Welcome from './components/Welcome';

const App = () => {
    // // Firebase configuration
    // const firebaseConfig = {
    //     apiKey: 'AIzaSyCbH-WKNFtu5s5FVQPnrig535KSVaTec9A',
    //     authDomain: 'shopping-list-demo-cdec0.firebaseapp.com',
    //     projectId: 'shopping-list-demo-cdec0',
    //     storageBucket: 'shopping-list-demo-cdec0.firebasestorage.app',
    //     messagingSenderId: '731358085149',
    //     appId: '1:731358085149:web:53cba2c58c516f7f8886f4',
    // };

    // // Initialize Firebase
    // const app = initializeApp(firebaseConfig);

    // // Initialize Cloud Firestore
    // const db = getFirestore(app);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                {/* <Stack.Screen name="Welcome" component={Welcome} /> */}
                <Stack.Screen name="Welcome">
                    {/* Passes in additional props */}
                    {(props) => <Welcome auth={auth} {...props} />}
                </Stack.Screen>
                <Stack.Screen name="ShoppingLists">
                    {/* Passes in additional props */}
                    {(props) => <ShoppingLists db={db} {...props} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

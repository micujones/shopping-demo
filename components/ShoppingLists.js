import {
    StyleSheet,
    FlatList,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { collection, getDocs, addDoc, onSnapshot } from 'firebase/firestore';

const ShoppingLists = ({ db }) => {
    const [lists, setLists] = useState([]);
    const [listName, setListName] = useState('');
    const [item1, setItem1] = useState('');
    const [item2, setItem2] = useState('');

    // const fetchShoppingLists = async () => {
    //     const listsDocuments = await getDocs(collection(db, 'shoppinglists'));
    //     let newLists = [];
    //     listsDocuments.forEach((docObject) =>
    //         newLists.push({ id: docObject.id, ...docObject.data() })
    //     );
    //     setLists(newLists);
    // };

    const addShoppingList = async (newList) => {
        const newListRef = await addDoc(
            collection(db, 'shoppinglists'),
            newList
        );

        if (newListRef.id) {
            setLists([newList, ...lists]);
            Alert.alert(`The list "${listName}" has been added.`);
        } else {
            Alert.alert('Unable to add. Please try later');
        }
    };

    useEffect(() => {
        // fetchShoppingLists();

        const unsubShoppingLists = onSnapshot(
            collection(db, 'shoppinglists'),
            (documentsSnaphot) => {
                let newLists = [];
                documentsSnaphot.forEach((doc) => {
                    newLists.push({ id: doc.id, ...doc.data() });
                });
                setLists(newLists);
            }
        );

        // Clean up code
        return () => {
            if (unsubShoppingLists) unsubShoppingLists();
        };
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.listsContainer}
                data={lists}
                renderItem={({ item }) => (
                    <Text style={styles.listItem}>
                        {item.name}: {item.items.join(', ')}
                    </Text>
                )}
            />
            <View style={styles.listForm}>
                <TextInput
                    style={styles.listName}
                    placeholder="List Name"
                    value={listName}
                    onChangeText={setListName}
                />
                <TextInput
                    style={styles.item}
                    placeholder="Item #1"
                    value={item1}
                    onChangeText={setItem1}
                />
                <TextInput
                    style={styles.item}
                    placeholder="Item #2"
                    value={item2}
                    onChangeText={setItem2}
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        const newList = {
                            name: listName,
                            items: [item1, item2],
                        };
                        addShoppingList(newList);
                    }}
                >
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>
            {Platform.OS === 'ios' ? (
                <KeyboardAvoidingView behavior="padding" />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listItem: {
        height: 70,
        justifyContent: 'center',
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#AAA',
        flex: 1,
        flexGrow: 1,
    },
    listForm: {
        flexBasis: 275,
        flex: 0,
        margin: 15,
        padding: 15,
        backgroundColor: '#CCC',
    },
    listName: {
        height: 50,
        padding: 15,
        fontWeight: '600',
        marginRight: 50,
        marginBottom: 15,
        borderColor: '#555',
        borderWidth: 2,
    },
    item: {
        height: 50,
        padding: 15,
        marginLeft: 50,
        marginBottom: 15,
        borderColor: '#555',
        borderWidth: 2,
    },
    addButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#000',
        color: '#FFF',
    },
    addButtonText: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 20,
    },
});

export default ShoppingLists;

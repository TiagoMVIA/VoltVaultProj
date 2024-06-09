import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, LogBox } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import MainView from '../components/MainView';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import DropDown from 'react-native-paper-dropdown';
import TypeList from '../mock/TypeList.json';
import StatusList from '../mock/StatusList.json';
import { getDBConnection, addChargingPoint } from '../database/Database';

LogBox.ignoreLogs(['Warning: TextInput.Icon: Support for defaultProps']);

const ChargingPoint = () => {
    const route = useRoute();
    const navigation: any = useNavigation();

    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("");
    const [showType, setShowType] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [type, setType] = useState("");

    const handleAddChargingPoint = async () => {
        const db = await getDBConnection();
        await addChargingPoint(db, location, type, status);
        navigation.navigate('Home');
    };

    useFocusEffect(
        React.useCallback(() => {
            setStatus('')
            setType('')
            setLocation('')
        }, [])
    );

    return (
        <MainView title={'ADD CHARGING POINT'}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    label="Add location"
                    value={location}
                    onChangeText={text => setLocation(text)}
                    outlineColor="#bbb"
                    textColor="#555"
                    selectionColor="#fff"
                />
                <View style={styles.dropdown}>
                    <DropDown
                        label={"Type"}
                        mode={"outlined"}
                        visible={showType}
                        showDropDown={() => setShowType(true)}
                        onDismiss={() => setShowType(false)}
                        value={type}
                        setValue={setType}
                        list={TypeList}
                    />
                </View>
                <DropDown
                    label={"Status"}
                    mode={"outlined"}
                    visible={showStatus}
                    showDropDown={() => setShowStatus(true)}
                    onDismiss={() => setShowStatus(false)}
                    value={status}
                    setValue={setStatus}
                    list={StatusList}
                />
            </View>
            <Button
                disabled={!status || !type || !location}
                style={styles.btnAdd}
                mode="contained"
                onPress={handleAddChargingPoint}
            >
                Add Charging point
            </Button>
        </MainView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
    },
    container: {
        flex: 1,
    },
    btnAdd: {
        borderRadius: 10,
        padding: 5,
        marginBottom: 60,
    },
    dropdown: {
        marginBottom: 10
    }
});

export default ChargingPoint;

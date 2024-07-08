import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, LogBox, TouchableOpacity } from 'react-native';
import { TextInput, Button, Dialog, Portal } from 'react-native-paper';
import MainView from '../components/MainView';
import { useRoute, useNavigation } from '@react-navigation/native';
import DropDown from 'react-native-paper-dropdown';
import TypeList from '../mock/TypeList.json';
import StatusList from '../mock/StatusList.json';

LogBox.ignoreLogs(['Warning: TextInput.Icon: Support for defaultProps']);

const EditChargingPoint = () => {
  const route = useRoute();
  const navigation: any = useNavigation();

  const { item }: any = route.params;

  const [location, setLocation] = useState(item.location);
  const [status, setStatus] = useState(item.status);
  const [showType, setShowType] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [type, setType] = useState(item.type);
  const [visible, setVisible] = useState(false);

  const handleEditChargingPoint = () => {
    console.log('bd')
  };

  const handleDeleteChargingPoint = () => {
    console.log('bd')
  };

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <MainView>
      <View style={styles.container}>
        <Text style={styles.title}>EDIT CHARGING POINT</Text>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Location"
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
        onPress={handleEditChargingPoint}
      >
        Save Changes
      </Button>
      <TouchableOpacity style={styles.btnDelete} onPress={showDialog}>
        <Text style={{ color: 'red', textAlign: 'center' }}>Delete Charging Point</Text>
      </TouchableOpacity>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Confirmation</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete this charging point?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleDeleteChargingPoint}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </MainView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
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
    marginBottom: 10,
  },
  btnDelete: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
  },
  dropdown: {
    marginBottom: 10
  }
});

export default EditChargingPoint;

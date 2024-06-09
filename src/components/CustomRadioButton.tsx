import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

interface CustomRadioButtonProps {
  label: string;
  value: string;
  status: 'checked' | 'unchecked';
  onPress: () => void;
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({ label, value, status, onPress }) => (
  <View style={styles.container}>
    <RadioButton.Android
      value={value}
      status={status}
      onPress={onPress}
    />
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
  },
});

export default CustomRadioButton;

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

interface CustomOptionProps {
    text: string;
    onPress: any;
}

const CustomOption: React.FC<CustomOptionProps> = (props) => {
    return (
        <View style={styles.customOptionContainer}>
            <LinearGradient
                colors={['#2fd67d', '#40edb1']}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <TouchableOpacity onPress={props.onPress} style={styles.option}>

                    <Text style={styles.optionLabel}>
                        {props.text}
                    </Text>
                    <Icon name={'lightning-bolt'} size={20} color={'#414a4c'} />
                </TouchableOpacity>
            </LinearGradient>
        </View>

    )
}

const styles = StyleSheet.create({
    customOptionContainer: {
        marginVertical: 10
    },
    option: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    optionLabel: {
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },
    gradient: {
        borderRadius: 8
    }

})

export default CustomOption;

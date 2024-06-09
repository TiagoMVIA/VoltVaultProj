import { DefaultTheme } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    roundness: 5,
    colors: {
        ...DefaultTheme.colors,
        primary: '#75b05b',
        accent: '#75b05b',
        background: '#eee', // Change the background color
        text: '33cc33', // Change the default text color
        placeholder: '33cc33', // Change the placeholder color (inactive label)
    },
    // Define default props for components
    TextInput: {
        mode: 'outlined',
        style: {
            // Style for the TextInput component
            color: '33cc33', // Change the text color inside the input
        },
        theme: {
            colors: {
                primary: '#3498db',
                text: '33cc33', // Change the label color (active and inactive)
                placeholder: '33cc33', // Change the placeholder color (inactive label)
                background: '#3f423f', // Change the background color
            },
        },
    },
};

export default theme;

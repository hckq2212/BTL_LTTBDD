import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

const SuccessIcon = () => {
    return (
        <View style={styles.container}>
            <Svg height="100" width="100" viewBox="0 0 100 100">
                <Circle cx="50" cy="50" r="45" stroke="#90EE90" strokeWidth="2" fill="#90EE90" />
                <Line x1="35" y1="50" x2="45" y2="60" stroke="white" strokeWidth="3" />
                <Line x1="45" y1="60" x2="70" y2="35" stroke="white" strokeWidth="3" />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#f7f8fa',
        margin: 40,
    },
});

export default SuccessIcon;

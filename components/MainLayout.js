import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FooterNav from './FooterNav';

const MainLayout = ({ children }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.screen}>{children}</View>
            <FooterNav navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    screen: {
        flex: 1,
    },
});

export default MainLayout;

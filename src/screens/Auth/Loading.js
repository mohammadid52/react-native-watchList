import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAuth} from '../../context/UserContext';

const Loading = ({navigation}) => {
  const {user} = useAuth();
  useEffect(() => {
    navigation.navigate(user ? 'HomeStack' : 'Get_Started');
  }, []);

  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});

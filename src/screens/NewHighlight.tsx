import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {StackParamList} from '../types';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {useHighlights} from '../useHighlights';

type Props = StackScreenProps<StackParamList, 'NewHighlight'>;

export const NewHighlight = ({route}: Props) => {
  const level = route.params.level;

  const {addHighlight} = useHighlights();
  const [name, setName] = useState('');

  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const onAddHighlight = () => {
    if (name.length > 2) {
      addHighlight({name, level});
      navigation.replace('Highlights');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Game over</Text>
        <TextInput
          value={name}
          onChangeText={txt => setName(txt)}
          placeholder="Enter your name"
          style={styles.input}
        />
        <TouchableOpacity onPress={onAddHighlight} style={styles.btn}>
          <Text style={styles.btnText}>Ok</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 10,
    padding: 20,
    alignItems: 'center',
  },

  title: {textAlign: 'center', marginBottom: 20},
  input: {borderBottomWidth: 1, padding: 0, marginBottom: 20},
  btn: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 60,
    borderWidth: 2,
  },
  btnText: {fontWeight: 'bold', color: 'white'},
});

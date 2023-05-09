import React from 'react';
import {
  Pressable,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HighlightsList} from '../components/Highlights/HighlightsList';
import {useHighlights} from '../useHighlights';

export const Highlights = () => {
  const navigation = useNavigation();
  const {clearHightlights} = useHighlights();

  return (
    <Pressable onPress={() => navigation.goBack()} style={styles.container}>
      <View style={styles.card}>
        <View style={styles.topCardView}>
          <Text>Top 10</Text>
          <TouchableOpacity onPress={clearHightlights}>
            <Text style={styles.clearTextBtn}>Clear</Text>
          </TouchableOpacity>
        </View>
        <HighlightsList amount={10} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  clearTextBtn: {color: 'red'},
  topCardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
});

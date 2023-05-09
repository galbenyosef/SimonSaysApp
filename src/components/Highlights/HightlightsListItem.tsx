import React from 'react';
import {ListRenderItem, StyleSheet, Text, View} from 'react-native';
import {Highlight} from '../../types';

type Props = {
  item: Highlight;
  index: number;
};

export const HighlightsListItem: ListRenderItem<Highlight> = ({
  item: {name, level},
  index,
}: Props) => (
  <View style={styles.container}>
    <Text style={styles.index}>{`${index + 1}.`}</Text>
    <View style={styles.containerHighlight}>
      <Text>{name || '???'}</Text>
      <Text>{level || '?'}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerHighlight: {
    flex: 1,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  index: {marginRight: 10},
});

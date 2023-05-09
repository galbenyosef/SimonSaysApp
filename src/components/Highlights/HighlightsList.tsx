import React from 'react';
import {FlatList, View} from 'react-native';
import {HighlightsListItem} from './HightlightsListItem';
import {useHighlights} from '../../useHighlights';

type Props = {
  amount: number;
};

const ItemSeparatorComponent = () => (
  <View
    style={{
      borderBottomWidth: 1,
      borderStyle: 'dashed',
    }}
  />
);

export const HighlightsList = ({amount}: Props) => {
  const {highlights} = useHighlights();

  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={highlights.concat(new Array(amount).fill({})).slice(0, amount)}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={HighlightsListItem}
      />
    </View>
  );
};

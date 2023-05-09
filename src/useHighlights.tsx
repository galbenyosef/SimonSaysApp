import {useMMKVString} from 'react-native-mmkv';
import {Highlight} from './types';

const MAX_HIGHLIGHTS = 10;

type HighlightsHook = {
  highlights: Highlight[];
  addHighlight: (highlight: Highlight) => void;
  clearHightlights: () => void;
};

export const useHighlights = (): HighlightsHook => {
  const [highlights, setHighlights] = useMMKVString('highlights');
  const highlightsParsed: Highlight[] =
    (highlights && JSON.parse(highlights)) || [];

  const addHighlight = ({name, level}: Highlight) => {
    const top10 = [...highlightsParsed, {name, level}]
      .sort((a: Highlight, b: Highlight) => b.level - a.level)
      .slice(0, MAX_HIGHLIGHTS);

    setHighlights(JSON.stringify(top10));
  };

  const clearHightlights = () => {
    setHighlights(JSON.stringify([]));
  };

  return {
    highlights: highlightsParsed,
    addHighlight,
    clearHightlights,
  };
};

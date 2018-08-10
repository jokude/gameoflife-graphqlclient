import deepmerge from 'deepmerge';
import { graphql } from 'react-apollo';
import { getBoard, getBoardUpdate } from '../apollo/schema.gql';
import { base64toMap, chunkArray } from '../helpers';
import { BOARD_SIZE } from '../components/constants';

export default graphql(getBoard, {
  props: ({
    data: {
      loading, error, subscribeToMore, board
    }
  }) => {
    if (loading || error) {
      return null;
    }

    subscribeToMore({
      document: getBoardUpdate,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return deepmerge(prev, {
          board: subscriptionData.data.boardUpdated
        });
      }
    });

    return {
      loading,
      error,
      grid: chunkArray(base64toMap(board.base64), BOARD_SIZE)
    };
  }
});

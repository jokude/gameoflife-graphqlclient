import React from 'react';
import { Query } from 'react-apollo';
import deepmerge from 'deepmerge';
import { getBoard, getBoardUpdate } from '../apollo/schema.gql';
import { base64toMap, chunkArray } from '../helpers';
import Board from './Board';

export default () => (
  <Query query={getBoard}>
    {({
      loading, error, data, subscribeToMore
    }) => {
      if (loading || error) {
        return null;
      }
      const {
        base64, total, births, deaths
      } = data.board;
      const boardData = base64toMap(base64);
      const grid = chunkArray(boardData, 40);
      return (
        <Board
          grid={grid}
          total={total}
          births={births}
          deaths={deaths}
          updates={() => subscribeToMore({
            document: getBoardUpdate,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              return deepmerge(prev, {
                board: subscriptionData.data.boardUpdated
              });
            }
          })}
        />
      );
    }}
  </Query>
);

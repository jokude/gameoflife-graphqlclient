import React from 'react';
import { Query } from 'react-apollo';
import deepmerge from 'deepmerge';
import { getBoard, getMessages } from '../queries';
import { boardFromBase64, chunkArray } from '../helpers';
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
      const boardData = boardFromBase64(base64);
      const grid = chunkArray(boardData, 40);
      return (
        <Board
          grid={grid}
          total={total}
          births={births}
          deaths={deaths}
          updates={() => subscribeToMore({
            document: getMessages,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              return deepmerge(prev, {
                board: {
                  base64: subscriptionData.data.boardUpdated.base64
                }
              });
            }
          })
          }
        />
      );
    }}
  </Query>
);

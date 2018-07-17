import React from 'react';
import { Mutation } from 'react-apollo';
import deepmerge from 'deepmerge';
import { getBoard, putPattern } from '../apollo/schema.gql';
import { base64toMap, mapToBase64 } from '../helpers';
import PatternDraggable from './PatternDraggable';

const mutation = props => (
  <Mutation mutation={putPattern}>
    {mutate => (
      <PatternDraggable
        {...props}
        put={(positions) => {
          mutate({
            variables: { positions },
            update: (store) => {
              const cellNumber = positions.length;
              const queryData = store.readQuery({ query: getBoard });
              const { board: { base64, total, births } } = queryData;
              const boardData = base64toMap(base64);
              positions.forEach((position) => { boardData[position] = true; });
              store.writeQuery({
                query: getBoard,
                data: deepmerge(queryData, {
                  board: {
                    base64: mapToBase64(boardData),
                    total: total + cellNumber,
                    births: births + cellNumber
                  }
                })
              });
            }
          });
        }}
      />
    )}
  </Mutation>
);

export default mutation;

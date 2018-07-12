import React from 'react';
import { Mutation } from 'react-apollo';
import { getBoard, putPattern } from '../queries';
import PatternDraggable from './PatternDraggable';
import { boardFromBase64, chunkArray } from '../helpers';

const mutation = props => (
  <Mutation mutation={putPattern}>
    {mutate => (
      <PatternDraggable
        {...props}
        put={(positions) => {
          // console.log(positions);
          mutate({
            variables: { positions },
            update: (store) => {
              // console.log(store, data);

              const data = store.readQuery({ query: getBoard });
              const boardData = boardFromBase64(data.board.base64);
              positions.forEach((position) => { boardData[position] = true; });
              // positions.forEach(positions => row.forEach(cell => ));
              // store.writeQuery({ query: getBoard, data });

              console.log(boardData);

              /* // Read the data from our cache for this query.
            const data = store.readQuery({ query: CommentAppQuery });
            // Add our comment from the mutation to the end.
            data.comments.push(submitComment);
            // Write our data back to the cache.
            store.writeQuery({ query: CommentAppQuery, data }); */
            }
          });
        }
      }
      />
    )}
  </Mutation>
);

export default mutation;

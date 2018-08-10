import deepmerge from 'deepmerge';
import { graphql } from 'react-apollo/graphql';
import { getBoard, putPattern } from '../apollo/schema.gql';
import { base64toMap, mapToBase64 } from '../helpers';

export default graphql(putPattern, {
  props: ({
    mutate
  }) => ({
    setPositions: (positions) => {
      mutate({
        variables: { positions },
        optimisticResponse: { putPattern: {} },
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
    }
  })
});

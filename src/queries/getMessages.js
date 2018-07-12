import gql from 'graphql-tag';

export default gql`
  subscription onBoardUpdated {
    boardUpdated {
      base64
      total
      births
      deaths
    }
  }
`;

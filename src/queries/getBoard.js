import gql from 'graphql-tag';

export default gql`
  query getBoard {
    board {
      base64
      total
      births
      deaths
    }
  }
`;

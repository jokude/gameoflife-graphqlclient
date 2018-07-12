import gql from 'graphql-tag';

export default gql`
  fragment BoardState on Board {
    base64
    total
    births
    deaths
  }
`;

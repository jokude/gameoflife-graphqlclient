import gql from 'graphql-tag';

export default gql`
  mutation putPattern($positions: [Int]) {
    putPattern(positions: $positions)
  }
`;

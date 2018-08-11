import { split } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const isSecure = SECURE_CONNECTION ? 's' : '';

const httpLink = createHttpLink({
  uri: `http${isSecure}://${GRAPHQL_HOST}/graphql`
});

const wsLink = new WebSocketLink({
  uri: `ws${isSecure}://${GRAPHQL_HOST}/subscriptions`,
  options: {
    reconnect: true
  }
});

export default split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

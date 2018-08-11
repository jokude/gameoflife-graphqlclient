import { split } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const host = `${GRAPHQL_HOST}:${GRAPHQL_PORT}`;
const isSecure = SECURE_CONNECTION ? 's' : '';

const httpLink = createHttpLink({
  uri: `http${isSecure}://${host}/graphql`
});

const wsLink = new WebSocketLink({
  uri: `ws${isSecure}://${host}/subscriptions`,
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

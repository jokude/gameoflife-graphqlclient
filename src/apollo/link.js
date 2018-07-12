import { split } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const PORT = 3000;

const httpLink = createHttpLink({
  uri: `http://192.168.0.7:${PORT}/graphql`
});

const wsLink = new WebSocketLink({
  uri: `ws://192.168.0.7:${PORT}/subscriptions`,
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

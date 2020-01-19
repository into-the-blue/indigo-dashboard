let host = window.location.origin;

if (process.env.NODE_ENV === 'development') {
  host = 'http://localhost:7000';
}
const API_ENDPOINT = host + '/dashboard/api/v1';

const GRAPHQL_ENDPOINT = host + '/dashboard/graphql';

export { API_ENDPOINT, GRAPHQL_ENDPOINT };

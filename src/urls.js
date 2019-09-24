const ENV_PUBLIC_URL =
  process.env.REACT_APP_IN_DOCKER === 'true'
    ? process.env.REACT_APP_DOCKER_PUBLIC_URL
    : process.env.REACT_APP_PUBLIC_URL;

console.log(`ENV_PUBLIC_URL: ${ENV_PUBLIC_URL}`);

// fetch('/test')
//   .then(res => res.json())
//   .then(val => console.log(val));

const PUBLIC_URL_FROM_WINDOW = window && window.location.origin;

// const serverUri =
//   process.env.NODE_ENV === 'production'
//     ? PUBLIC_URL_FROM_WINDOW
//     : ENV_PUBLIC_URL || PUBLIC_URL_FROM_WINDOW;

const webSocketUriBase = PUBLIC_URL_FROM_WINDOW.replace(
  /https?/,
  window && window.location.protocol === 'https:' ? 'wss' : 'ws'
);

console.log('webSocketUriBase', webSocketUriBase);

const webSocketUri = `${webSocketUriBase}${process.env.REACT_APP_GRAPHQL_WS_ENDPOINT}`;

const httpUri = `${PUBLIC_URL_FROM_WINDOW}${process.env.REACT_APP_GRAPHQL_HTTP_ENDPOINT}`;

export { webSocketUri, httpUri };

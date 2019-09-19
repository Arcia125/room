const proxy = require('http-proxy-middleware');

const hostName =
  (process.env.REACT_APP_IN_DOCKER
    ? process.env.REACT_APP_DOCKER_PUBLIC_URL
    : process.env.REACT_APP_PUBLIC_URL) || 'http://localhost:9001';

module.exports = function(app) {
  app.use(proxy('/graphql', { target: hostName }));
  app.use(
    proxy(process.env.REACT_APP_GRAPHQL_WS_ENDPOINT, {
      // target: `ws://${hostName.replace(/https?:\/\//, '')}`,
      target: hostName,
      ws: true
    })
  );
};

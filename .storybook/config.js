import { configure } from '@storybook/react';

// function loadStories() {
//   const req = require.context('../stories', true, /\.stories\.js$/);
//   req.keys().forEach(fileName => req(fileName));
// }

// configure(loadStories, module);

configure(require.context('../stories', true, /\.stories\.js$/), module);

/**
 * @description Mock props for Children of Route components.
 */
import { RouteComponentProps, match } from 'react-router';
import * as history from 'history';

const mockLocation: history.Location = {
  hash: '',
  pathname: '/',
  search: '/',
  state: {},
};

const mockHistory: history.History = {
  push: jest.fn(),
  length: 1,
  block: jest.fn(),
  action: 'PUSH',
  createHref: jest.fn(),
  go: jest.fn(),
  goBack: jest.fn(),
  goForward: jest.fn(),
  listen: jest.fn(),
  location: mockLocation,
  replace: jest.fn(),
};

const mockMatch: match = {
  isExact: true,
  params: {},
  path: '/',
  url: '/',
};

/**
 * @description mocked version of props passed from react router Routes to their children
 * @example
 * render(<MyComponent {...mockRouteComponentProps} />)
 */
export const mockRouteComponentProps: RouteComponentProps = {
  history: mockHistory,
  location: mockLocation,
  match: mockMatch,
};

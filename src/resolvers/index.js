import { currentUser } from './currentUser';
import { merge } from '../utils/merge';

const resolvers = merge(currentUser);

export { resolvers };

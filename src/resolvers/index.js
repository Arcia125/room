import { currentUser } from './currentUser';

// const resolveList = [currentUser];
const merge = (...objs) =>
  [...objs].reduce(
    (acc, obj) =>
      Object.keys(obj).reduce((a, k) => {
        acc[k] = acc.hasOwnProperty(k)
          ? [].concat(acc[k]).concat(obj[k])
          : obj[k];
        return acc;
      }, {}),
    {}
  );

const resolvers = merge(currentUser);
// const resolvers = resolverList.reduce((acc, curr) => ({
//   defaults: {
//     ...currentUser.defaults
//   },
//   resolvers: {
//     Mutation: {
//       ...currentUser.resolvers.Mutation
//     },
//     Query: {
//       ...currentUser.resolvers.Query
//     }
//   }
// });

export { resolvers };

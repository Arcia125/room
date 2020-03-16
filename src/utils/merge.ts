// eslint-disable-next-line @typescript-eslint/no-explicit-any
const merge = (...objs: { [key: string]: any }[]) =>
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

export { merge };

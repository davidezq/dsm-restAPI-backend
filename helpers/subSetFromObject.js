/**
 * pick({ a: '1', b: '2', c: '3' }, ['a', 'b']) -> { a: '1', b: '2' }
 * @param {*} obj
 * @param {*} keys
 */
const pick = (obj, keys) =>
  Object.keys(obj)
    .filter((k) => keys.includes(k))
    .reduce((res, k) => Object.assign(res, { [k]: obj[k] }), {});

module.exports = {
  pick,
};

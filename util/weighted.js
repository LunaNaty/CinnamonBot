function getTotal(weights) {

  function wrap(arr, fn) {
    return function () {
      arr.__weighted_total = null
      fn.apply(arr, arguments)
    }
  }

  let total;

  if (total === undefined) {
    ['pop', 'push', 'shift', 'unshift', 'splice'].forEach((key) => {
      weights[key] = wrap(weights, weights[key])
    })
  }

  total = weights.__weighted_total = weights.reduce((prev, curr) => {
    return prev + curr
  }, 0)

  return total
}

function _selectArr(set, weights) {
  let total = getTotal(weights);
  let key = Math.random() * total;

  for (let index = 0; index < weights.length; index++) {
    key -= weights[index]

    if (key < 0) {
      return set[index]
    }
  }

  throw new RangeError('All weights do not add up to >= 1 as expected.')
}

const select = (obj) => {
  let keys = Object.keys(obj);
  let values = keys.map((key) => {
    return obj[key]
  })

  return _selectArr(keys, values);
}

module.exports = select
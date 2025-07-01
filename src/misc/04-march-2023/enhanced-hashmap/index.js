class OffsetIntegerMap {
  constructor () {
    this.actualMap = new Map()
    this.keyOffset = 0
    this.valueOffset = 0
    this.result = 0
  }

  size () {
    return this.actualMap.keys().length
  }

  isEmpty () {
    return this.actualMap.keys().length === 0
  }

  containsKey (key) {
    const keyWithoutOffset = key - this.keyOffset
    this.actualMap.has(keyWithoutOffset)
  }

  get (key) {
    const keyWithoutOffset = key - this.keyOffset
    const value = this.actualMap.get(keyWithoutOffset)
    if (value) {
      console.log(value)
      this.result += value + this.valueOffset
    }
    return value ? value + this.valueOffset : null
  }

  insert (key, value) {
    // console.log({ key, value })
    const keyWithoutOffset = key - this.keyOffset
    const valueWithoutOffset = value - this.valueOffset
    const oldValue = this.actualMap.set(keyWithoutOffset, valueWithoutOffset)
    if (!oldValue) {
      return null
    }

    return oldValue + this.valueOffset
  }

  addToValue (toAdd) {
    this.valueOffset += toAdd
  }

  addToKey (toAdd) {
    this.keyOffset += toAdd
  }
}

const solution = (queryType, query) => {
  const map = new OffsetIntegerMap()
  queryType.forEach((qt, i) => {
    map[qt](...query[i])
  })
  return map.result
}

module.exports.enhancedHashmap = { solution }

// https://codereview.stackexchange.com/questions/244468/enhanced-hashmap-add-a-number-to-all-keys-values

// const queryType = [
//   'insert',
//   'insert',
//   'addToValue',
//   'addToKey',
//   'get'
// ]
// const query = [
//   [1, 2],
//   [2, 3],
//   [2], [1, 4]; [2, 5]
//   [1], [2, 4]; [3, 5]
//   [3]
// ]

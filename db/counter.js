module.exports = {
  get: async ({ key }) => {
    return COUNT.get(key)
  },
  put: async ({ key, data }) => {
    return COUNT.put(key, data)
  },
}

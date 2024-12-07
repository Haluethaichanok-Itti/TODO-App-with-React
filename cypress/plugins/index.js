// cypress/plugins/index.js
const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress/', 'config', `${file}.json`)

  return fs.readJson(pathToConfigFile)
}

module.exports = (on, config) => {
  // accept a configFile value or use dev by default
  const file = config.env.configFile || 'dev'

  return getConfigurationByFile(file)
}
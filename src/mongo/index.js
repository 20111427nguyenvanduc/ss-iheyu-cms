const _ = require('lodash')
const config = require('../../config')

let connections = {}

class MongoConnection {
  constructor(name, config) {
    this.connection = null
    this.config = config
    this.name = name

    this.init()
  }

  init() {
    const uri = generateUri(this.config.host, this.config.port, this.config.database)
    const options = this.config.options || {}

    this.connection = mongoose.createConnection(uri, options)

    this.connection.on('connected', () => {
      console.log(`[MONGO-${this.name}] - CONNECTED`)
    })

    this.connection.on('error', (err) => {
      console.log(`[MONGO-${this.name}]`, err)
    })
  }

  getConnection() {
    return this.connection
  }
}

function setUp() {
  const mongoConfig = _.get(config, 'mongo.connections', {})
  Object.keys(mongoConfig).forEach((name) => {
    connections[name] = new MongoConnection(name, mongoConfig[name])
  })
}

setUp()

function generateUri(host, port, database) {
  return `mongodb://${host}:${port}/${database}`
}

module.exports = (name) => {
  const connection = connections[name]
  if(connection) {
    return connection.getConnection()
  }

  return null
}

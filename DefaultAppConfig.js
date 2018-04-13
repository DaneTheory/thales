import convict from 'convict'

import Config from './configs'


const DefaultAppConfig = () => {
  let envMode
  let identityConfig,
      ipConfig,
      portConfig,
      socketIOPort,
      hostConfig,
      jwtSecretConfig,
      jwtExpirationConfig,
      dbConfig,
      redisConfig

  const config = convict({
    env: {
      doc: `Service Environment`,
      env: `NODE_ENV`,
      format: [
        `development`,
        `test`,
        `maintenance`,
        `production`
      ],
      arg: `env`,
      default: null,
    },
  })

  envMode = config.get('env')

  const globalConfig = Config(envMode)

  identityConfig = {
    name: {
      doc: `Service Name`,
      env: `SERVICE_NAME`,
      format: globalConfig.validation.validateNameFormat(globalConfig.identity.name),
      default: config.load(globalConfig.identity.serviceName),
    },
    description: {
      doc: `Service Description`,
      env: `SERVICE_DESCRIPTION`,
      format: String,
      default: config.load(globalConfig.identity.serviceDescription),
    },
    version: {
      doc: `Service Version`,
      env: `SERVICE_VERSION`,
      format: String,
      default: config.load(globalConfig.identity.serviceVersion),
    }
  }
  ipConfig = {
    ip: {
      doc: `Service IP Address To Bind To`,
      env: `IP_ADDRESS`,
      format: `ipaddress`,
      default: config.load(globalConfig.envDependency.ipAddress),
    }
  }
  portConfig =  {
    port: {
      doc: `Service Port To Bind To`,
      env: `PORT`,
      format: `port`,
      default: config.load(globalConfig.envDependency.portNumber),
    }
  }
  socketIOPort = {
    socketIOPort: {
      doc: `Service Socket IO Port To Bind To`,
      env: `SOCKET_IO_PORT`,
      format: `port`,
      default: config.load(globalConfig.envDependency.socketIOPortNumber),
    }
  }
  hostConfig = {
    host: {
      doc: `Service Host Information`,
      env: `HOST`,
      format: String,
      default: config.load(globalConfig.envDependency.hostInformation),
    }
  }
  jwtSecretConfig = {
    jwtSecret: {
      doc: `Service JWT Secret Key`,
      env: `JWT_SECRET`,
      format: `int`,
      default: config.load(globalConfig.envDependency.jwtSecretKeyValue),
    }
  }
  jwtExpirationConfig = {
    jwtExpiration: {
      doc: `Service JWT Expiration Time (defaults to minutes)`,
      env: `JWT_EXPIRATION`,
      format: `int`,
      default: config.load(globalConfig.envDependency.jwtExpirationValue),
    }
  }
  dbConfig = {
    db: {
      env: `SERVICE_DB_URI`,
      name: {
        doc: `Service Database Name`,
        format: String,
        default: config.load(globalConfig.identity.serviceName)
      },
      port: {
        doc: `Service Database Port`,
        format: `port`,
        default: config.load(globalConfig.envDependency.dbPort)
      },
      ip: {
        doc: `Service Database IP Address`,
        format: `ipaddress`,
        default: config.load(globalConfig.envDependency.ipAddress),
      },
      host: {
        doc: `Service Database Host Information`,
        format: String,
        default: config.load(globalConfig.envDependency.hostInformation),
      },
      dbUrl: {
        doc: `Service Database Full URL`,
        format: String,
        default: config.load(globalConfig.envDependency.dbUrl),
      },
    }
  },
  redisConfig = {
    redis: {
      env: `REDIS_URI`,
      name: {
        doc: `Redis Instance For Distibuted Communication Between Services`,
        format: String,
        default: config.load(globalConfig.identity.serviceName)
      },
      port: {
        doc: `Redis Instance Port`,
        format: `port`,
        default: config.load(globalConfig.envDependency.redisPort)
      },
      ip: {
        doc: `Redis Instance IP Address`,
        format: `ipaddress`,
        default: config.load(globalConfig.envDependency.ipAddress),
      },
      redisID: {
        doc: `Redis Instance Database ID (a.k.a. The name of the Redis Instance Database)`,
        format: Number,
        default: config.load(globalConfig.envDependency.redisID),
      },
      redisUrl: {
        doc: `Redis Instance Full URL`,
        format: String,
        default: config.load(globalConfig.envDependency.redisUrl),
      },
      redisSocketPath: {
        doc: `Redis Instance WebSocket Connection Path`,
        format: String,
        default: config.load(globalConfig.envDependency.redisSocketPath),
      }
    }
  }

  return config
}


export default DefaultAppConfig

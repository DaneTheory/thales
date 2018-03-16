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
      dbConfig
      // sslConfig

  const config = convict({
    // identity: {
      // name: {
      //   doc: `Service Name`,
      //   env: `SERVICE_NAME`,
      //   format: globalConfig.validation.validateNameFormat(globalConfig.identity.name),
      //   default: globalConfig.identity.name,
      // },
      // pid: {
      //   doc: `Service Process ID`,
      //   env: `SERVICE_PID`,
      //   format: '*',
      //   default: globalConfig.identity.pid,
      // },
      // uid: {
      //   doc: `Service Process User ID`,
      //   env: `SERVICE_UID`,
      //   format: '*',
      //   default: globalConfig.identity.uid,
      // },
      // gid: {
      //   doc: `Service Process Group ID`,
      //   env: `SERVICE_GID`,
      //   format: '*',
      //   default: globalConfig.identity.gid,
      // }
    // },
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
  }
  // sslConfig = {
  //   sslConfig: {
  //     doc: `Service SSL Config For Local Development`,
  //     env: `SERVICE_SSL`,
  //     format: `*`,
  //     default: config.load(globalConfig.envDependency.sslConfig)
  //   }
  // }

  return config
}


export default DefaultAppConfig

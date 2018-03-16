import SSLConfig from './ssl'


const EnvDependency = (env, serviceName) => {
  let ip,
      port,
      socketIOPort,
      host,
      jwtSecret,
      jwtExpiration,
      dbPort
      // sslConfig

  if(env === 'development') {
    ip = `127.0.0.1`
    port = 3000
    socketIOPort = 2222
    host = serviceName
    jwtSecret = `bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3qHoFpGkec75RCeBb8cpKauGefw5qy4`
    jwtExpiration = 15
    dbPort = 27017
    // sslConfig = SSLConfig()
  }

  return {
    ip: ip,
    port: port,
    socketIOPort: socketIOPort,
    host: host,
    jwtSecret: jwtSecret,
    jwtExpiration: jwtExpiration,
    dbPort: dbPort,
    // ssl: sslConfig
  }
}

export default EnvDependency

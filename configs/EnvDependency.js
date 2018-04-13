const EnvDependency = (env, serviceName) => {
  let ip, // eslint-disable-line one-var
    port,
    socketIOPort,
    host,
    jwtSecret,
    jwtExpiration,
    dbPort,
    redisPort,
    redisID,
    redisUrl,
    redisSocketPath;

  if (env === 'development') {
    ip = '127.0.0.1';
    port = 3000;
    socketIOPort = 2222;
    host = serviceName;
    jwtSecret = 'bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3qHoFpGkec75RCeBb8cpKauGefw5qy4';
    jwtExpiration = 15;
    dbPort = 27017;
    redisPort = 6379;
    redisID = 1;
    redisUrl = `redis://${ip}:${redisPort}/${redisID}`;
    redisSocketPath = '/tmp/redis.sock'; // TODO: Determine and test correct working path to Socket Server instance
  }

  return {
    ip,
    port,
    socketIOPort,
    host,
    jwtSecret,
    jwtExpiration,
    dbPort,
    redisPort,
    redisID,
    redisUrl,
    redisSocketPath,
  };
};


export default EnvDependency;

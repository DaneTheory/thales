import { serviceName, serviceDescription, serviceVersion, serviceProcessInfo } from './defaultConfig';
import { serviceNameFormatValidation } from './formatValidation';
import EnvDependency from './EnvDependency';


const Config = (env) => {
  const envMode = EnvDependency(env, serviceName);
  return {
    identity: {
      serviceName: {
        name: serviceName(),
      },
      serviceDescription: {
        description: serviceDescription(),
      },
      serviceVersion: {
        version: serviceVersion(),
      },
      pid: serviceProcessInfo().pid,
      uid: serviceProcessInfo().uid,
      gid: serviceProcessInfo().gid,
      cpuUsage: serviceProcessInfo().cpuUsage,
      memUsage: serviceProcessInfo().memUsage,
      uptime: serviceProcessInfo().uptime,
    },
    envDependency: {
      ipAddress: {
        ip: envMode.ip,
      },
      portNumber: {
        port: envMode.port,
      },
      socketIOPortNumber: {
        socketIOPort: envMode.socketIOPort,
      },
      hostInformation: {
        host: `${envMode.host(serviceName())}.dev`,
      },
      jwtSecretKeyValue: {
        jwtSecret: envMode.jwtSecret,
      },
      jwtExpirationValue: {
        jwtExpiration: envMode.jwtExpiration,
      },
      dbPort: {
        dbPort: envMode.dbPort,
      },
      dbUrl: {
        dbUrl: `mongodb://${envMode.ip}:${envMode.dbPort}/${envMode.host(serviceName())}`,
      },
      redisPort: {
        redisPort: envMode.redisPort,
      },
      redisID: {
        redisID: envMode.redisID,
      },
      redisUrl: {
        redisUrl: envMode.redisUrl,
      },
      redisSocketPath: {
        redisSocketPath: envMode.redisSocketPath,
      },
    },
    validation: {
      validateNameFormat: serviceNameFormatValidation,
    },
  };
};


export default Config;

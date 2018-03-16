import defaultSettings from '../package.json'


export const serviceName = () => defaultSettings.name

export const serviceProcessInfo = () => {
  return {
    pid: process.pid,
    uid: process.getuid(),
    gid: process.getegid(),
    cpuUsage: process.cpuUsage(),
    memUsage: process.memoryUsage(),
    uptime: process.uptime(),
  }
}

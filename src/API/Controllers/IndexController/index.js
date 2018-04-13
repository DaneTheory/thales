import DefaultAppConfig from '../../../../DefaultAppConfig'


const config = DefaultAppConfig()

const mount = async (req, res, next) => {
  res.json({
      name: config.get('name'),
      description: config.get('description'),
      version: config.get('version'),
      environment: config.get('env'),
      routes: [
        `TODO!!!!`
      ],
      redis: {
        ip: config.get('ip'),
        port: config.get('redisPort'),
        id: config.get('redisID'),
        uri: config.get('redisUrl')
      },
      mongo: {
        ip: config.get('ip'),
        port: config.get('dbPort'),
        name: config.get('name'),
        uri: config.get('dbUrl')
      },
      status: res.statusCode
  })
}

const index = async (req, res, next) => {
  const srvcName = config.get('name')
  const indexMessageHandler = (srvc) => `Welcome to ${srvc.toUpperCase()}`
  let msg = await indexMessageHandler(srvcName)
  res.json({
      message: msg,
      status: res.statusCode
    })
}


const IndexController = {
  mount,
  index
}


export default IndexController

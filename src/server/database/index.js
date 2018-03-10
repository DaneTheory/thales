import mongoose from '../mongoose/mongoose'


const initDB = () => {
  return Promise.resolve(mongoose)
    .then(db => db.connect())
    .then(data => data)
    .catch(err => {
      const errObj = new Error(err)
      console.error(errObj)
      return errObj
    })
}

export default initDB

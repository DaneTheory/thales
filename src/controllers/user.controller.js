import User from '../models/user/user.model'


// Load User Info Via User ID
const loadUserInfo = async (req, res, next, id) => {
  try {
    const loadUserInfoViaID = (id) => User.get(id)
    const userIDResult = await loadUserInfoViaID(id)
      .then(user => {
        req.user = user
        return next()
      })
      .catch(err => next(err))
    return userIDResult
  }
  catch (err) {
    next(err)
  }
}

// Get User
const getUserInfo = async (req, res) => await res.json(req.user)

// Create New User
const createNewUser = async (req, res, next) => {
  try {
    const newUser = new User({ username: req.body.username, email: req.body.email })
    const saveNewUser = (newUser) => newUser.save()
    const newUserResult = await saveNewUser(newUser)
      .then(savedUserData => res.json(savedUserData))
      .catch(err => next(err))
    return newUserResult
  }
  catch (err) {
    next(err)
  }
}

// Update Existing User
const updateExistingUser = async (req, res, next) => {
  try {
    const user = req.user
    user.username = req.body.username
    user.email = req.body.email
    const saveUpdatedUserInfo = (user) => user.save()
    const updatedUserResult = await saveUpdatedUserInfo(user)
      .then(savedUpdatedUserInfo => res.json(savedUpdatedUserInfo))
      .catch(err => next(err))
    return updatedUserResult
  }
  catch (err) {
    next(err)
  }
}

// List Group Of Users
const listOfUsers = async (req, res, next) => {
  try {
    const { limit = 10, skip = 0 } = req.query
    const fetchUserList = (limit, skip) => User.list({ limit, skip })
    const userListResult = await fetchUserList(limit, skip)
      .then(users => res.json(users))
      .catch(err => next(err))
    return userListResult
  }
  catch (err) {
    next(err)
  }
}

// Delete A User
const removeUser = async (req, res, next) => {
  try {
    const user = req.user
    const deleteUser = (user) => user.remove()
    const deletedUserResult = await deleteUser(user)
      .then(deletedUser => res.json(deletedUser))
      .catch(err => next(err))
    return deletedUserResult
  }
  catch (err) {
    next(err)
  }
}


export default {
  loadUserInfo,
  getUserInfo,
  createNewUser,
  updateExistingUser,
  listOfUsers,
  removeUser
}

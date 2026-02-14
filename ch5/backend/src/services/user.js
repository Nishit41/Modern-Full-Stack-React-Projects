import bcrypt from 'bcrypt'
import { User } from '../db/models/user.js'
export const createUser = async ({ username, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({
    username,
    password: hashedPassword,
  })
  return await user.save()
}

export const findUserByUsername = async (username) => {
  return await User.findOne({ username })
}

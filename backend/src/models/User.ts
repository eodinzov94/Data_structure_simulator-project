import { sequelize } from '../db.js'
import { DataTypes, Model } from 'sequelize'
import { IUserRegister, UserAttributes } from '../types/UserTypes.js'


class User extends Model<UserAttributes, IUserRegister> implements UserAttributes {
  public id!: number
  public email!: string
  public firstName!: string
  public lastName!: string
  public gender!: string
  public age!: number
  public role!: string
  public lastSeen!: Date
  public password!: string

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
  lastSeen: { type: DataTypes.DATE, defaultValue: Date.now() },
  role: { type: DataTypes.STRING, defaultValue: 'Student' },
}, {
  timestamps: true,
  sequelize: sequelize,
})

export default User
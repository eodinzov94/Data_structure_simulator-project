import { sequelize } from '../db.js'
import { DataTypes, Model } from 'sequelize'
import { UserActivityAttributes, UserActivityInput } from '../types/UserActivityTypes.js'


class UserActivity extends Model<UserActivityAttributes, UserActivityInput> implements UserActivityAttributes {
  public id!: number
  public userID!: number
  public subject!: string
  public algorithm!: string
  public action!: string
  public readonly createdAt!: Date
}

UserActivity.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userID: { type: DataTypes.INTEGER, references: { model: 'Users', key: 'id' } },
  subject: { type: DataTypes.STRING, allowNull: false },
  algorithm: { type: DataTypes.STRING, allowNull: true},
  action: { type: DataTypes.STRING, allowNull: true },
}, {
  timestamps: true,
  sequelize: sequelize,
})

export default UserActivity
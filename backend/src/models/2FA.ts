import { TWOFA_Attributes } from '../types/TWOFA_Types.js'
import { sequelize } from '../db.js'
import { DataTypes, Model } from 'sequelize'


class TWOFA extends Model<TWOFA_Attributes, TWOFA_Attributes> implements TWOFA_Attributes {
  public userID!: number
  public code!: string
  public type!: string
  public ValidDate!: Date

}

TWOFA.init({
  userID: { type: DataTypes.INTEGER, references: { model: 'Users', key: 'id' }, primaryKey: true },
  code: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  ValidDate: { type: DataTypes.DATE, allowNull: false },

}, {
  sequelize: sequelize
})

export default TWOFA
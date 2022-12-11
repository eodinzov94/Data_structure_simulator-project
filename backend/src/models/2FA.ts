import { TWOFA_Attributes } from '../types/TWOFA_Types.js'
import { sequelize } from '../db.js'
import { DataTypes, Model } from 'sequelize'


class TWOFA extends Model<TWOFA_Attributes, TWOFA_Attributes> implements TWOFA_Attributes {
  public email!: string
  public code!: string
  public type!: string
  public ValidDate!: Date

}

TWOFA.init({
  email: { type: DataTypes.STRING, references: { model: 'Users', key: 'email' }, primaryKey: true },
  code: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  ValidDate: { type: DataTypes.DATE, allowNull: false },

}, {
  sequelize: sequelize
})

export default TWOFA
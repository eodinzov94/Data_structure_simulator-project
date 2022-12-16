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
  public isEnabled2FA!: boolean
  public isEmailConfirmed!: boolean

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
  age: { type: DataTypes.NUMBER, allowNull: false },
  isEnabled2FA: { type: DataTypes.BOOLEAN, defaultValue: false },
  isEmailConfirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
  lastSeen: { type: DataTypes.DATE, allowNull: false  },
  role: { type: DataTypes.STRING, defaultValue: 'Student' },
}, {
  timestamps: true,
  sequelize: sequelize,
})

export default User

/*
email TYPE - ACTIVATE/2FA/PWCHANGE/PWRESET      CODE      VALID_DATE

email  TYPE - SUBJECT       SUBTYPE        ACTION    DATE    COUNT




--ACTIVE USERS
SELECT COUNT(*) FROM USERS
WHERE LASTSEEN >= SYSDATE -14 AND ROLE = STUDENT

--Total USERS
SELECT COUNT(*) FROM USERS
WHERE ROLE = STUDENT

SELECT COUNT(GENDER),AVG(AGE) FROM USERS
WHERE  ROLE = STUDENT
GROUP BY GENDER


SELECT COUNT(*) , SUBJECT
WHERE  ROLE = STUDENT
GROUP BY SUBJECT


SELECT COUNT(*) , SUBJECT,SUBTYPE
WHERE  ROLE = STUDENT
GROUP BY SUBTYPE


SELECT COUNT(*) , SUBJECT,SUBTYPE,ACTION
WHERE  ROLE = STUDENT
GROUP BY ACTION


SELECT MAX(ACTION_DATE)
WHERE  USERID = ID


*/
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  HasMany,
  BeforeCreate,
  BeforeUpdate,
} from "sequelize-typescript";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Todo from "../Todo/Todo";

@Table({ tableName: "users", timestamps: true })
class User extends Model<User> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id!: string;

  @Column({ type: DataType.STRING(50), allowNull: false, unique: true })
  username!: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  first_name!: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  last_name!: string;

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  password!: string;

  @HasMany(() => Todo, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  todos!: Todo[];

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    if (instance.changed("password")) {
      const salt = await bcrypt.genSalt(10);
      instance.password = await bcrypt.hash(instance.password, salt);
    }
  }

  async matchPassword(enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
  }

  getSignedJwtToken() {
    return jwt.sign(
      { id: this.id },
      process.env.JWT_SECRET || "this is the secret",
      { expiresIn: parseInt(process.env.JWT_EXPIRES_IN) * 60 || 30 * 60 * 60 }
    );
  }
}

export default User;

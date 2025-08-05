import { v4 as uuidv4 } from "uuid";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "@sequelize/core";
import {
  Attribute,
  ColumnName,
  Default,
  Index,
  NotNull,
  PrimaryKey,
  Table,
  Unique,
} from "@sequelize/core/decorators-legacy";

@Table({ tableName: "scrapping_jobs_details", timestamps: true })
export default class Jobs extends Model<
  InferAttributes<Jobs>,
  InferCreationAttributes<Jobs>
> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey()
  @Default(() => uuidv4())
  declare id?: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  @ColumnName("job_title")
  @Index
  declare jobTitle: string;

  @Attribute(DataTypes.STRING)
  @Index
  declare remote: string;

  @Attribute(DataTypes.STRING)
  @ColumnName("job_type")
  @Index
  declare jobType: string;

  @Attribute(DataTypes.STRING)
  @Index
  declare location: string;

  @Attribute(DataTypes.STRING)
  declare postedAt?: string;

  @Attribute(DataTypes.STRING)
  declare salary?: string;

  @Attribute(DataTypes.STRING)
  declare url: string;

  @Attribute(DataTypes.STRING)
  @Unique
  @NotNull
  @ColumnName("has_key")
  declare hasKey: string;
}

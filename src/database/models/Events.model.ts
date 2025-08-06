import { v4 as uuidv4 } from "uuid";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "@sequelize/core";
import {
  Attribute,
  Default,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";
import { EventStatus } from "../types";



@Table({ tableName: "events_details", timestamps: true })
export default class Events extends Model<
  InferAttributes<Events>,
  InferCreationAttributes<Events>
> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @Default(() => uuidv4())
  declare id: string;

  @Attribute(DataTypes.ENUM(...Object.values(EventStatus)))
  @NotNull
  @Default(EventStatus.Pause)
  declare status: EventStatus;

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  @Default(false)
  declare isError: boolean;

  @Attribute(DataTypes.TEXT)
  @Default("")
  declare errorMessage: string;

  @Attribute(DataTypes.TEXT)
  @NotNull
  declare data: string;
}

import { User } from "../../../users/infrastructure/entity/user.entity";
import { IsString, IsNotEmpty, IsUUID, IsDate } from "class-validator";

export class EventDTO {
  @IsUUID()
  event_id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  user: User;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;
}

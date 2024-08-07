import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema({ timestamps: true })
export class Users {
  @Prop()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Prop({ unique: true })
  @IsNotEmpty()
  @IsString()
  username: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Prop({ unique: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  role: string;

  @Prop({ default: true })
  @IsNotEmpty()
  active: boolean;
}

export const UsersSchema = SchemaFactory.createForClass(Users);

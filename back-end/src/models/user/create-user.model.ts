import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateUserModel {
    @ApiModelProperty()
    readonly userName: string;
    @ApiModelPropertyOptional()
    readonly role?: string;
    @ApiModelProperty()
    readonly password: string;
    @ApiModelProperty()
    readonly confirmPassword?: boolean;
    @ApiModelProperty()
    readonly email: string;
}

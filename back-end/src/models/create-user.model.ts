import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUser {
    @ApiModelProperty()
    readonly userName: string;
    @ApiModelProperty()
    readonly role: string;
    @ApiModelProperty()
    readonly password: string;
    @ApiModelProperty()
    readonly confirmPassword?: boolean;
    @ApiModelProperty()
    readonly email: string;
}

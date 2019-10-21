import { Types } from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateItemModel {
    @ApiModelProperty()
    readonly title?: string;
    @ApiModelProperty()
    readonly authors?: [Types.ObjectId];
    @ApiModelProperty()
    readonly type?: string;
    @ApiModelProperty()
    readonly price?: number;
}

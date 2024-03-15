import { PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';
export declare class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOption: BoardStatus[];
    transform(value: any): any;
    private isStatusValid;
}

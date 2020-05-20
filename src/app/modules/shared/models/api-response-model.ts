/**
 * Create a new instance of ApiResponseModel
 * @class ApiResponseModel
 * @description
 * ApiResponseModel is used to define the base API response
 */

import { CommonBase } from '@core/interfaces/common-base';

export class ApiResponseModel {
    public status: string;
    public message: string;
    public record: any;
    public errors: CommonBase;
}

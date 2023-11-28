import { Response } from './response.types';

export interface PageResponse<T> extends Response<T> {
	pageNo: number;
	pageSize: number;
	totalRecords: number;
}

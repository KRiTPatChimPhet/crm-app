export interface Response<T> {
	status: number;
	code: number;
	data: T;
	error?: string;
	message?: string[];
}

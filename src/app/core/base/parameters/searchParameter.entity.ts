// import { HttpParams } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { BaseParameter } from './baseParameter.entity';

export class SearchParameter extends BaseParameter {
    public pageNo?: number;
    public pageSize?: number;
    public query?: string;

    // use field name
    public sortBy?: string;
    // value: "asc" or "desc" , default is desc
    public sortType?: string;

    constructor() {
        super();
        this.pageNo = 1;
        this.pageSize = 10;
    }

    public override toHttpParams(): HttpParams {
        return super.toHttpParams();
    }

    // public toHttpParams(): HttpParams {
    //     const k = Object.keys(this);
    //     let httpParam = new HttpParams();

    //     k.forEach((key: string) => {

    //         const value: any = this[key as keyof this];
    //         // Beware :  value has boolean, it can true or  false
    //         // console.log(value);
    //         if (value !== null && value !== undefined) {
    //             if (value instanceof Date) {
    //                 httpParam = httpParam.set(key, value.toISOString());
    //             } else {
    //                 httpParam = httpParam.set(key, value);
    //             }
    //         }
    //     });

    //     // console.log(httpParam.toString());

    //     return httpParam;
    // }
}

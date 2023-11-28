import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Config } from "./config.types";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
	private _config: Partial<Config> = {};

	constructor(private _http: HttpClient) {}

	loadConfig(): Observable<Config> {
		return this._http.get<Config>('./assets/config/config.json')
			.pipe(tap((config: Config) => this._config = config));
	}

	getConfig(): Partial<Config> {
		return this._config;
	}

	getConfigByKey(key: string) {
		return this._config[key as keyof Config];
	}
}
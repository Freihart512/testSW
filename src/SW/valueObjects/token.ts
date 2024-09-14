import { NoEmptyString, PositiveNumber } from "../../Shared/valueObjects/primitives";
import { authenticateResponse } from "../types";

export default class Token {
  private _token!: NoEmptyString;
  private expires!: PositiveNumber;
  private readonly user: NoEmptyString;
  private readonly pass: NoEmptyString;
  private fetch: NetworkService;

  constructor(fetch: NetworkService, user: NoEmptyString, pass: NoEmptyString) {
    this.fetch = fetch;
    this.user = user;
    this.pass = pass;
  }

  private async getToken() {
    const { data, error } = await this.fetch.request<authenticateResponse>('/security/authenticate', {
      method: 'POST',
      headers: {
        user: this.user.value,
        password: this.pass.value
      }
    });

    if (data) {
      const { token, expires_in } = data.data
      this._token = new NoEmptyString(token, 'SW Token - Token From api');
      this.expires = new PositiveNumber(expires_in, { module: 'SW Token', name: 'InvalidExpiresValueError', context: 'SW Token - expires_in' })
    }
    else {
      throw error;
    }
  }

  get token() {
    return (async () => {
      if (this.expires.value > Date.now()) {
        return this._token
      }
      await this.getToken();
      return this._token
    })();
  }

}
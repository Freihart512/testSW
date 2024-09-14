import fetchService from "../services/fetch";
import { NoEmptyString } from "../Shared/valueObjects/primitives";
import Token from "./valueObjects/token";

const internalFetch = new fetchService(process.env.SW_BASE_URL || '')

class SwService {
  private readonly url: string;
  private readonly user: NoEmptyString;
  private readonly pass: NoEmptyString;
  private swToken!: Token;
  private readonly fetch: NetworkService;

  constructor(url: string, user: NoEmptyString, pass: NoEmptyString, fetch?: NetworkService) {
    this.url = url;
    this.user = user;
    this.pass = pass;
    this.fetch = fetch || internalFetch;
  }
}

export default SwService;

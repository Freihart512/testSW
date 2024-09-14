
import { NoEmptyString } from "../../Shared/valueObjects/primitives";
import { EmptyStringError } from "../../Shared/valueObjects/primitives/Errors";
// import EmptyPath from "./customErrors/emptyPath";


export default class fetchService implements NetworkService {
  private readonly _baseUrl: string;
  private readonly ERROR_CONTEXT = 'FETCH SERVICE';

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  async request<ResponseType>(path: string, fetchConfig: RequestInit): Promise<{ data?: ResponseType, error?: Error }> {
    try {
      const validPath = new NoEmptyString(path, this.ERROR_CONTEXT)
      const response = await fetch(`${this._baseUrl}${validPath.value}`, fetchConfig);
      const data = (await response) as ResponseType;
      return { data }
    } catch (error: any) {
      return { error }
    }
  }

}
interface NetworkService {
  request<ResponseType>(path: string, fetchConfig: RequestInit): Promise<{ data?: ResponseType, error?: Error }>
}

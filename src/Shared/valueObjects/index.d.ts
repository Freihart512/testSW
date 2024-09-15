type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }
interface CustomErrorContext {
  message?: string,
  module?: string,
  name?: string,
  context?: string,
  value?: unknown,
}

type StringOrNumber = string | number
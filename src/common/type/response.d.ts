export type OkResponse<T> = T & {
  message?: string
}

export type ErrorResponse = {
  statusCode: number
  message: string
  error: string
}

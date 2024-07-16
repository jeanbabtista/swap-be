/**
 * Firebase doesn't export error classes in the library, so this is a workaround to create a type that can be used to
 * check if an error is a FirebaseError.
 */

export interface ErrorInfo {
  code: string
  message: string
}

export interface FirebaseError {
  errorInfo: ErrorInfo
  get code(): string
  get message(): string
  toJSON(): ErrorInfo
}

export interface PrefixedFirebaseError extends FirebaseError {
  codePrefix: string
  hasCode(code: string): boolean
}

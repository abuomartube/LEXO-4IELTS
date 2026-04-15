export * from "./generated/api";
export * from "./generated/api.schemas";
export * from "./extra-hooks";
export { setBaseUrl, setAuthTokenGetter, setStudentEmailGetter } from "./custom-fetch";
export type { AuthTokenGetter, StudentIdentityGetter } from "./custom-fetch";

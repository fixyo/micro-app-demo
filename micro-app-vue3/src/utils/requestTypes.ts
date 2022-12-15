export enum ContentType {
  urlEncode = 'application/x-www-form-urlencoded',
  json = 'application/json; charset=utf-8',
  multipart = 'multipart/form-data'
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export interface RequestParams {
  [key: string]: any
}

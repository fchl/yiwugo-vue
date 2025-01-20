const responseBody = {
  errorMsg: '',
  timestamp: 0,
  data: null as unknown,
  errorCode: 0,
}

export function builder(data: unknown, message = 'success', code = 0) {
  responseBody.data = data

  if (message !== undefined && message !== null)
    responseBody.errorMsg = message

  if (code !== undefined && code !== 0)
    responseBody.errorCode = code

  responseBody.timestamp = new Date().getTime()
  return responseBody
}

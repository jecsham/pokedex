export interface ApiResponse {
  success: boolean;
  message: string;
  result: any;
}

/**
 * Return common json api response for all requests
 */
export function apiResponse(success: boolean, result: any): ApiResponse {
  return {
    success,
    message: success ? "Success operation" : result,
    result: success ? result : undefined,
  };
}

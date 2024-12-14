class ResponseHelper {
  success(message: string, data?: any) {
    if (!data) {
      return {
        success: true,
        status: 'success',
        message: message,
      };
    }
    return {
      success: true,
      status: 'success',
      message: message,
      data: data,
    };
  }

  error(message: string, data?: any) {
    if (!data) {
      return {
        success: false,
        status: 'failure',
        message: message,
      };
    }
    return {
      success: false,
      status: 'failure',
      message: message,
      error: data,
    };
  }
}
export default new ResponseHelper();

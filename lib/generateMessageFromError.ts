const generateMessageFromError = (error: any) => {
  let message = "Unhandled error";

  if (error.response?.data?.message) {
    // from server response
    message = error.response.data.message;
  }

  if (error.response?.data?.messages) {
    // from server response
    message = error.response.data.messages;
  }

  if (error.response?.messages) {
    // from server response
    message = error.response.messages;
  }

  if (error.response?.data?.msg) {
    // from server response
    message = error.response.data.msg;
  }

  if (error?.message) {
    message = error?.message;
  }

  if (error.response?.data?.error) {
    // from server response
    message = error.response.data.error;
  }

  return message;
};

export default generateMessageFromError;

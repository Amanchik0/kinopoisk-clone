export const handleError = (error: any): string => {
    if (error.response && error.response.data) {
      return error.response.data.message;
    }
    return error.message || 'Произошла ошибка';
  };
  
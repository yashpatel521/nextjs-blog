export const authorizationService = (token: string) => {
  if (token == "admin") {
    return true;
  } else {
    return false;
  }
};

export const HTTPCode = {
  OK: 200,
  DELETED: 204,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
};

export const STACKOVERFLOW_URL_USER = (userID: string): string =>
  `https://api.stackexchange.com/2.2/users/${userID}?order=desc&sort=reputation&site=stackoverflow`;

export const STACKOVERFLOW_URL_TAGS = (userID: string): string =>
  `https://api.stackexchange.com/2.2/users/${userID}/top-tags?page=1&pagesize=5&site=stackoverflow`;

export const badGetWakaTimeToast = {
  title: 'Something Went Wrong',
  status: 'error',
  description:
    'Could not retrieve your WakaTime Data from the URL provided. Please make sure that you put in the correct URL.',
};

export const badToast = {
  title: 'Something Went Wrong',
  status: 'error',
  description: 'Could not add integration to your account. Please try again later.',
};

export const goodToast = {
  title: 'Added Integration',
  status: 'success',
  description: 'We added this integration to your account',
};

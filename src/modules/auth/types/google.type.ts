export type GoogleUserType = {
  provider: string;
  providerId: string;
  email: string;
  name: string;
  picture: string;
};

export type GoogleProfileType = {
  id: string;
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
  };
  emails: Array<{
    value: string;
    verified: boolean;
  }>;
  photos: Array<{ value: string }>;
};

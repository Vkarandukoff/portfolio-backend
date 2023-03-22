export type TokensType = {
  access_token: string;
  refresh_token: string;
};

export type AccessTokenType = Pick<TokensType, 'access_token'>;

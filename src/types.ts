export interface PublicUserStructure {
  username: string;
  avatar: string;
}

export interface CredentialsUserStructure extends PublicUserStructure {
  password: string;
  email: string;
}

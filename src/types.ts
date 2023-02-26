export interface CredentialUserStructure {
  password: string;
  username: string;
}

export interface PublicUserStructure extends CredentialUserStructure {
  email: string;
  avatar: string;
}

export interface IFsPasswordConfig {
  minLength?: number; // min new password length
  enableCurrentPassword?: boolean; // enables current password
  exclude?: string[]; // excludes these words for new password,
  title?: string
}

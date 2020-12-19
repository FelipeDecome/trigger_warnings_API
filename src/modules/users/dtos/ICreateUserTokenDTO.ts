export default interface ICreateUserTokenDTO {
  user_id: string;
  type: 'reset' | 'confirmation';
}

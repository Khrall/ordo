import { IsDefined } from 'class-validator';

export class PhotoObject {
  @IsDefined()
  public name: string;

  @IsDefined()
  public hash: string;
}

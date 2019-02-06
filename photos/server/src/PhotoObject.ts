import { IsDefined } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class PhotoObject {
  @IsDefined()
  public name: string;

  @IsDefined()
  public hash: string;

  @IsDefined()
  public createdDate: Date;
}

export class UpsertContactByLineDto {
  // For query
  public citizenId?: string;
  // For query
  public tel?: string;
  public title?: string;
  public firstName?: string;
  public lastName?: string;

  // Line profile
  // line is userId
  // For query
  public luid?: string;
  // line is displayName
  public lineName?: string;
  // line is pictureUrl
  public imageProfile?: string;
  public email?: string;

  public addr01?: string;
  public street?: string;
  public subDistrict?: string;
  public district?: string;
  public province?: string;
  public zip?: string;
  public locationcode?: string;
  public remark?: string;
}

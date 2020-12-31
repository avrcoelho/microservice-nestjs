export interface IPostDTO {
  title: string;
  content: string;
  image?: string;
}

export default interface IUpdatePostDTO {
  id: string;
  data: IPostDTO;
}

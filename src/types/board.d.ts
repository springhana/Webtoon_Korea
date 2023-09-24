export interface BoardType {
  _id: string;
  userId: string;
  postNumber: number;
  author: string;
  title: string;
  content: string;
  date: string;
  image: string;
  likedIds: string[];
}
export interface Paging {
  totalPages: number;
  currentPage: number;
  result: Board[];
}
export interface SubscribeType {
  title: string[];
  userId: string;
  _id: string;
}

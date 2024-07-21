export interface ResponseType {
  success: boolean;
  message?: string;
  data?: any;
}

export interface PostType {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

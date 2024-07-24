export interface ResponseType {
  success: boolean;
  message?: string;
  data?: any;
}

export interface PostType {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author?: UserType;
}

export interface UserType {
  id: number;
  name: string;
  email: string;
}

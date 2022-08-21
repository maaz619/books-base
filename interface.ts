export interface BookType {
  id: number;
  image?: string;
  name: string;
  author: string;
  status: string;
}
export interface Props {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setBookData: React.Dispatch<React.SetStateAction<BookType[]>>;
  bookData: BookType[];
}

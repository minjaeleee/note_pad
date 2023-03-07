interface Memo {
  id : string;
  content: string;
  created_at: number;
  updated_at: number | null;
  deleted_at: number | null;
}

export default Memo;
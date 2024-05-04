export type GetTodos = Array<{
  done: boolean;
  due_date: string;
  id: number;
  category: string;
  title: string;
}>;

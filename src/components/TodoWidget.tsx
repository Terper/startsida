import { useMutation, useQuery } from "@tanstack/react-query";
import WidgetWrapper from "./WidgetWrapper";
import useKeyStore from "../utils/useKeyStore";
import WidgetError from "./WidgetError";
import WidgetLoader from "./WidgetLoader";
import "moment/dist/locale/sv";
import moment from "moment";
import { TrashIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { GetTodos } from "../types/GetTodos";
import { GetCategories } from "../types/GetCategories";

const CircleIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={className}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
    />
  </svg>
);

const categoryColors = {
  Hushåll: "bg-red-100 border border-red-300",
  Jobb: "bg-green-100 border border-green-300",
  Skola: "bg-blue-100 border border-blue-300",
};

const getTodos = async (key: string) => {
  if (!key) throw new Error("Lägg till din API nyckel i inställningarna");
  const response = await fetch("https://vm2208.kaj.pouta.csc.fi:8461/todos", {
    method: "GET",
    headers: {
      Authorization: key,
    },
  });
  if (response.ok === false) {
    if (response.status === 401) {
      throw new Error("Nyckeln är ogiltig");
    }
    throw new Error("Kunde inte ansluta");
  }
  return await response.json();
};

const getCategories = async (key: string) => {
  const response = await fetch(
    "https://vm2208.kaj.pouta.csc.fi:8461/categories",
    {
      method: "GET",
      headers: {
        Authorization: key,
      },
    }
  );
  return await response.json();
};

const doToggleDoneMutation = async (done: boolean, id: number, key: string) => {
  await fetch(`https://vm2208.kaj.pouta.csc.fi:8461/todos/${id}`, {
    method: "PUT",
    headers: {
      Authorization: key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ done: !done }),
  });
};

const doDeleteMutation = async (id: number, key: string) => {
  await fetch(`https://vm2208.kaj.pouta.csc.fi:8461/todos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: key,
    },
  });
};

const doNewMutation = async (
  key: string,
  title: string,
  category: string,
  due_date?: string
) => {
  type TodoItem = {
    title: string;
    category: string;
    due_date?: string;
  };
  const todoItem: TodoItem = {
    title,
    category,
  };
  // om due_date är satt lägg till det i objektet
  if (due_date) {
    todoItem.due_date = due_date;
  }
  await fetch(`https://vm2208.kaj.pouta.csc.fi:8461/todos`, {
    method: "POST",
    headers: {
      Authorization: key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoItem),
  });
};

const TodoWidget = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const { keys } = useKeyStore((state) => state);
  const { data, status, error, refetch } = useQuery<GetTodos>({
    queryKey: ["getTodos"],
    queryFn: () => getTodos(keys.todo!),
  });

  // körs bara ifall todos har hämtats, vilket betyder att nyckeln också är satt och korrekt
  const categories = useQuery<GetCategories>({
    queryKey: ["getCategories"],
    queryFn: () => getCategories(keys.todo!),
    enabled: !!data,
  });

  // mutationer för att uppdatera todos
  // refetch körs efter varje mutation för att uppdatera datan
  const toggleDoneMutation = useMutation({
    mutationFn: ({ done, id }: { done: boolean; id: number }) =>
      doToggleDoneMutation(done, id, keys.todo!),
    onSuccess: () => {
      refetch();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => doDeleteMutation(id, keys.todo!),
    onSuccess: () => {
      refetch();
    },
  });

  const newMutation = useMutation({
    mutationFn: (data: {
      title: string;
      category: string;
      due_date?: string;
    }) => doNewMutation(keys.todo!, data.title, data.category, data.due_date),
    onSuccess: () => {
      refetch();
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    newMutation.mutate({ title, category, due_date: date });
    setTitle("");
    setDate("");
    setCategory("");
  };

  const mutationIsLoading =
    toggleDoneMutation.isPending || deleteMutation.isPending;

  return (
    <WidgetWrapper
      name={"ToDo"}
      bgColor={"bg-green-100"}
      borderColor={"border-green-300"}
      isExpandable={true}
    >
      {status === "error" ? (
        <WidgetError message={error.message} refetch={refetch}></WidgetError>
      ) : status === "pending" ? (
        <WidgetLoader></WidgetLoader>
      ) : (
        <div className="divide-y divide-solid divide-green-300 flex flex-col">
          <div className="divide-y divide-solid divide-green-300 max-h-96 overflow-scroll flex flex-col">
            {data.map((todo) => (
              <div key={todo.id} className="py-2 px-4 flex justify-between">
                <div>
                  <div className="flex gap-4 items-center">
                    <div
                      className={`${
                        todo.done ? "line-through text-black/50" : ""
                      }`}
                    >
                      {todo.title}
                    </div>
                    <div
                      className={`rounded text-xs px-1 ${
                        categoryColors[
                          todo.category as keyof typeof categoryColors
                        ]
                      }`}
                    >
                      {todo.category}
                    </div>
                  </div>
                  {!!todo.due_date && !todo.done && (
                    <div className="text-xs">
                      {moment(todo.due_date).locale("sv").fromNow()}
                    </div>
                  )}
                </div>
                <div className={"flex items-center"}>
                  <button
                    className={mutationIsLoading ? "cursor-wait" : ""}
                    onClick={() =>
                      toggleDoneMutation.mutate({
                        done: todo.done,
                        id: todo.id,
                      })
                    }
                    disabled={mutationIsLoading}
                  >
                    {todo.done ? (
                      <CheckCircleIcon className="h-6 w-6 text-green-500" />
                    ) : (
                      <CircleIcon className="h-6 w-6" />
                    )}
                  </button>
                  <button
                    className={mutationIsLoading ? "cursor-wait" : ""}
                    onClick={() => deleteMutation.mutate(todo.id)}
                    disabled={mutationIsLoading}
                  >
                    <TrashIcon className="h-6 w-6 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <form
            className="py-2 px-4 flex flex-col gap-2"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="flex gap-2">
              <input
                required
                type="text"
                placeholder="Ny todo"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="border border-black rounded py-1 px-2 grow"
              ></input>
              <select
                required
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="border border-black rounded py-1 px-2 bg-white"
              >
                <option value="">Välj kategori</option>
                {categories.data &&
                  categories.data.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex justify-between">
              <input
                type="datetime-local"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="border border-black rounded py-1 px-2"
              ></input>
              <button
                disabled={newMutation.isPending}
                type="submit"
                className="bg-blue-500 rounded py-1 px-4 text-white"
              >
                {newMutation.isPending ? "Lägger till..." : "Skapa"}
              </button>
            </div>
          </form>
        </div>
      )}
    </WidgetWrapper>
  );
};

export default TodoWidget;

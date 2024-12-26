import { TaskProject } from "@/types/index";

type TaskListProps = {
  tasks: TaskProject[];
};

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
          <ul className="mt-5 space-y-5">
            {tasks?.length === 0 ? (
              <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
            ) : (
              tasks?.map((task) => <h1>{task.name}</h1>)
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

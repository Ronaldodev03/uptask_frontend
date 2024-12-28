# uptask_frontend

### manejo de errores

- Esto esta en los middlewares del back:
  'const error = new Error("Tarea no encontrada");
  res.status(404).json({ error: error.message });
  return;', lo que hace es crear un error con new Error, devolver una respuesta (res) con un status de no exito y el error (error.message --> "message" esta presente por crear el error con new Error()) y el return para la ejecucion del codigo.

- Still en el back (middlewares): Si en lugar de usar res para enviar la respuesta con un status de no exito mas el return hago un "throw error", donde el error fue el creado con new Error(), entonces iremos a el catch del try/catch y ahí tendriams que enviar algo como 'res.status(500).json({ error: "Internal Server Error" });', lo cual es un mensaje generico.

- En el front, en el folder api/ProjectAPI se lee en el catch las res con status de no exito y se hace un throw Error() con el mensaje de error, el cual llega al onError() de react query.

### useQuery de ReactQuery

- Si uso este mismo queryKey en otro useQuery para traer data entonces se traerá los datos cacheados, good.

- En editProjectView se coloca queryKey:['editProject', projectId] (2 valores en el array) porque el primer valor es igual para cada elemento que tiene acceso al componente EditProjectView y el 2dn si es unico para cada uno de esos elementos, entonces, no tendremos la consulta cacheada en ese caso.

- Cuando se usa queryFn y esa Fn tiene parametros, entonces se usa una callback. Ejm: () => getProjectById(projectId)

- En useQuery se puede usar retry false para que no intente hacer la peticion varias veces. ReactQuery intenta eso cuando tiene algun error e intenta encontrar respuestas, el default es 3 veces.

- En useQuery "isError" retorna booleano (true o false) y "error" retorna el error del backend.

- "enabled" lo que hace es solo permitir la consulta si la condicion es true. Ejm: enabled con !!taskId en EditTaskData.

### useMutation de ReactQuery

- mutate recibe un solo parametro, si se necesita enviarle varios entonces se pueden pasan como un solo objeto --> mutate(data), donde data ={formData, projectId}

- en editProjectForm se usa queryClient.invalidateQueries (con useQueryClient) para que descachee ya que se hizo un cambio en la data y queremos la data nueva (permite la realizacion de una nueva consulta).

### ZOD recommendation

- Solo haz schema para validar las res con GET, no es necesario validar todo lo demas (ejem: las res de PUT, POST, DELETE...).

### Types recommendation & notes

- Si necesito types para pros que se pasan a components, hazlas en el mismo component. Ejem: ProjectForm, editProjectForm, TaskForm, ...

- Objeto cuyas key y values sean strings random se tipea coomo --> { [key: string]: string }. Ejm: statusStyles en TaskList

- Doble signo de exclamacion al comienzo hace es transformar la variable a boolean (true si tiene data, false si no). Ejm: enabled con !!taskId en EditTaskData.

- const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("editTask")!; --> el signo de exclamacion le dice a TS que esta variable no será null.

- const params = useParams();
  const projectId = params.projectId!; --> el signo de exclamacion le dice a TS que esta variable no será undefined

### queries in URL

- Para mostrar modals se puede usar el pattern de hacerlo de acuerdo a la query de la url. Ejm: AddTaskModal en projectDetailsView con "?newTask=true" -->
  `  const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const modalTask = queryParams.get("newTask");
const show = modalTask ? true : false;`

- Para limpiar la URL (con el replace: true) -->
  ` const navigate = useNavigate()
navigate(location.pathname, { replace: true })`

### REACT TOASTIFY

- toast.error(error.message,
  { toastId: "error" }); --> el toastId es para que react no haga doble render del toast. Ejm: TaskModalDetail.

### Error handling

#### projects

- Lo que se ve en DashboardView depende de lo que venga en el useQuery (isLoading o data).

- Lo que se ve en ProjectDetailsView depende de lo que venga en el useQuery (isLoading, isError o data) --> Si isError te lleva a 404 --> isError puede venir si tiene un projectId incorrecto en la URL.

- Lo que se ve en EditProjectView depende de lo que venga en el useQuery (isLoading, isError o data) --> Si isError te lleva a 404 --> isError puede venir si tiene un projectId incorrecto en la URL.

- En createProjectView siempre se muestra el form (no depende de useQuery), lo que si, es que te puede dar mensaje de error si n se hace el guardado del project de forma correcta. Si si se guarda correctamente entonces redirecciona a DashboardView.

- AddTaskModal solo sale si newTask esta en la query de la URL (el valor es true) y projectId debe ser valido, sino va al 404. Si projectId no es valido estamos en la ruta ProjectDetailsView y vendrá un isError que manda al 404.

#### tasks

- EditTaskData & EditTaskModal estan conectados, el 1ero renderiza al 2nd. El 2nd sale en ProjectDetailsView, si no esta bien los id de la url manda al 404.

- TaskModalDetail tambien esta en ProjectDetailsView. En este caso, si hay un error en el taskId te manda un mensaje de tarea no encontrada y redirecciona al ProjectDetailsView (sin query en la URL).

### explicacion de componentes structure

- CreateProjectView y EditProjectForm (luego renderizado en EditProjectView) son sort of the same. La diferencia es que antes de usar el EditProjectView necesito traerme los datos (lo cual se hace en EditProjectView) y eso no es necesario en CreateProjectView.

- EditTaskData se hace para renderizar a EditTaskModal tal que solo tenga la responsabilidad de ser un modal y que renderize ya cuando haya la data (el useQuery se hace en EditTaskData).

- TaskModalDetail hace el fetch de la data en el propio componente (este componente es un modal)

- TaskList se renderiza en ProjectdetailsView y recide la data como prop.

- AddTaskModal es un modal normal, solo tiene useMutation y dentr tiene a TaskForm para rellenar (just like CreateProjectView would do).

### Status del Project en cuanto a front

- Tareas y projectos tienen el CRUD funcional.

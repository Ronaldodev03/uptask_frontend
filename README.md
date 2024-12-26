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

### useMutation de ReactQuery

- mutate recibe un solo parametro, si se necesita enviarle varios entonces se pueden pasan como un solo objeto --> mutate(data), donde data ={formData, projectId}

- en editProjectForm se usa queryClient.invalidateQueries (con useQueryClient) para que descachee ya que se hizo un cambio en la data y queremos la data nueva (permite la realizacion de una nueva consulta).

### ZOD recommendation

- Solo haz schema para validar las res con GET, no es necesario validar todo lo demas (ejem: las res de PUT, POST, DELETE...).

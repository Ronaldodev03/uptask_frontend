# uptask_frontend

### manejo de errores

- Esto esta en los middlewares del back:
  'const error = new Error("Tarea no encontrada");
  res.status(404).json({ error: error.message });
  return;', lo que hace es crear un error con new Error, devolver una respuesta (res) con un status de no exito y el error (error.message --> "message" esta presente por crear el error con new Error()) y el return para la ejecucion del codigo.

- Still en el back (middlewares): Si en lugar de usar res para enviar la respuesta con un status de no exito mas el return hago un "throw error", donde el error fue el creado con new Error(), entonces iremos a el catch del try/catch y ahí tendriams que enviar algo como 'res.status(500).json({ error: "Internal Server Error" });', lo cual es un mensaje generico.

- En el front, en el folder api/ProjectAPI se lee en el catch las res con status de no exito y se hace un throw Error() con el mensaje de error, el cual llega al onError() de react query.

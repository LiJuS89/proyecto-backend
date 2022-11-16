# proyecto-backend

El proyecto cuanta con las siguientes rutas:

/users/registrarUsuario para registrar un nuevo usuario.  
/users/iniciarSesion para iniciar sesión con un ususario ya registrado.  
/users/lista para obtener una lista con los usuarios registrados.  
/users/eliminarUsuario/:id para eliminar un usuario específico por medio de su id.  
/users/cerrarSesion para cerrar sesión.  
/reservas/crear para crear una nueva reserva.  
/reservas/editar/:id para editar una reserva específica por medio de su id.  
/reservas/lista para obtener una lista con las reservas guardadas.  
/reservas/id/:id para obtener una reserva específica mediante su id.  
/reservas/eliminar/:id para eliminar una reserva específica mediante su id.  
/reservas/feriadosNoLaborables se comunica con una API externa para consultar los ferdiados no laborables del año 2023.

Middlewares:  

auth: comprueba si se ha iniciado sesión.  
validarId y validarUserId: comprueba si un id existe.  
validarEmail: comprueba si un email ingresado ya fue usado.  
validarFecha: comprueba si una fecha ya fue reservada.  
validarDia: comprueba si el día ingresado se puede reservar.  
validarMes: comprueba que se haya ingresado un mes.  
validarTurno: comprueba que se haya ingresado un turno.

Información:  

Para obtener lista de usuarios, elimininar usuarios, cerrar sesión, crear reservas, editar reservas, obtener lista de reservas, obtener reserva por id, eliminar reserva y consultar feriados no laborables es necesario haber iniciado sesión antes. 
Para iniciar sesión es necesario registrarse.

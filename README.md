# validandoFormularios

El siguiente paso es validar los campos del formulario cuando se envía. Se agrega un evento de escucha al elemento con el ID "formulario" para capturar el evento de envío.

    document.getElementById('form').addEventListener('submit', (event) => {
      event.preventDefault();
      // validate code
    });

Dentro del evento de envío, realizamos la validación de los campos del formulario uno por uno.

### Validación del campo de nombre

    let entradaNombre = document.getElementById('name');
    let errorNombre = document.getElementById('nameError');
    
    if (nameEntry.value.trim() === '') {
      nameError.textContent = 'Please, input your name';
      nameError.classList.add('error-message');
    } else {
      nameError.textContent = '';
      nameError.classList.remove('error-message');
    }

Verificamos si el valor del campo de nombre está en blanco. Si es así, mostramos un mensaje de error y aplicamos una clase CSS para resaltar el error. De lo contrario, eliminamos cualquier mensaje de error y la clase CSS correspondiente.

### Validación del correo electrónico

    let emailEntry = document.getElementById('email');
    let emailError = document.getElementById('emailError');
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //  basic validation pattern
    
    if (!emailPattern.test(emailEntry.value)) {
      emailError.textContent = 'Please, input a email'; 
      emailError.classList.add('error-message');
    } else {
      emailError.textContent = '';
      emailError.classList.remove('error-message');
    }

Utilizamos una expresión regular (`emailPattern`) para validar el formato básico de una dirección de correo electrónico. Si el valor del campo de correo electrónico no cumple con el patrón, mostramos un mensaje de error y aplicamos la clase CSS correspondiente.

### Validación de la contraseña

    let passwordEntry = document.getElementById('password');
    let passwordEntry = document.getElementById('passwordError');
    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    
    if (!passwordPattern.test(passwordEntry.value)) {
      passwordError.textContent = 'The password you must have 8 characters, numbers, capital letters, lowcase and special characters';
      passwordError.classList.add('error-message');
    } else {
      passwordError.textContent = '';
      passwordError.classList.remove('error-message');
    }

Utilizamos otra expresión regular (`contrasenaPattern`) para validar la contraseña. La contraseña debe tener entre 8 y 15 caracteres, al menos una letra minúscula, una letra mayúscula, un número y un carácter especial. Si la contraseña no cumple con el patrón, mostramos un mensaje de error y aplicamos la clase CSS correspondiente.

### Envío del formulario y almacenamiento en Firebase

    if (!nameError.textContent && !emailError.textContent && !passwordError.textContent) {
      db.collection("users").add({
        nombre: nameEntry.value,
        email: emailEntry.value,
        password: passwordEntry.value
      })
      .then((docRef) => {
        alert('Form to send with success', docRef.id);
        document.getElementById('form').reset();
      })
      .catch((error) => {
        alert(error);
      });
    }

Si no hay mensajes de error en ninguno de los campos, procedemos a enviar el formulario. Utilizamos la función `add()` de Firestore para agregar un nuevo documento a la colección "users" en la base de datos de Firebase. El documento contiene los valores ingresados en los campos del formulario. Si el envío es exitoso, mostramos una alerta con un mensaje de éxito y restablecemos el formulario. Si ocurre algún error, mostramos una alerta con el mensaje de error.


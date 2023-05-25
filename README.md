# Front-end Test Gradiweb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.1.

## Explicación del proyecto

- La autenticación se realiza con firebase de google, por el momento cualquier cuenta de google podrá acceder, claramente esto puede modificarse según el requerimiento

- Al acceder, lo primero que se mostrará es el home, cuenta con un formulario de registro de vehículos en el cuál se solicitarán los datos de: Tipo, marca, placa y usuario propietario

- No será posible crear el vehículo si alguno de los campos está vacío

- Los campos de marca y usuarios, son selects que se llenan desde el api de laravel

- Al crear un vehículo, se mostrará un mensaje confirmando su creación en caso de ser exitoso, en caso de no serlo, mostrará un mensaje de error

- En la parte inferior, se muestra una sencilla tabla, la cuál lista los vehículos que tiene cada marca, los nombres de las marcas aparecen con la primera letra en mayúscula sin importar como estén en la base de datos, tal como lo solicitaba el requerimiento

Nota: En la ruta "src/environments/environment.ts" se encuentra una variable llamada "Vehicles_api_url", aquí debe especificarse la ruta del servidor laravel o del api a consumir adicionando '/api/' a dicha ruta, ejemplo: Vehicles_api_url: "http://localhost:8001/api/", preferibleme probarlo localmente con el fin de evitar problemas de cors

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
</head>
<php>
</php>
    <body>
    <h1>
        Solicitud para cambiar la contraseña
</h1>
Hola {{ $user->name }}, se ha solicitado un restablecimiento de su
contraseña. <br> Para continuar con el proceso haga click en el siguiente link e introduzca el siguiente código:
<h2>
    {{$code}}
</h2>
<a href="{{ url('/recover/' . $user->id) }}">Restablecer contraseña</a>.
<br>
    </body>
</html>

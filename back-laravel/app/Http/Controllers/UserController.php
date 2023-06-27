<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\User;
use App\Models\blog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Throwable;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8'
        ]);
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password'))
        ]);

        event(new Registered($user));
        Auth::login($user);
        $user = User::where('email', $request->email)->first();
        return response()->json([
            'name' => $user->name,
            'email' => $user->email
        ]);

    }

    public function login(Request $request)
    {

        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        try {
            $user = User::where('email', $request->email)->first();

        } catch (Throwable $e) {
        }
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Credenciales inválidas',
            ], 401);
        }
        $token = $user->createToken('remember_token')->plainTextToken;
        $user->remember_token =  $token;
         $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Inicio de sesión exitoso',
            'token' => $token,
            'email'=>$user->email,
            'name'=>$user->name,
            'id'=>$user->id,
            'password'=>$user->password
        ]);
    }

    public function loginportoken(Request $request)
    {


        try {
            $user = User::where('remember_token', $request->token)->first();
            $blog = Blog::where('autor_id', $user->id)->first();
            $categorias = Category::where('created_at', null)->get();
        } catch (Throwable $e) {

        }

        return response()->json([
            'user' => $user,
            'blog' => $blog,
            'categorias' => $categorias
        ], 200);

    }

    public function logout(Request $request){

        $user = User::where('email', $request->email)->first();
        Auth::logout();
    }

    public function datauser(Request $request){
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['error' => 'El usuario no existe'], 404);
        }else{
            return response()->json($user);
        }
    }

    public function editarusu(Request $request) {
        $user = User::where('email', $request->email)->first();

        $user->name = $request->filled('name') ? $request->name : $user->name;
        $user->email = $request->filled('email') ? $request->email : $user->email;
        $user->password = $request->filled('password') ? Hash::make($request->password) : $user->password;

        $user->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Usuario editado',
            'name' => $user->name,
            'email' => $user->email,
            'password' => $user->password,
            'id' => $user->id
        ]);
    }

}

<?php

namespace App\Http\Controllers;

use App\Models\User;
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
        ]);
    }
    public function logout(Request $request){

        $user = User::where('email', $request->email)->first();
        Auth::logout();
    }
}

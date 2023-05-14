<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;

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
            'password' => bcrypt($request->input('password'))
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

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {

            $user = User::where('email', $request->email)->first();
            $user->save();

            Auth::login($user);
            return response()->json([
                'name' => $user->name,
                'email' => $user->email

            ]);
        } else {
            return response()->json([
                'message' => 'Invalid email or password'
            ]);
        }
    }
}

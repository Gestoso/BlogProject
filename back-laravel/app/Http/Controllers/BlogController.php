<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use App\Models\blog;


class BlogController extends Controller
{
    public function createblog(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'categoria' => 'required',
            'contenido' => 'required'
        ]);
        $blog = Blog::create([
            'name' => $request->input('name'),
            'categoria' => $request->input('categoria'),
            'contenido' => $request->input('contenido'),
            'autor_id' => $request->input('user_id')
        ]);
        event(new Registered($blog));
        $blog = Blog::where('autor_id', $request->input('user_id'))->first();

        return response()->json([
            'blog' => $blog
        ]);
    }
}

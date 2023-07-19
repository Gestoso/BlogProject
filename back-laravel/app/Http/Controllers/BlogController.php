<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use App\Models\blog;
use Carbon\Carbon;



class BlogController extends Controller
{
    public function createblog(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'categoria' => 'required',
            'contenido' => 'required'
        ]);
        $blog = Blog::create([
            'title' => $request->input('title'),
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

public function continueblog(Request $request){
    $blog = Blog::where('blog_id', $request->blog_id)->first();


        $contenido = $blog->contenido;

        $contenido .= ' ' . $request->contenido;
        $blog->contenido = $contenido;
        $blog->save();


    return response()->json([
        'blog' => $blog
    ]);
}

public function deleteblog(Request $request) {
    $blog = Blog::where('blog_id', $request->blog_id)->first();
    $blog->delete();

}

public function getblogs(Request $request){
    $categoria = $request->query('categoria');

    $blogs = Blog::where('categoria', $categoria)->join('users', 'blogs.autor_id', '=', 'users.id')->select('*')->get();

    $datos = array();
    foreach ($blogs as $blog) {
        $datos[] = array(
            "title" => $blog['title'],
            "autor_id" => $blog['autor_id'],
            "autor_name" => $blog['name'],
            "contenido" => $blog['contenido'],
            "created_at" => $blog['created_at'],
            "updated_at" => $blog['updated_at'],
        );
    }

    return response()->json($datos);
}
}

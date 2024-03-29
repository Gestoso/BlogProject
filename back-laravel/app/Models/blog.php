<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class blog extends Model
{
    use HasFactory;
    protected $primaryKey = 'blog_id';

    protected $fillable = [
        'title',
        'categoria',
        'contenido',
        'autor_id'
    ];
}

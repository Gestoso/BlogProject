<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id('blog_id');
            $table->string('name');
            $table->string('categoria');
            $table->string('contenido');
            $table->unsignedBigInteger('autor_id');
            $table->timestamps();

            $table->foreign('autor_id')->references('id')->on('users');
        });     }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

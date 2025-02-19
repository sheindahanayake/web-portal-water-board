<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDevelopmentWorksTable extends Migration
{
    public function up()
    {
        Schema::create('development_works', function (Blueprint $table) {
            $table->id();
            $table->string('category');
            $table->string('allocation');
            $table->string('projects');
            $table->string('progress');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('development_works');
    }
}

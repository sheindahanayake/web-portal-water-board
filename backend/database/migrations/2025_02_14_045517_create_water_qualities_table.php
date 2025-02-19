<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWaterQualitiesTable extends Migration
{
    public function up()
    {
        Schema::create('water_qualities', function (Blueprint $table) {
            $table->id();
            $table->string('rawWater');
            $table->string('treatedWaterTP');
            $table->string('treatedWaterDistribution');
            $table->text('wqIssues');
            $table->string('region'); // Add region column
            $table->string('item'); // Add item column
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('water_qualities');
    }
}
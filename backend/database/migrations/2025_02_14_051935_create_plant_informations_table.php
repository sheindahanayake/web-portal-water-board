<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlantInformationsTable extends Migration
{
    public function up()
    {
        Schema::create('plant_informations', function (Blueprint $table) {
            $table->id();
            $table->text('schemeBrief');
            $table->string('designedPlantCapacity');
            $table->string('operationalCapacity');
            $table->string('waterSource');
            $table->string('approvedExtractionQuantity');
            $table->string('treatmentPlant');
            $table->string('coverage');
            $table->text('photos')->nullable();
            $table->string('region'); // Add region column
            $table->string('item'); // Add item column
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('plant_informations');
    }
}
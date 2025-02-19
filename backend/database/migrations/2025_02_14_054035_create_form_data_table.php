<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFormDataTable extends Migration
{
    public function up()
    {
        Schema::create('form_data', function (Blueprint $table) {
            $table->id();
            $table->json('connectionGrowth');
            $table->json('connectionTarget');
            $table->json('collectionTargetAchieved');
            $table->json('billingTarget');
            $table->json('billingTargetAchieved');
            $table->json('income');
            $table->json('expenditure');
            $table->json('expenditureCategorization');
            $table->json('currentDebtage');
            $table->json('operationalRatio');
            $table->json('staffPer1000Connection');
            $table->json('nrw');
            $table->json('perConnectionIncome');
            $table->json('perCumCost');
            $table->json('specificEnergy');
            $table->text('wspStatus');
            $table->json('connections');
            $table->string('region'); // Add region column
            $table->string('item'); // Add item column
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('form_data');
    }
}
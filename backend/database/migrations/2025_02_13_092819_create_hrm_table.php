<?php
// filepath: /database/migrations/xxxx_xx_xx_xxxxxx_create_hrm_table.php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHrmTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hrm', function (Blueprint $table) {
            $table->id();
            $table->string('cadreApproved');
            $table->string('permanentStaff');
            $table->string('contractStaff');
            $table->string('serviceHiringStaff');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hrm');
    }
}
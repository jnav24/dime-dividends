<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDividends extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dividends', function (Blueprint $table) {
            $table->id();
            $table->string('ticker', 8);
            $table->string('name');
            $table->float('yield');
            $table->float('amount_per_share');
            $table->float('payout_ratio');
            $table->enum('frequency', ['monthly', 'quarterly', 'annually', 'biannually']);
            $table->timestamp('next_payout_at');
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
        Schema::dropIfExists('dividends');
    }
}

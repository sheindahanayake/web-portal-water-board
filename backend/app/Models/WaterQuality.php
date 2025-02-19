<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WaterQuality extends Model
{
    use HasFactory;

    protected $fillable = [
        'rawWater',
        'treatedWaterTP',
        'treatedWaterDistribution',
        'wqIssues',
        'region', // Add region to fillable
        'item', // Add item to fillable
    ];
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlantInformation extends Model
{
    use HasFactory;

    protected $fillable = [
        'schemeBrief',
        'designedPlantCapacity',
        'operationalCapacity',
        'waterSource',
        'approvedExtractionQuantity',
        'treatmentPlant',
        'coverage',
        'photos',
        'region', // Add region to fillable
        'item', 
    ];

    protected $casts = [
        'photos' => 'array',
    ];
}
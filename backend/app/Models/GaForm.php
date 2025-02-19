<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GaForm extends Model
{
    protected $fillable = ['data'];

    protected $casts = [
        'data' => 'array'
    ];
}

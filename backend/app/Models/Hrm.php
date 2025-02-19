<?php
// filepath: /app/Models/Hrm.php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hrm extends Model
{
    use HasFactory;

    // Define the table name
    protected $table = 'hrm'; // Ensure this matches your actual table name

    // Define the fillable properties to allow mass assignment
    protected $fillable = [
        'cadreApproved',
        'permanentStaff',
        'contractStaff',
        'serviceHiringStaff',
    ];
}
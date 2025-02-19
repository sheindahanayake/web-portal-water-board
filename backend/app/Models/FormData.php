<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormData extends Model
{
    use HasFactory;

    protected $fillable = [
        'connectionGrowth',
        'connectionTarget',
        'collectionTargetAchieved',
        'billingTarget',
        'billingTargetAchieved',
        'income',
        'expenditure',
        'expenditureCategorization',
        'currentDebtage',
        'operationalRatio',
        'staffPer1000Connection',
        'nrw',
        'perConnectionIncome',
        'perCumCost',
        'specificEnergy',
        'wspStatus',
        'connections',
        'region', // Add region to fillable
        'item', // Add item to fillable
        'user_id', // Add user_id to fillable
    ];

    protected $casts = [
        'connectionGrowth' => 'array',
        'connectionTarget' => 'array',
        'collectionTargetAchieved' => 'array',
        'billingTarget' => 'array',
        'billingTargetAchieved' => 'array',
        'income' => 'array',
        'expenditure' => 'array',
        'expenditureCategorization' => 'array',
        'currentDebtage' => 'array',
        'operationalRatio' => 'array',
        'staffPer1000Connection' => 'array',
        'nrw' => 'array',
        'perConnectionIncome' => 'array',
        'perCumCost' => 'array',
        'specificEnergy' => 'array',
        'connections' => 'array',
    ];
}
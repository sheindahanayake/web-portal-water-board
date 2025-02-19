<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormData;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class FormDataController extends Controller
{
    public function store(Request $request)
    {
        Log::info('Incoming request data:', $request->all()); // Log the incoming request data

        $validatedData = $request->validate([
            'connectionGrowth' => 'required|array',
            'connectionTarget' => 'required|array',
            'collectionTargetAchieved' => 'required|array',
            'billingTarget' => 'required|array',
            'billingTargetAchieved' => 'required|array',
            'income' => 'required|array',
            'expenditure' => 'required|array',
            'expenditureCategorization' => 'required|array',
            'currentDebtage' => 'required|array',
            'operationalRatio' => 'required|array',
            'staffPer1000Connection' => 'required|array',
            'nrw' => 'required|array',
            'perConnectionIncome' => 'required|array',
            'perCumCost' => 'required|array',
            'specificEnergy' => 'required|array',
            'wspStatus' => 'required|string',
            'connections' => 'required|array',
            'region' => 'required|string|max:255', // Add validation for region
            'item' => 'required|string|max:255', // Add validation for item
        ]);

        Log::info('Validated data:', $validatedData); // Log the validated data

        // Add the authenticated user's ID to the validated data
        $userId = Auth::id();
        Log::info('Authenticated user ID:', ['user_id' => $userId]); // Log the authenticated user ID
        $validatedData['user_id'] = $userId;

        $formData = FormData::create($validatedData);

        return response()->json(['message' => 'Form data submitted successfully', 'data' => $formData], 201);
    }

    public function index()
    {
        $formData = FormData::all();
        return response()->json($formData);
    }
}
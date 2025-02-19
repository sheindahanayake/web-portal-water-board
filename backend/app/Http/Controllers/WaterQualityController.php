<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WaterQuality;
use Illuminate\Support\Facades\Log;

class WaterQualityController extends Controller
{
    public function store(Request $request)
    {
        Log::info('Incoming request data:', $request->all()); // Log the incoming request data

        $validatedData = $request->validate([
            'rawWater' => 'required|string|max:255',
            'treatedWaterTP' => 'required|string|max:255',
            'treatedWaterDistribution' => 'required|string|max:255',
            'wqIssues' => 'required|string',
            'region' => 'required|string|max:255', // Add validation for region
            'item' => 'required|string|max:255', // Add validation for item
        ]);

        Log::info('Validated data:', $validatedData); // Log the validated data

        $waterQuality = WaterQuality::create($validatedData);

        return response()->json(['message' => 'Water quality data submitted successfully', 'data' => $waterQuality], 201);
    }

    public function index()
    {
        try {
            $waterQualityData = WaterQuality::all();
            return response()->json($waterQualityData);
        } catch (\Exception $e) {
            Log::error('Error fetching water quality data: ' . $e->getMessage());
            return response()->json(['error' => 'Error fetching water quality data'], 500);
        }
    }
}
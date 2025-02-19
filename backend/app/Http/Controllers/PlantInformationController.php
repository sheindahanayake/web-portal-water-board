<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PlantInformation;
use Illuminate\Support\Facades\Log;

class PlantInformationController extends Controller
{
    public function store(Request $request)
    {
        Log::info('Incoming request data:', $request->all()); // Log the incoming request data

        $validatedData = $request->validate([
            'schemeBrief' => 'required|string',
            'designedPlantCapacity' => 'required|string|max:255',
            'operationalCapacity' => 'required|string|max:255',
            'waterSource' => 'required|string|max:255',
            'approvedExtractionQuantity' => 'required|string|max:255',
            'treatmentPlant' => 'required|string|max:255',
            'coverage' => 'required|string|max:255',
            'photos' => 'nullable|array',
            'photos.*' => 'nullable|file|mimes:jpg,jpeg,png,bmp,gif,svg,webp',
            'region' => 'required|string|max:255',
            'item' => 'required|string|max:255',
        ]);

        Log::info('Validated data:', $validatedData); // Log the validated data

        // Handle file uploads
        if ($request->hasFile('photos')) {
            $photos = [];
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('photos', 'public');
                $photos[] = $path;
            }
            $validatedData['photos'] = json_encode($photos);
        }

        $plantInformation = PlantInformation::create($validatedData);

        return response()->json(['message' => 'Plant information submitted successfully', 'data' => $plantInformation], 201);
    }

    public function index()
    {
        $plantInformation = PlantInformation::all();
        return response()->json($plantInformation);
    }
}
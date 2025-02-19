<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GaForm;
use Illuminate\Support\Facades\Storage;

class GaFormController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'category' => 'required|string',
                'description' => 'required|string',
                'photos' => 'nullable',
                'photos.*' => 'file|image|max:5120',
                'certificates' => 'nullable',
                'certificates.*' => 'file|mimes:pdf,jpg,jpeg,png|max:5120',
            ]);

            $formData = [
                'category' => $request->input('category'),
                'description' => $request->input('description'),
                'photos' => [],
                'certificates' => []
            ];

            // Handle photos
            if ($request->hasFile('photos')) {
                foreach ($request->file('photos') as $photo) {
                    $path = $photo->store("ga-form/{$formData['category']}/photos", 'public');
                    $formData['photos'][] = [
                        'name' => $photo->getClientOriginalName(),
                        'path' => $path,
                        'type' => $photo->getMimeType()
                    ];
                }
            }

            // Handle certificates
            if ($request->hasFile('certificates')) {
                foreach ($request->file('certificates') as $certificate) {
                    $path = $certificate->store("ga-form/{$formData['category']}/certificates", 'public');
                    $formData['certificates'][] = [
                        'name' => $certificate->getClientOriginalName(),
                        'path' => $path,
                        'type' => $certificate->getMimeType()
                    ];
                }
            }

            $gaForm = GaForm::create([
                'data' => $formData
            ]);

            return response()->json([
                'message' => 'Form submitted successfully',
                'data' => $gaForm
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while processing your request',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function index()
    {
        $gaFormData = GaForm::all();
        return response()->json($gaFormData);
    }
}

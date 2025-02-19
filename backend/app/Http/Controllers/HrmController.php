<?php
// filepath: /app/Http/Controllers/HrmController.php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hrm;
use Illuminate\Support\Facades\Log;

class HrmController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'cadreApproved' => 'required|string',
                'permanentStaff' => 'required|string',
                'contractStaff' => 'required|string',
                'serviceHiringStaff' => 'required|string',
            ]);

            $hrm = Hrm::create($validatedData);

            Log::info('Form submitted successfully', ['data' => $hrm]);

            return response()->json(['message' => 'Form submitted successfully', 'data' => $hrm], 201);
        } catch (\Exception $e) {
            Log::error('Error submitting form', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['message' => 'Error submitting form', 'error' => $e->getMessage()], 500);
        }
    }

    public function index()
    {
        $hrmData = Hrm::all();
        return response()->json($hrmData);
    }
}
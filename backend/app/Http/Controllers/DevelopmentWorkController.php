<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DevelopmentWork;
use Illuminate\Support\Facades\Log;

class DevelopmentWorkController extends Controller
{
    public function store(Request $request)
    {
        Log::info('Incoming request data:', $request->all()); // Log the incoming request data

        $validatedData = $request->validate([
            '*.category' => 'required|string|max:255',
            '*.allocation' => 'required|string|max:255',
            '*.projects' => 'required|string|max:255',
            '*.progress' => 'required|string|max:255',
        ]);

        Log::info('Validated data:', $validatedData); // Log the validated data

        foreach ($validatedData as $data) {
            DevelopmentWork::create($data);
        }

        return response()->json(['message' => 'Development work data submitted successfully'], 201);
    }

    public function index()
    {
        $developmentWorkData = DevelopmentWork::all();
        return response()->json($developmentWorkData);
    }
}
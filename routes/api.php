<?php

use App\Http\Controllers\NoteController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:api')->group(function () {
    Route::get('test', function (){
        return response()->json([
            'success' => true,
            'message' => 'test success',
        ]);
    });


    Route::apiResource('notes', NoteController::class);
});



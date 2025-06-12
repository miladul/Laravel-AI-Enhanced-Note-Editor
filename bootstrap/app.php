<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Log;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->renderable(function (Throwable $exception, Request $request) {
            if ($exception instanceof AuthenticationException) {
                Log::error('AuthenticationException error: ' . $exception->getMessage() . ' - Line: ' . $exception->getLine());

                if ($request->ajax() || $request->wantsJson()) {
                    return response()->json([
                        'message' => 'Unauthenticated',
                        'success' => false,
                    ], 401);
                }

                return redirect()->route('home')->with('error', 'You need to log in to access this page.');
            }
        });

    })->create();

<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Daftarkan alias middleware di sini
        $middleware->alias([
            'CheckAuthMiddleware' => \App\Http\Middleware\CheckAuthMiddleware::class,
        ]);

        // Kalau mau middleware global (selalu jalan), bisa pakai:
        // $middleware->append(\App\Http\Middleware\LogRequest::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })
    ->create();

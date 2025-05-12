<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Route::get('/', function () {
//    return Inertia::render('Welcome', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
//});

Route::middleware('guest')->group(function () {
    Route::match(['get','post'], '/login', [\App\Http\Controllers\AuthController::class, 'login'])->name('login');
});

Route::middleware('auth')->group(function () {
    Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])->name('home');
    Route::match(['get','post'],'/sites', [\App\Http\Controllers\SiteController::class, 'index']);
    Route::post('/sites/activation-code', [\App\Http\Controllers\SiteController::class, 'generateActivationCode']);
    Route::get('/sheeps', [\App\Http\Controllers\SheepController::class, 'index']);
    Route::get('/users', [\App\Http\Controllers\UserController::class, 'index']);
    Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout'])
        ->name('logout');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

//Route::middleware('auth')->group(function () {
//    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
//});

require __DIR__.'/auth.php';

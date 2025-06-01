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
    Route::put('/sites/{id}', [\App\Http\Controllers\SiteController::class, 'update']);
    Route::delete('/sites/{site}', [\App\Http\Controllers\SiteController::class, 'destroy']);
    Route::post('/sites/activation-code', [\App\Http\Controllers\SiteController::class, 'generateActivationCode']);
    Route::post('/sites/getInvitationCode', [\App\Http\Controllers\SiteController::class, 'generateInvitationCode']);
    Route::post('/sites/invitation-code', [\App\Http\Controllers\SiteController::class, 'invitationCreate']);

    Route::get('/sites/advanced/{id}', [\App\Http\Controllers\SiteController::class, 'advanced']);

    Route::get('/sheeps', [\App\Http\Controllers\SheepController::class, 'index']);

    Route::get('/broadcast', [\App\Http\Controllers\MessageController::class, 'index']);
    Route::get('/broadcast/create/email', [\App\Http\Controllers\MessageController::class, 'emailBroadcast']);
    Route::post('/broadcast/store/email', [\App\Http\Controllers\MessageController::class, 'emailStore']);

    Route::get('/broadcast/create/whatsapp', [\App\Http\Controllers\MessageController::class, 'waBroadcast']);

    Route::get( '/tasks', [\App\Http\Controllers\TaskController::class, 'index']);
    Route::match(['get','post'], '/tasks/create', [\App\Http\Controllers\TaskController::class, 'create']);
    Route::get('/tasks/edit/{id}', [\App\Http\Controllers\TaskController::class, 'edit']);
    Route::post('/tasks/{id}', [\App\Http\Controllers\TaskController::class, 'update']);
    Route::get('/tasks/played', [\App\Http\Controllers\TaskController::class, 'played']);

    Route::get( '/topup', [\App\Http\Controllers\TopupController::class, 'index']);
    Route::match(['post','get'],'/topup/create', [\App\Http\Controllers\TopupController::class, 'create']);

    Route::match(['post','get'],'/setting/bank', [\App\Http\Controllers\SettingController::class, 'bank']);
    Route::put('/setting/bank/{id}', [\App\Http\Controllers\SettingController::class, 'updateBank']);
    Route::delete('/setting/bank/{managementBank}', [\App\Http\Controllers\SettingController::class, 'destroyBank']);

    Route::match(['post','get'],'/setting/customer-service', [\App\Http\Controllers\SettingController::class, 'cs']);
    Route::put('/setting/customer-service/{id}', [\App\Http\Controllers\SettingController::class, 'updateCS']);
    Route::delete('/setting/customer-service/{managementCS}', [\App\Http\Controllers\SettingController::class, 'destroyCS']);

    Route::match(['get','post'],'/users', [\App\Http\Controllers\UserController::class, 'index']);
    Route::put('/users/{id}', [\App\Http\Controllers\UserController::class, 'update']);
    Route::delete('/users/{user}', [\App\Http\Controllers\UserController::class, 'destroy']);
    Route::post('/users/random-passwd', [\App\Http\Controllers\UserController::class, 'randomPassword']);

    Route::match(['get','put'],'/profile', [\App\Http\Controllers\UserController::class, 'profile']);
    Route::match(['get','post'],'/change-password', [\App\Http\Controllers\UserController::class, 'changePassword']);

    Route::post('/api/sites/getInvitationCodes', [\App\Http\Controllers\SiteController::class, 'getInvitationCodes']);

    Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout'])
        ->name('logout');
});

Route::get('/telebot', [\App\Http\Controllers\BotController::class, 'index']);
Route::get('/whatsapp', [\App\Http\Controllers\BotController::class, 'whatsapp']);
Route::post('/whatsapp', [\App\Http\Controllers\BotController::class, 'whatsappStore']);
Route::match(['get','post'],'/wa-fonnte', [\App\Http\Controllers\BotController::class, 'wa_fonnte']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

//Route::middleware('auth')->group(function () {
//    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
//});

require __DIR__.'/auth.php';

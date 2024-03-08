<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/',function(){
return view('frontend.index');
});


Route::middleware(['admin'])->group(function () {
    Route::get('/dashboard', function () {
        return view('admin.dashboard');
    })->name('dashboard');;
});

Route::get('/login', function () {
    if(Auth::user()){
        return view('admin.dashboard');
    }
    return view('auth.login');
})->name('auth.login');

Route::post('/login',[AuthController::class,'login'])->name('login');


Route::get('/logout',[AuthController::class,'logOut'])->name('logout');


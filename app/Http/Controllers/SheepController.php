<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SheepController extends Controller
{
    public function index()
    {
        return inertia('Sheep/Main');
    }
}

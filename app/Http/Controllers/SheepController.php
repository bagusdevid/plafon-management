<?php

namespace App\Http\Controllers;

use App\Models\Sheep;
use Illuminate\Http\Request;

class SheepController extends Controller
{
    public function index()
    {
        $data['sheeps'] = Sheep::all();

        return inertia('Sheep/Main', $data);
    }
}

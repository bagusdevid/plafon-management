<?php

namespace App\Http\Controllers;

use App\Models\Site;
use Illuminate\Http\Request;

class SiteController extends Controller
{
    public function index(Request $request)
    {
        if($request->isMethod('post')) {
            $request->validate([
                'name' => ['required'],
                'domain' => ['required'],
                'activation_code' => ['required']
            ]);

            $data_site = [
                'name' => $request->name,
                'domain' => $request->domain,
                'activation_code' => $request->activation_code
            ];

            Site::create($data_site);

            return back()
                ->with('message', 'Data successfully added.');
        }

        $data['sites'] = Site::all();

        return inertia('Sites/Main', $data);
    }

    public function generateActivationCode()
    {
        $code = fake()->regexify('[A-Za-z0-9]{12}');

        return response()
            ->json([
                'results' => $code
            ]);
    }
}

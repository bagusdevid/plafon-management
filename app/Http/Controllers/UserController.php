<?php

namespace App\Http\Controllers;

use App\Models\Site;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    public function index(Request $request)
    {
        if($request->isMethod('post')) {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
                'password' => ['required', Rules\Password::defaults()],
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'active' => $request->active
            ]);

            return back()
                ->with('message', 'Data successfully added.');
        }

        $data['users'] = User::all();

        return inertia('User/Main', $data);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
        ]);

        $user::where('id', $request->id)
            ->update([
                'name' => $request->name,
                'email' => $request->email,
                'active' => $request->active
            ]);

        return back()
            ->with('message', 'Data successfully updated.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return back()
            ->with('message', 'Data successfully deleted.');
    }

    public function randomPassword()
    {
        $code = fake()->regexify('[A-Za-z0-9]{10}');

        return response()
            ->json([
                'results' => $code
            ]);
    }

    public function profile(Request $request)
    {
        if($request->isMethod('put')) {
            $request->validate([
                'name' => ['required'],
                'email' => ['required', 'email']
            ]);

            User::where('id', Auth::user()['id'])
                ->update([
                    'name' => $request->name,
                    'email' => $request->email
                ]);

            return back()
                ->with('message', 'Data successfully updated');
        }

        return inertia('User/Profile');
    }

    public function changePassword(Request $request)
    {
        if($request->isMethod('post')) {
            $validated = $request->validate([
                'current_password' => ['required', 'current_password'],
                'password' => ['required', Password::defaults(), 'confirmed'],
            ]);

            $request->user()->update([
                'password' => Hash::make($validated['password']),
            ]);

            return back()
                ->with('message', 'Data successfully updated');
        }

        return inertia('User/ChangePassword');
    }
}

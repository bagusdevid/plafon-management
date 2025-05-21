<?php

namespace App\Http\Controllers;

use App\Mail\BroadcastMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MessageController extends Controller
{
    public function index()
    {
        return inertia('Message/Main');
    }

    public function emailBroadcast()
    {
        return inertia('Message/CreateEmail');
    }

    public function emailStore(Request $request)
    {
        $request->validate([
            'subject' => ['required'],
            'recipients' => ['required'],
            'body' => ['required']
        ]);

        Mail::to('alfin.andri@gmail.com')
            ->send(new BroadcastMail());

        return back()
            ->with('message', 'Email successfully sent.');
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Twilio\Rest\Client;
use Exception;

class BotController extends Controller
{
    public function index()
    {
        $BOT_TOKEN = "7802767157:AAGnWo29sxAk-JNzerAgYuaWiDzzDSj_VoE";
        $api = "https://api.telegram.org/bot{$BOT_TOKEN}/getMe";

        $data['response'] = (string) Http::get($api)->getBody();

        return inertia('Bot/Main', $data);
    }

    public function whatsapp()
    {
        return inertia('Bot/WhatsApp', [
            'wa_success' => session('wa_success'),
            'wa_error' => session('wa_error')
        ]);
    }

    public function whatsappStore(Request $request)
    {
        $twilioSid = env('TWILIO_SID');
        $twilioToken = env('TWILIO_AUTH_TOKEN');
        $twilioWhatsAppNumber = env('TWILIO_WHATSAPP_NUMBER');
        $recipientNumber = $request->phone;
        $message = $request->message;

        try {
            $twilio = new Client($twilioSid, $twilioToken);
            $twilio->messages->create(
                "whatsapp:" . $recipientNumber,
                [
                    "from" => "whatsapp:+". $twilioWhatsAppNumber,
                    "body" => $message,
                ]
            );

            return back()
                ->with('wa_success', 'WhatsApp message sent successfully!');
        } catch (Exception $e) {
            return back()
                ->with('wa_error', $e->getMessage());
        }
    }

    public function wa_fonnte(Request $request)
    {
        //swHQ4RdJBPu7pmw3gHHh
        //gJknj8kxXtQ9RznstDAVkoEHLmE74CE
        if($request->isMethod('post')) {
            $api = Http::withHeaders([
                'Authorization' => 'swHQ4RdJBPu7pmw3gHHh'
            ]);
            $send = $api->post('https://api.fonnte.com/send', [
                'target' => $request->phone,
                'message' => $request->message
            ]);

            return response()
                ->json([
                    'response' => (string) $send->getBody()
                ]);
        }

        return inertia('Bot/WAFonnte');
    }
}

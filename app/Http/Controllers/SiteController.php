<?php

namespace App\Http\Controllers;

use App\Models\Site;
use App\Models\SiteInvitation;
use Carbon\Carbon;
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
                'activation_code' => $request->activation_code,
                'active' => $request->active,
            ];

            Site::create($data_site);

            return back()
                ->with('message', 'Data successfully added.');
        }

        $data['sites'] = Site::with('invitations')
            ->orderByDesc('id')
            ->get()
            ->map(function ($item) {
                $item->invitations->map(function ($invite) use ($item) {
                    $invite->is_valid = $this->codeIsValid($invite->valid_start, $invite->valid_end);
                    $invite->referrer = $item->domain . '/register?invitation=' . encrypt($invite->code);
                    return $invite;
                });
                return $item;
            });

        return inertia('Sites/Main', $data);
    }

    public function update(Request $request, Site $site)
    {
        $request->validate([
            'name' => ['required'],
            'domain' => ['required'],
        ]);

        $site::where('id', $request->id)
            ->update([
                'name' => $request->get('name'),
                'domain' => $request->get('domain'),
                'active' => $request->active,
            ]);

        return back()
            ->with('message', 'Data successfully updated.');
    }

    public function destroy(Site $site)
    {
        $site->delete();

        return back()
            ->with('message', 'Data successfully deleted.');
    }

    public function invitationCreate(Request $request)
    {
        $request->validate([
            'site_id' => ['required'],
            'code' => ['required'],
            'valid_start' => ['required'],
            'valid_end' => ['required'],
        ]);

        $data = [
            'site_id' => $request->site_id,
            'code' => $request->code,
            'valid_start' => Carbon::parse($request->valid_start)->toDateString() . ' 00:00:00',
            'valid_end' => Carbon::parse($request->valid_end)->toDateString() . ' 23:59:59'
        ];

        $create = SiteInvitation::create($data);

        $created_data = SiteInvitation::with('site')
            ->where('id', $create->id)
            ->get()
            ->map(function ($item) {
                $item->referrer = $item->site->domain . '/register?invitation=' . encrypt($item->code);
                return $item;
            })
            ->first();

        return back()
            ->with('data', $created_data);

//        return response()
//            ->json([
//                'data' => $data
//            ]);
    }

    public function generateActivationCode()
    {
        $code = fake()->regexify('[A-Za-z0-9]{12}');

        return response()
            ->json([
                'results' => $code
            ]);
    }

    public function generateInvitationCode()
    {
        $code = fake()->regexify('[A-Za-z0-9]{6}');

        return response()
            ->json([
                'results' => $code
            ]);
    }

    public function advanced(Request $request)
    {
        $data['site'] = Site::where('id', $request->id)
            ->get()
            ->first();

        return inertia('Sites/Advanced', $data);
    }

    private function codeIsValid($valid_start, $valid_end) {
        $now = Carbon::now()->tzName;
        $start = Carbon::createFromFormat('Y-m-d H:i:s', $valid_start);
        $valid_start_status = $start->lessThan($now);
        $end = Carbon::createFromFormat('Y-m-d H:i:s', $valid_end);
        $valid_end_status = $end->greaterThan($now);

        return $valid_start_status && $valid_end_status;
    }
}

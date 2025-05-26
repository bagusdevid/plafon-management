<?php

namespace App\Http\Controllers;

use App\Models\ManagementBank;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SettingController extends Controller
{
    public function bank(Request $request)
    {
        if($request->isMethod('post')) {
            $request->validate([
                'bank_name' => ['required'],
                'bank_acc_name' => ['required'],
                'bank_acc_no' => ['required']
            ]);

            ManagementBank::create([
                'bank_name' => $request->bank_name,
                'bank_acc_name' => $request->bank_acc_name,
                'bank_acc_no' => $request->bank_acc_no,
                'created_by' => Auth::user()['id'],
            ]);

            return back()
                ->with('message', 'Data successfully added.');
        }

        $data['banks'] = ManagementBank::orderBy('id', 'desc')
            ->get();

        return inertia('Setting/Bank', $data);
    }

    public function updateBank(Request $request, ManagementBank $managementBank)
    {
        $request->validate([
            'bank_name' => ['required'],
            'bank_acc_name' => ['required'],
            'bank_acc_no' => ['required']
        ]);

        $managementBank::where('id', $request->id)
            ->update([
                'bank_name' => $request->bank_name,
                'bank_acc_name' => $request->bank_acc_name,
                'bank_acc_no' => $request->bank_acc_no
            ]);

        return back()
            ->with('message', 'Data successfully updated.');
    }

    public function destroyBank(ManagementBank $managementBank)
    {
        $managementBank->delete();

        return back()
            ->with('message', 'Data successfully deleted.');
    }
}

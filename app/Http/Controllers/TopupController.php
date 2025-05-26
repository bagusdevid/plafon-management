<?php

namespace App\Http\Controllers;

use App\Models\ArchiveTopup;
use App\Models\ManagementBank;
use App\Models\Sheep;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class TopupController extends Controller
{
    public function index()
    {
        $data['archives'] = ArchiveTopup::orderByDesc('id')
            ->with('sheep')->has('sheep')
            ->with('user')
            ->get()
            ->map(function ($item) {
                $photos = explode('.', $item->transfer_evidence);
                $item->transfer_evidence_path = asset('storage/topup/' . $photos[0] . '_thumb.' . $photos[1]);

                return $item;
            });

        return inertia('Topup/Main', $data);
    }

    public function create(Request $request)
    {
        if($request->isMethod('post')) {
            $request->validate([
                'sheep.id' => ['required'],
                'amount' => ['required'],
                'destination_bank_id' => ['required'],
                'transfer_evidence' => 'required|file|mimes:jpg,jpeg,gif,png|max:2048'
            ]);

            $upload = $request->file('transfer_evidence');
            $random = Str::random();

            (new TaskController())->uploadMap($random, $upload, 'topup/');

            $destBank = ManagementBank::where('id', $request->destination_bank_id)
                ->get()
                ->first();
            $sheep = Sheep::where('id', $request->sheep['id']);
            $account = $sheep
                ->get()
                ->first();
            $beforeBalance = $account->balance;
            $aftarBalance = $account->balance + $request->amount;

            ArchiveTopup::create([
                'sheep_id' => $request->sheep['id'],
                'amount' => $request->amount,
                'source_bank_name' => $request->source_bank_name,
                'source_bank_acc_no' => $request->source_bank_acc_no,
                'source_bank_acc_name' => $request->source_bank_acc_name,
                'destination_bank_name' => $destBank->bank_name,
                'destination_bank_acc_name' => $destBank->bank_acc_name,
                'destination_bank_acc_no' => $destBank->bank_acc_no,
                'transfer_date' => $request->transfer_date,
                'transfer_evidence' => $random . '.' . $upload->getClientOriginalExtension(),
                'before_balance' => $beforeBalance,
                'after_balance' => $aftarBalance,
                'created_by' => Auth::user()['id'],
            ]);

            $sheep->update([
                'balance' => $aftarBalance
            ]);

            return redirect()
                ->to('/topup')
                ->with('message', 'Data successfully added.');
        }

        $data['sheeps'] = Sheep::orderBy('username', 'ASC')
            ->get();
        $data['managementBanks'] = ManagementBank::orderBy('bank_name', 'asc')
            ->get();

        return inertia('Topup/Create', $data);
    }
}

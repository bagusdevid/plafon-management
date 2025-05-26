<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArchiveTopup extends Model
{
    use HasFactory;

    protected $table = 'archive_topup';

    protected $fillable = [
        'sheep_id',
        'amount',
        'source_bank_name',
        'source_bank_acc_no',
        'source_bank_acc_name',
        'destination_bank_name',
        'destination_bank_acc_name',
        'destination_bank_acc_no',
        'transfer_date',
        'transfer_evidence',
        'after_balance',
        'before_balance',
        'created_by'
    ];

    public function sheep()
    {
        return $this->belongsTo(Sheep::class, 'sheep_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
}

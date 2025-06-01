<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManagementCS extends Model
{
    use HasFactory;

    protected $table = 'management_cs';

    protected $fillable = [
        'service',
        'account',
    ];
}

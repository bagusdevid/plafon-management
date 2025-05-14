<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteInvitation extends Model
{
    use HasFactory;

    protected $table = 'site_invitations';

    protected $fillable = [
        'site_id',
        'code',
        'valid_start',
        'valid_end'
    ];

    public function site()
    {
        return $this->belongsTo(Site::class, 'site_id', 'id');
    }
}

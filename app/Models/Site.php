<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Site extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'domain',
        'activation_code',
        'active'
    ];

    public function invitations(): HasMany
    {
        return $this->hasMany(SiteInvitation::class, 'site_id');
    }
}

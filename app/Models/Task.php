<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_id',
        'name',
        'photo',
        'thumbs_inside'
    ];

    public function site()
    {
        return $this->belongsTo(Site::class, 'site_id', 'id');
    }

    public function options(): HasMany
    {
        return $this->hasMany(TaskOption::class, 'task_id');
    }
}

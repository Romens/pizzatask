<?php

namespace App\Models;

use App\Models\Lib\Crust;
use App\Models\Lib\Size;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Pizza extends Model
{
    protected $casts = [
        'price' => 'float',
    ];

    protected $appends = [
        'image_url',
        'sauce',
    ];

    // Relations

    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, Ingredient::MANY_TABLE);
    }


    public function sizes()
    {
        return $this->belongsToMany(Size::class, Size::MANY_TABLE);
    }

    public function crusts()
    {
        return $this->belongsToMany(Crust::class, Crust::MANY_TABLE);
    }

    public function variants()
    {
        return $this->hasMany(PizzaVariant::class);
    }

    // Appends Attributes

    public function getImageUrlAttribute(): ?string
    {
        $image = $this->attributes['image'];

        if (empty($image)) {return null;}

        if ($image && filter_var($image, FILTER_VALIDATE_URL)) {
            return $image;
        }

        $url = 'images/pizzas/' . $image;

        return url($url);
    }

    public function getSauceAttribute(): ?string
    {
        return 'Our special sauce';
    }

    // Scopes

    public function scopeOnlyActive($query)
    {
        return $query->where('active', true);
    }

    public function scopeWithIngredients(Builder $query)
    {
        return $query->with('ingredients');
    }

    public function scopeWithSizes(Builder $query)
    {
        return $query->with('sizes');
    }

    public function scopeWithCrusts(Builder $query)
    {
        return $query->with('crusts');
    }

    public function scopeWithVariants(Builder $query)
    {
        return $query->with('variants');
    }
}

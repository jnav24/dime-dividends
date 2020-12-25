<?php

namespace App\View\Components;

use Illuminate\View\Component;
use Inertia\Inertia;
use Inertia\Response;

class GuestLayout extends Component
{
    /**
     * Get the view / contents that represents the component.
     *
     * @return Response
     */
    public function render()
    {
        return Inertia::render('layouts/Guest');
    }
}

<?php

namespace App\Http\COntrollers;

use Inertia\Inertia;

class IncomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Income');
    }
}

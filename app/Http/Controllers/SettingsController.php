<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\UnauthorizedException;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        return Inertia::render('Settings');
    }

    public function updateProfileInformation(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
        ]);

        $user = User::findOrFail(auth()->user()->id);
        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->save();

        return response()->json([
            'success' => true,
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws UnauthorizedException
     */
    public function updatePassword(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'password_current' => 'required',
            'password' => 'required|confirmed|string|min:8|alpha_num',
        ]);

        $user = User::findOrFail(auth()->user()->id);

        if (!Hash::check($validated['password_current'], $user->password)) {
            throw new UnauthorizedException();
        }

        $user->password = Hash::make($validated['password']);
        $user->save();

        return response()->json([
            'success' => true,
        ]);
    }
}

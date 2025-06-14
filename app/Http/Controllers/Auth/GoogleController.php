<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback(): RedirectResponse
    {
        if (env('APP_ENV') == 'local') {
            $guzzleClient = new Client(['verify' => false]); // disable SSL verify (INSECURE, DEV ONLY)
        } else {
            $guzzleClient = new Client(['verify' => true]);
        }

        $googleUser = Socialite::driver('google')
            ->stateless()
            ->setHttpClient($guzzleClient)
            ->user();

        $tempPassword = Hash::make('p@ssw0rd#');

        // Check if user exists
        $user = User::where([
            'email'=> $googleUser->getEmail(),
            'google_id'=> $googleUser->getId()
        ])->first();

        if ($user) {
            // Update only name, google_id, and avatar
            $user->update([
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                'avatar' => $googleUser->getAvatar(),
            ]);
        } else {
            // Create new user with generated password
            $user = User::create([
                'email' => $googleUser->getEmail(),
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                'avatar' => $googleUser->getAvatar(),
                'password' => $tempPassword,
            ]);
        }

        auth()->login($user);

        $accessToken = $user->createToken('Laravel')->accessToken;

        session(['access_token' => $accessToken]);
        session(['user_id' => $user->id]);

        return redirect()->route('dashboard')->with('token', $accessToken);
    }
}


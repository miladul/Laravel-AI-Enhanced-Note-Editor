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


        $randomNumber = substr(str_shuffle(str_repeat('0123456789', 6)), 0, 6);
        $password = Hash::make($randomNumber);

        $user = User::updateOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                'avatar' => $googleUser->getAvatar(),
                'password' => $password,
            ]
        );

        auth()->login($user);

        $accessToken = $user->createToken('Laravel')->accessToken;

        session(['access_token' => $accessToken]);
        session(['user_id' => $user->id]);

        return redirect()->route('dashboard')->with('token', $accessToken);
    }
}


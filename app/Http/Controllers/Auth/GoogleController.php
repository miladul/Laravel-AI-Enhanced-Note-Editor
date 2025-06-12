<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\Classes\Helper;
use App\Http\Controllers\Controller;
use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Passport\PersonalAccessTokenResult;
use Illuminate\Support\Str;

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

        request()->request->add([
            'grant_type' => 'password',
            'client_id' => env('PASSPORT_CLIENT_ID'),
            'client_secret' => env('PASSPORT_CLIENT_SECRET'),
            'username' => $user->email,
            'password' => $randomNumber,
            'scope' => '*',
        ]);


        $tokenRequest = Request::create('/oauth/token', 'POST');

        $token = Route::dispatch($tokenRequest);

        // Get the content (JSON string) from the response
        $content = $token->getContent();
        $data = json_decode($content, true);
        $accessToken = $data['access_token'] ?? null;
        session(['access_token' => $accessToken]);

        return redirect()->route('dashboard')->with('token', $accessToken);
    }
}


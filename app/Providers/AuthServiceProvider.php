<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     */
    protected $policies = [
        // Example:
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot()
    {
        $this->registerPolicies();

        // Register Passport routes
        //Passport::routes();
        Passport::ignoreMigrations();

        // Optional: Token expiration settings
        Passport::tokensExpireIn(now()->addDays(15));
        Passport::refreshTokensExpireIn(now()->addDays(30));

        // Optional: set the personal access client ID manually if you face issues
        // $personalAccessClient = \DB::table('oauth_personal_access_clients')->first();
        // if ($personalAccessClient) {
        //     Passport::personalAccessClientId($personalAccessClient->client_id);
        // }
    }
}

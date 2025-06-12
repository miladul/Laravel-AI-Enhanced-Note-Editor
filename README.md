# Laravel AI-Enhanced Note Editor

This Laravel project includes the following features:
- User Authentication with Google OAuth
- API Authentication using Laravel Passport (Password Grant)
- Integration with OpenAI API

## Requirements

- PHP >= 8.2
- Composer
- Laravel >= 12
- MySQL
- OpenAI API key

---

## Setup Instructions

Follow the steps below to set up and run this project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/miladul/Laravel-AI-Enhanced-Note-Editor.git
cd your-project

```

### 2. Install Dependencies
```
composer install
```
### 3. Create Environment File
#### Create a copy of .env.example and rename it to .env:
```
composer install
```
### 5. Generate Application Key
```
php artisan key:generate
```
### 6. Run Migrations
```
php artisan migrate
```
### 7. Generate PASSPORT_CLIENT_ID & PASSPORT_CLIENT_SECRET
```
php artisan passport:client --password

Password grant client created successfully.
Client ID: x
Client secret: xxxxxxxxxxxxxxxxx

//add in (.env file)
#laravel passport info
PASSPORT_CLIENT_ID=your-passport-client-id
PASSPORT_CLIENT_SECRET=your-passport-client-secret
```
### 8. google OAuth information add on (.env file)
```
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=https://example.com/auth/google/callback
```
### 9. set open AI API Key
```
# OpenAI
OPENAI_API_KEY=your-openai-api-key
```

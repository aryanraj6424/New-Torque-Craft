<?php
/**
 * Torque Craft - Database Configuration
 * 
 * This file handles the connection to the PostgreSQL database.
 * 
 * TODO: Replace mock data with real PostgreSQL queries once connected.
 * TODO: Integrate Redis for caching product listings and warranty lookups.
 * TODO: Integrate ElasticSearch for high-performance product searching.
 */

return [
    'default' => 'pgsql',
    
    'connections' => [
        'pgsql' => [
            'driver'   => 'pgsql',
            'host'     => env('DB_HOST', 'localhost'),
            'port'     => env('DB_PORT', '5432'),
            'database' => env('DB_DATABASE', 'torque_craft'),
            'username' => env('DB_USERNAME', 'postgres'),
            'password' => env('DB_PASSWORD', ''),
            'charset'  => 'utf8',
            'prefix'   => '',
            'schema'   => 'public',
            'sslmode'  => 'prefer',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Redis Configuration
    |--------------------------------------------------------------------------
    |
    | Redis is used for caching high-traffic queries like product listings
    | and user session data to ensure sub-100ms response times.
    |
    */
    'redis' => [
        'client' => 'phpredis',
        'default' => [
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'password' => env('REDIS_PASSWORD', null),
            'port' => env('REDIS_PORT', 6379),
            'database' => 0,
        ],
    ],
];

// PHP PDO Connection Example (Commented Out)
/*
try {
    $dsn = "pgsql:host=localhost;port=5432;dbname=torque_craft;";
    $pdo = new PDO($dsn, "postgres", "password", [
        PDO::ATTR_ERRMODE => PDO::ATTR_ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::ATTR_FETCH_ASSOC,
    ]);
    echo "Connected to PostgreSQL successfully";
} catch (PDOException $e) {
    die($e->getMessage());
}
*/

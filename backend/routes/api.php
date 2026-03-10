<?php

use App\Controllers\AuthController;
use App\Controllers\ProductController;
use App\Controllers\OrderController;
use App\Controllers\WarrantyController;
use App\Controllers\AdminController;

/**
 * Torque Craft API Routes
 * 
 * SECURITY: All sensitive routes require JWT tokens
 * SECURITY: Admin routes require 'role:admin' middleware
 */

// Auth
Route::post('/api/register', [AuthController::class, 'register']);
Route::post('/api/login', [AuthController::class, 'login']);

// Products
Route::get('/api/products', [ProductController::class, 'index']); // TODO: Use ElasticSearch for search queries
Route::get('/api/products/{id}', [ProductController::class, 'show']);

// Vehicle Fitment
Route::post('/api/check-fitment', [ProductController::class, 'checkFitment']);

// Orders
Route::post('/api/order', [OrderController::class, 'store']); // TODO: Payment Gateway Integration
Route::get('/api/order/{id}', [OrderController::class, 'show']);

// QR & Warranty
Route::post('/api/verify-qr', [WarrantyController::class, 'verify']); // TODO: PostgreSQL Serial Check
Route::post('/api/activate-warranty', [WarrantyController::class, 'activate']);
Route::get('/api/warranty/{serial}', [WarrantyController::class, 'show']);

// Admin
Route::middleware('auth:admin')->group(function() {
    Route::post('/api/admin/product', [AdminController::class, 'storeProduct']);
    Route::post('/api/admin/generate-qr', [AdminController::class, 'generateBatch']);
});

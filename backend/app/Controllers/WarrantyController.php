<?php

namespace App\Controllers;

class WarrantyController
{
    /**
     * Verify QR Serial Number
     * 
     * FLOW:
     * 1. Check if serial exists in 'qr_codes' table
     * 2. Check if already activated in 'warranties' table
     * 3. Return status
     */
    public function verify($serial)
    {
        // TODO: Replace mock array with real PostgreSQL query
        // $product = DB::table('qr_codes')->where('serial', $serial)->first();
        
        // Mock logic for demonstration
        $mockDb = [
            'TC-QR-12345' => ['activated' => true, 'product' => 'Cummins 5.9L'],
            'TC-QR-67890' => ['activated' => false, 'product' => 'Duramax LB7']
        ];

        if (!isset($mockDb[$serial])) {
            return json_encode(['status' => 'error', 'message' => 'Invalid serial']);
        }

        return json_encode([
            'status' => 'success',
            'data' => $mockDb[$serial]
        ]);
    }

    /**
     * Activate Warranty
     * 
     * FLOW:
     * 1. Validate user and serial
     * 2. Save activation date to PostgreSQL
     * 3. Calculate expiry (e.g., +3 years)
     * 4. Return confirmation
     */
    public function activate($request)
    {
        // TODO: Save to PostgreSQL 'warranties' table
        // $warranty = Warranty::create([
        //     'user_id' => auth()->id(),
        //     'serial' => $request->serial,
        //     'activated_at' => now(),
        //     'expires_at' => now()->addYears(3)
        // ]);

        return json_encode([
            'status' => 'success',
            'message' => 'Warranty activated successfully',
            'expiry' => date('Y-m-d', strtotime('+3 years'))
        ]);
    }
}

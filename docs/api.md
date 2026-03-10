# Torque Craft API Documentation

## Authentication
All API requests except Login/Register require a Bearer Token.
`Authorization: Bearer <jwt_token>`

### Auth Endpoints
- `POST /api/register`: Create new account
- `POST /api/login`: Get JWT token

## Products
- `GET /api/products`: List all products (Supports pagination & filtering)
- `GET /api/products/{id}`: Get detailed product info

## Fitment
- `POST /api/check-fitment`: Check if a part fits a specific vehicle
  - Payload: `{ "product_id": 1, "year": 2005, "make": "Dodge", "model": "Ram 2500" }`

## Orders
- `POST /api/order`: Place an order
  - Requires: `cart_items`, `shipping_address`, `payment_token`
- `GET /api/order/{id}`: Track order status

## Warranty & QR
- `POST /api/verify-qr`: Check serial authenticity
- `POST /api/activate-warranty`: Register product for warranty
  - Requires: `serial`, `user_id`, `purchase_date`

## Admin (Restricted)
- `POST /api/admin/product`: Add new inventory
- `POST /api/admin/generate-qr`: Batch generate serial numbers

---
*Note: This API is currently in Mock mode. Real database integration is pending.*

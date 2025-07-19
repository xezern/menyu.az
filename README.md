# API Documentation

## Authentication

### POST `/auth/login`

**Request:**
```json
{
  "username": "admin_user_name",
  "password": "min_lenght_8"
}
```

**Response:**
```json
{
  "refresh": "<refresh_token>",
  "token": "<access_token>",
  "status": true
}
```

---

### GET `/auth/verify-token`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "message": "Token Testiqlendi.",
  "status": true,
  "user_login": "admin_user_name",
  "role": "ADMIN"
}
```

---

## Categories

### POST `/categories`

**Request:**
```json
{
  "name_az": "Ickiler",
  "name_ru": "ru_icki",
  "name_en": "en_icki",
  "img": ["https://example.com/image.jpg"]
}
```

**Response:**
```json
{
  "id": 2,
  "img": ["https://example.com/image.jpg"],
  "name_az": "Ickiler",
  "name_en": "en_icki",
  "name_ru": "ru_icki"
}
```

---

### GET `/categories`

**Response:**
```json
[
  {
    "id": 1,
    "img": ["https://example.com/image.jpg"],
    "name_az": "Yemekler",
    "name_en": "yemek_en",
    "name_ru": "Yemek_ru",
    "subcategories": [
      {
        "id": 1,
        "name_az": "soyuq kofeler",
        "name_en": "cool coffee",
        "name_ru": "maroj kofe",
        "slug": "yemek_en/cool-coffee"
      }
    ]
  },
  {
    "id": 2,
    "img": ["https://example.com/image.jpg"],
    "name_az": "Ickiler",
    "name_en": "en_icki",
    "name_ru": "ru_icki",
    "subcategories": []
  }
]
```

---

### DELETE `/categories/:id`

**Response:**
```json
{
  "deletecat": {
    "id": 2,
    "img": ["https://example.com/image.jpg"],
    "name_az": "Ickiler",
    "name_en": "en_icki",
    "name_ru": "ru_icki"
  },
  "message": "Category deleted successfully"
}
```

---

### PUT `/categories/:id`

**Request:**
```json
{
  "name_az": "Yemek",
  "name_ru": "Yemek_ru",
  "name_en": "yemek_en",
  "img": ["https://example.com/image.jpg"]
}
```

---

### POST `/categories/subcategory`

**Request:**
```json
{
  "name_az": "Isti kofeler",
  "name_ru": "Qranci kofe",
  "name_en": "Hot coffee",
  "categoryId": 1
}
```

**Response:**
```json
{
  "message": "subcategory created has succesefuly alla sene sukur",
  "subcategory": {
    "id": 3,
    "name_az": "Isti kofeler",
    "name_en": "Hot coffee",
    "name_ru": "Qranci kofe",
    "categoryId": 1
  }
}
```

---

### PUT `/categories/subcategories/:id`

**Request:**
```json
{
  "name_az": "soyuq kofeler",
  "name_ru": "maroj kofe",
  "name_en": "cool coffee"
}
```

---

### DELETE `/categories/subcategories/:id`

No body required.

---

## Products

### GET `/products`

**Response:**
```json
{
  "products": [
    {
      "id": 1,
      "img": ["https://example.com/image.jpg"],
      "name_az": "Qeribe",
      "name_en": "Hot Coffee",
      "name_ru": "Горячий кофе",
      "description_az": "Yemək içində iki qat espresso.",
      "description_en": "Double espresso inside the drink.",
      "description_ru": "Двойной эспрессо внутри напитка.",
      "price": 15.5,
      "metadata": "Kafeinli, təravətləndirici",
      "categoryId": 1,
      "subcategoryId": 1,
      "ingridients": ["Espresso", "Süt", "Şəkər"],
      "sizes": ["Small", "Medium", "Large"],
      "status": true,
      "isStok": true,
      "totalPrice": 15.5
    }
  ],
  "page": {
    "totalProducts": 1,
    "totalPages": 1,
    "currentPage": 1
  }
}
```

---

### POST `/products`

**Request:**
```json
{
  "img": ["https://example.com/image.jpg"],
  "name_az": "Qeribe",
  "name_en": "Hot Coffee",
  "name_ru": "Горячий кофе",
  "description_az": "Yemək içində iki qat espresso.",
  "description_en": "Double espresso inside the drink.",
  "description_ru": "Двойной эспрессо внутри напитка.",
  "price": 15.5,
  "metadata": "Kafeinli, təravətləndirici",
  "categoryId": 1,
  "subcategoryId": 1,
  "ingridients": ["Espresso", "Süt", "Şəkər"],
  "sizes": ["Small", "Medium", "Large"],
  "status": true,
  "isStok": true
}
```

---

### PUT `/products/:id`

**Request:**
```json
{
  "img": ["https://example.com/image.jpg"],
  "name_az": "Qeribe",
  "name_en": "Hot Coffee",
  "name_ru": "Горячий кофе",
  "description_az": "Yemək içində iki qat espresso.",
  "description_en": "Double espresso inside the drink.",
  "description_ru": "Двойной эспрессо внутри напитка.",
  "price": 15.5,
  "metadata": "Kafeinli, təravətləndirici",
  "categoryId": 1,
  "subcategoryId": 1,
  "ingridients": ["Espresso", "Süt", "Şəkər"],
  "sizes": ["Small", "Medium", "Large"],
  "status": true,
  "isStok": true
}
```
---

### DELETE `/products/:id`

No body required.

---

### GET `/products/category/:id`

**Response:**
```json
{
  "products": [
    {
      "id": 3,
      "name_az": "Isti kofeler",
      "name_en": "Hot coffee",
      "name_ru": "Qranci kofe",
      "products": [
        {
          "id": 3,
          "img": ["https://example.com/image.jpg"],
          "name_az": "Xezer",
          "name_en": "Hot",
          "name_ru": "кофе",
          "description_az": "Yemək içində iki qat espresso.",
          "description_en": "Double espresso inside the drink.",
          "description_ru": "Двойной эспрессо внутри напитка.",
          "price": 15.5,
          "metadata": "Kafeinli, təravətləndirici",
          "categoryId": 1,
          "subcategoryId": 3,
          "ingridients": ["Espresso", "Süt", "Şəkər"],
          "sizes": ["Small", "Medium", "Large"],
          "status": true,
          "isStok": true
        }
      ],
      "slug": "yemek_en/hot-coffee"
    }
  ]
}
```

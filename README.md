# Database Model
  
- **[check users schema (./src/schema/users.js)](./src/schema/users.js)**

> ./src/schema/users.js
```ruby
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  picture: {
    type: String,
  },
  password: {
    type: String,
  },
  province: {
    type: String,
  },
  district: {
    type: String,
  },
  googleId: {
    type: String,
  },
});


module.exports = mongoose.model("news", userSchema);
````

- **[check news schema (./src/schema/news.js)](./src/schema/news.js)**
> ./src/schema/news.js

```ruby
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  title: {
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  source: {
    type: String,
  },
  timestamp: {
    type: String,
  },
});

module.exports = mongoose.model("news", newsSchema);
````

## Code Explanation
### Imports
* **mongoose:** Imports the Mongoose library, which is used for MongoDB interactions.
* **Schema:** Imports the Schema class from Mongoose. It is used to define data models.
  
### Users Schema Definition
* **name:** The product's name. Data type: String.
* **surname:** The product's model. Data type: String.
* **email:** The product's price. Data type: Number.
* **provinces:** The provinces where the product is available. Data type: Array.
* **picture:** The source URL of the product image. Data type: String.
* **password:** The star rating of the product. Data type: Number.
* **province:** The number of ratings for the product. Data type: String.
* **district:** The seller's points. Data type: Number.
* **googleId:** The keywords associated with the product. Data type: Array.

### News Schema Definition
* **title:** The product's name. Data type: String.
* **image:** The product's model. Data type: String.
* **description:** The product's price. Data type: Number.
* **source:** The provinces where the product is available. Data type: Array.
* **timestamp:** The source URL of the product image. Data type: String.

### User Model Creation
* **mongoose.model("user", userSchema):** Creates the "user" model using Mongoose's model function. This model represents the "user" collection and is structured according to the userSchema.

### News Model Creation
* **mongoose.model("news", userSchema):** Creates the "news" model using Mongoose's model function. This model represents the "news" collection and is structured according to the newsSchema.
  
### User Module Export
* **module.exports** = mongoose.model("user", userSchema): Exports the "user" model so it can be used in other files.

### News Module Export
* **module.exports** = mongoose.model("news", userSchema): Exports the "news" model so it can be used in other files.

  
This provides an overview of the code's content and function.
### Reasons for Using this Database Model: 
* **Mongoose and MongoDB Integration:** The code uses Mongoose to simplify access to MongoDB, making working with MongoDB straightforward and efficient.
* **Specific Fields and Relationships:** The product collection's fields (e.g., name, model, price) and relationships (e.g., keywords, provinces) are defined.
* **Data Manipulation:** The model allows you to perform create, read, update, and delete (CRUD) operations more easily and clearly.
* **In order to include a product in more than one category, I categorized it with the help of keywords.**
* **I did not create a collection because I could find products with the help of keywords.**
### REST API Explanation:
#### `GET /api/news`

```ruby
axios.get("/api/news");
```

`Response /api/news`

```ruby
[
    {
      description: "Milli Eğitim Bakanı Yusuf Tekin, öğretmenlere karşı uygulanan şiddetin cezasını..."
      image: "https://www.cumhuriyet.com.tr/Archive/2024/5/29/2211996/kapak_205742.jpg"
      source: "Cumhuriyet"
      timestamp: "1716609348446"
      title: "ÖMK ne zaman Meclis'e gelecek? Öğretmenlik Meslek Kanunu ne zaman çıkacak?"
      _id: "665ca3a25155e8cc466f0d6f"
    },
    ...
]
```

#### `GET /api//filter/all?query="beşiktaş`

```ruby
axios.get("/api/products",
       {
              params:{
                     query: "beşiktaş",
              }
       }
);
```

`Response /api//filter/all?query="beşiktaş"`

```ruby
[
    {
      description: "Beşiktaş'ta gelecek sezonun kadro planlaması için çalışmalar başladı. En kötü sezonunda Ziraat ..."
      image: "https://cdn.karar.com/news/1700338.jpg"
      source: "KARAR"
      timestamp: "1715792780583"
      title: "Beşiktaş taraftarının hayali gerçek oluyor! Hasan Arat 15 milyon euroluk kralı tahtına geri getiriyor. Resmi teklif yapıldı"
      _id: "665ca3a25155e8cc466f0d93"
    },
    ...
]
```

#### `GET /api/details?id="665ca3a25155e8cc466f0d93"`

```ruby
axios.post("/api/details",{params:{id:"665ca3a25155e8cc466f0d93"}});
```

`Response /api/details?id="665ca3a25155e8cc466f0d93"`

```ruby
{
      description: "Beşiktaş'ta gelecek sezonun kadro planlaması için çalışmalar başladı. En kötü sezonunda Ziraat Türkiye Kupası'n..."
      image: "https://cdn.karar.com/news/1700338.jpg"
      source: "KARAR"
      timestamp: "1715792780583"
      title: "Beşiktaş taraftarının hayali gerçek oluyor! Hasan Arat 15 milyon euroluk kralı tahtına geri getiriyor. Resmi teklif yapıldı"
      _id: "665ca3a25155e8cc466f0d93"
}
```



#### `POST /api/product/details"`


```ruby
axios.get("/api/notification");
```

 `Response /api/notification"`

```ruby
[
    {
        "_id": "665ca3a25155e8cc466f0da7",
        "title": "Edremit, Büyükşehir’den hak ettiği değeri görecek",
        "image": "https://cdn.karar.com/news/1700412.jpg",
        "description": "Balıkesir Büyükşehir Belediye Başkanı Ahmet Akın, Halk Günü Buluşmaları kapsamı...",
        "source": "KARAR",
        "timestamp": "1717313559357",
    },
    {
        "_id": "665ca3a25155e8cc466f0d76",
        "title": "İstanbul'da TEM Otoyolu'na giren inekler trafiği altüst etti",
        "image": "https://www.cumhuriyet.com.tr/Archive/2024/5/29/2211993/kapak_202351.jpg",
        "description": "Avcılar'da TEM Otoyolu'na giren inekler trafiği altüst etti. Sürücüler büyük şaş...",
        "source": "Cumhuriyet",
        "timestamp": "1717313056463",
    },
    {
        "_id": "665ca3a25155e8cc466f0dba",
        "title": "Twitter'da (X) artık o sekmeyi göremeyeceksiniz! Elon Musk, yine yaptı yapacağını...",
        "image": "https://cdn.karar.com/news/1586870.jpg",
        "description": "Kullanıcıların Twitter olarak adlandırmaya devam ettiği X, profillerde bulunan...",
        "source": "KARAR",
        "timestamp": "1717283359872",
    }
]
```

#### `GET /api/weather"`

```ruby
axios.get("/api/weather");
```

 `Response /api/weather"`

```ruby
{
    "city": "Izmir",
    "tr": "clear sky",
    "en": "açık",
    "temp": 32.97,
    "icon": "01d",
}
```


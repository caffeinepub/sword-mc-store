import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

actor {
  // Core types
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Float;
    category : Text;
    stock : Nat;
  };

  type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  type CartDetails = {
    product : Product;
    quantity : Nat;
  };

  let productCatalog = Map.empty<Nat, Product>();
  let carts = Map.empty<Text, Map.Map<Nat, Nat>>(); // sessionId -> (productId -> quantity)

  // Initialize with sample products
  public shared ({ caller }) func init() : async () {
    let sampleProducts = [
      {
        id = 1;
        name = "Diamond Sword";
        description = "Unbreakable diamond sword";
        price = 75.5;
        category = "Swords";
        stock = 15;
      },
      {
        id = 2;
        name = "Netherite Sword";
        description = "Legendary netherite sword";
        price = 120.5;
        category = "Swords";
        stock = 5;
      },
      {
        id = 3;
        name = "Iron Sword";
        description = "Sturdy iron sword";
        price = 40.99;
        category = "Swords";
        stock = 30;
      },
      {
        id = 4;
        name = "Golden Sword";
        description = "Shiny golden sword";
        price = 25.75;
        category = "Swords";
        stock = 20;
      },
      {
        id = 5;
        name = "Stone Sword";
        description = "Simple stone sword";
        price = 15.0;
        category = "Swords";
        stock = 50;
      },
      {
        id = 6;
        name = "Enchanted Sword";
        description = "Sword with magical properties";
        price = 200.0;
        category = "Swords";
        stock = 10;
      },
      {
        id = 7;
        name = "Trident";
        description = "Powerful trident weapon";
        price = 150.0;
        category = "Weapons";
        stock = 8;
      },
      {
        id = 8;
        name = "Axe";
        description = "Multi-purpose axe";
        price = 30.0;
        category = "Tools";
        stock = 25;
      },
    ];

    for (product in sampleProducts.values()) {
      productCatalog.add(product.id, product);
    };
  };

  // Product functions
  public query ({ caller }) func getAllProducts() : async [Product] {
    productCatalog.values().toArray();
  };

  public query ({ caller }) func getProduct(id : Nat) : async Product {
    switch (productCatalog.get(id)) {
      case (null) { Runtime.trap("Product not found!") };
      case (?product) { product };
    };
  };

  // Cart functions
  public shared ({ caller }) func addToCart(sessionId : Text, productId : Nat, quantity : Nat) : async () {
    let product = switch (productCatalog.get(productId)) {
      case (null) { Runtime.trap("Product not found!") };
      case (?prod) { prod };
    };

    if (product.stock < quantity) {
      Runtime.trap("Item stock low");
    };

    let cart = switch (carts.get(sessionId)) {
      case (null) { Map.empty<Nat, Nat>() };
      case (?existingCart) { existingCart };
    };

    cart.add(productId, quantity);
    carts.add(sessionId, cart);
  };

  public shared ({ caller }) func removeFromCart(sessionId : Text, productId : Nat) : async () {
    switch (carts.get(sessionId)) {
      case (null) { Runtime.trap("Cart not found for this session!") };
      case (?cart) {
        cart.remove(productId);
        carts.add(sessionId, cart);
      };
    };
  };

  public shared ({ caller }) func updateCartItemQuantity(sessionId : Text, productId : Nat, quantity : Nat) : async () {
    let product = switch (productCatalog.get(productId)) {
      case (null) { Runtime.trap("Product not found!") };
      case (?prod) { prod };
    };

    if (product.stock < quantity) {
      Runtime.trap("Item stock low");
    };

    let cart = switch (carts.get(sessionId)) {
      case (null) { Map.empty<Nat, Nat>() };
      case (?existingCart) { existingCart };
    };

    cart.add(productId, quantity);
    carts.add(sessionId, cart);
  };

  public query ({ caller }) func getCartItems(sessionId : Text) : async [CartDetails] {
    let cart = switch (carts.get(sessionId)) {
      case (null) { Map.empty<Nat, Nat>() };
      case (?existingCart) { existingCart };
    };

    cart.toArray().map(
      func((productId, quantity)) {
        {
          product = switch (productCatalog.get(productId)) {
            case (null) {
              // This should not happen, but keep backend data consistent in case it does
              Runtime.trap("Product in cart not found in catalog");
            };
            case (?prod) { prod };
          };
          quantity;
        };
      }
    );
  };

  public shared ({ caller }) func clearCart(sessionId : Text) : async () {
    carts.remove(sessionId);
  };
};

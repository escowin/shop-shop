export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + "s";
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // opens connection to the `shop-shop` database with the version of 1
    const request = window.indexedDB.open("shop-shop", 1);
    // creates variables to hold references to the database, transaction(tx), and object store
    let db, tx, store;

    // if version has changed (or first time using database), this method runs & creates three object stores
    request.onupgradeneeded = function (e) {
      const db = request.result;
      // creates object store for each type of data & sets primary key index to be the `_id` of the data.
      // `_id` matches MongoDB `_id` property
      db.createObjectStore("products", { keyPath: "_id" });
      db.createObjectStore("categories", { keyPath: "_id" });
      db.createObjectStore("cart", { keyPath: "_id" });
    };

    // handle any errors with connecting
    request.onerror = function (e) {
      console.log("error occurred");
    };

    // when database successfully opens
    request.onsuccess = function (e) {
      // saves a reference of the database to the `db` variable
      db = request.result;
      // opens a transaction to what's passed into `storeName` (must match one of the object store names)
      tx = db.transaction(storeName, 'readwrite');
      // saves a reference to that object store. 
      store = tx.objectStore(storeName);

      // if error occur
      db.onerror = function (e) {
        console.log("error", e);
      };

      // crud methods performed on the `store` reference
      switch (method) {
        // overwrites any data with matching `_id` value from `object` and adds it if there is no match.
        case "put":
          store.put(object);
          resolve(object);
          break;
        case "get":
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        // users can remote item from shopping cart while offline
        case "delete":
          store.delete(object._id);
          break;
        default:
          console.log("no valid method");
          break;
      }

      // when transaction is complete, connection is closed
      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}

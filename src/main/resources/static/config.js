bootDemo.config(function($routeProvider) {
    $routeProvider
        .when("/items", {
            templateUrl : "items.html",
            controller : "itemsController"
        })
        .when("/item/:id", {
            templateUrl : "item.html",
            controller : "itemController"
        })
        .when("/home", {
            templateUrl : "home.html",
            controller : "homeController"
        })
        .when("/addItem", {
            templateUrl : "add.html",
            controller : "addItemController"
        })
        .when("/login", {
            templateUrl: "login.html",
            controller: "loginController"
        })
        .otherwise({
            templateUrl : "notFound.html"
        });
});
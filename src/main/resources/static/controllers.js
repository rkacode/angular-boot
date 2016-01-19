bootDemo.controller("homeController", function($scope) {

    $scope.message = "Hello from AngularJS";

});

bootDemo.controller("itemsController", function($scope, itemService) {

    var retrieveItems = function() {
        itemService.getAll().success(function(data, status, headers, config) {
            $scope.items = data.content;
        })
    };

    retrieveItems();
});

bootDemo.controller("itemController", function($scope, $routeParams, itemService) {

    var retrieveItem = function(id) {
        itemService.getOne(id)
            .success(function(data, status, headers, config) {
                $scope.item = data.content;
            }).error(function(data, status, headers, config) {
                console.log(data.content);
            });
    };

    retrieveItem($routeParams.id);

});

bootDemo.controller("addItemController", function($scope, itemService) {


    $scope.addItem = function(item) {
        itemService.createItem(item)
            .success(function(data, status, headers, config) {
                console.log("item created");
            }).error(function(data, status, headers, config) {
                console.log("failure: " + data.content);
            });

        delete $scope.item;
    };

})

bootDemo.controller("loginController", function($scope, $location, userService) {

    $scope.login = function(user) {
        userService.login(user);
        delete $scope.user;
        $location.path("/home");
    };

});
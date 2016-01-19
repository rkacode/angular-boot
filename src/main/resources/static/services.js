bootDemo.factory("itemService", function($http) {

    var _getAll = function() {
        return $http.get("/api/item");
    };

    var _getOne = function(id) {
        return $http.get("/api/item/" + id);
    };

    var _createItem = function(item) {
        return $http.post("/api/item", item);
    };

    return {
        getAll : _getAll,
        getOne : _getOne,
        createItem : _createItem
    };
});

bootDemo.factory("userService", function($http, $cookieStore, $rootScope) {
    var _login = function(user) {
        var encodedCredentials = btoa(user.username + ":" + user.password);

        $rootScope.globals = {
            currentUser : {
                username: user.username,
                encodedCredentials : encodedCredentials
            }
        };

        $http.defaults.headers.common["Authorization"] = "Basic " + encodedCredentials;
        $cookieStore.put("globals", $rootScope.globals);
    };

    var _logout = function() {
        $rootScope.globals = {};
        $cookieStore.remove('globals');
        $http.defaults.headers.common.Authorization = 'Basic ';
    };

    return {
        login : _login,
        logout: _logout
    };
});
var bootDemo = angular.module("bootDemo", ["ngRoute", "ngCookies"]);

bootDemo.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        $rootScope.loggedIn = function() {
            return $rootScope.globals.currentUser !== undefined;
        };

        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.encodedCredentials;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            if ($location.path() !== '/login' && !$rootScope.loggedIn()) {
                $location.path('/login');
            }
        });
    }]);
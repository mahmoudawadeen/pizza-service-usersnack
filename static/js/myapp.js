/**
 * Created by mahmoudawadeen on 3/28/17.
 */
angular.module('app', ['pizzaServices','ngRoute'])
    .config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/pizza', {
                    templateUrl: '/static/partials/pizzas.html',
                    controller: PizzaListController
                })
                .when('/pizza/:pizzaId', {
                    templateUrl: '/static/partials/pizza-detail.html',
                    controller: PizzaDetailController
                })
                .otherwise({
                    redirectTo: '/'
                });
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }]);
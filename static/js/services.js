/**
 * Created by mahmoudawadeen on 3/28/17.
 */
angular.module('pizzaServices', ['ngResource'])
    .factory('Pizza', function($resource) {
        return $resource('http://localhost:5000/api/pizza/:pizzaId');
    }).factory('Extras', function($resource) {
    return $resource('http://localhost:5000/api/extras');
});
/**
 * Created by mahmoudawadeen on 3/28/17.
 */


function PizzaListController($scope, Pizza) {
    var pizzaQuery = Pizza.query({}, function (pizzas) {
        $scope.pizzas = pizzas;
    });
}

function PizzaDetailController($scope, $routeParams, Pizza, Extras, $http,$location) {
    $scope.disabled = false;
    var pizzaQuery = Pizza.get({pizzaId: $routeParams.pizzaId}, function (pizza) {
        $scope.pizza = pizza;
    });
    var extrasQuery = Extras.query({}, function (extras) {
        $scope.extras = extras;
        $scope.default = $scope.extras[0]; // Set by default the value "test1
        $scope.add = function () {
            var index = $scope.extras.indexOf($scope.default);
            $scope.extras.splice(index, 1);
            $scope.selected.push($scope.default);
            $scope.default = $scope.extras[index % $scope.extras.length];
            $scope.disabled = $scope.extras.length == 0;
        };
        $scope.remove = function (index) {
            $scope.extras.push($scope.selected[index]);
            $scope.default = $scope.extras[0];
            $scope.selected.splice(index, 1);
            $scope.disabled = $scope.extras.length == 0;
        };
        $scope.order = function () {
            var sum = $scope.selected.reduce(function (a, b) {
                return a + b.price;
            }, 0);
            sum += $scope.pizza.price;
            data = {
                'name': $scope.name,
                'address': $scope.address,
                'pizza': $scope.pizza.name,
                'extras': $scope.selected.map(function (a) {
                    return a.name;
                }),
                'total': sum,
                'email': $scope.email
            };
            console.log(data);
            $http.post('/api/order', data).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                alert("Your order was successful");
                $location.path('/pizza');
            }, function errorCallback(response) {
                alert("Your order wasn't created successfully")
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        };
        $scope.selected = [];
    });
}
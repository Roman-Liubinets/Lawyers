//Під`єднюємо ангуляр
var app = angular.module('app', ['ngRoute']);

//Забираєм %2F та # з url сайту
app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
}]);

//Створюєм адреси
app.config(function ($routeProvider) {
    $routeProvider
        .otherwise({
            redirectTo: '/'
        });

});

//Створюємо контроллер
app.controller('myCtrl', function ($scope, $http) {
    $scope.recipeArr = [];
});

//Директиви 

app.directive("headerBlock", function () {
    return {
        replace: true,
        templateUrl: "template/header.html",
        controller: function ($scope, $http) {

            var cityURL = "https://roundlaw.com/api/v1/places/cities";
            var competenciesURL = "https://roundlaw.com/api/v1/competencies";

            $http.get(cityURL).then(function successCallback(response) {
                $scope.citiesData = response.data;
                $scope.description = response.data[0].name;
                //                console.log($scope.citiesData);
            })

            $http.get(competenciesURL).then(function successCallback(response) {
                $scope.competencieData = response.data;
                $scope.description = response.data[0].name;
                //                console.log($scope.citiesData);
            })

        }
    }
});

app.directive("bodyBlock", function () {
    return {
        replace: true,
        templateUrl: "template/body.html",
        controller: function ($scope, $http) {}
    }
});





//Директива з унікальним атрибутом - для передачі файла
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

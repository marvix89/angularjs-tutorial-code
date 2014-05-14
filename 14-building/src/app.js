/* global angular */
(function () {
'use strict';

angular.module('tutorialApp', ['ngResource', 'ngAnimate', 'ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', { templateUrl: 'articles.html' })
      .when('/about', { template: 'Über unsere Pizzeria' })
      .otherwise({ redirectTo: '/'});
  }])
  .directive('price', function(){
    return {
      restrict: 'E',
      scope: {
        value: '='
      },
      template: '<span ng-show="value == 0">kostenlos</span>' +
        '<span ng-show="value > 0">{{value | currency}}</span>'
    };
  })
  .factory('Cart', function() {
    var items = [];
    return {
      getItems: function() {
        return items;
      },
      addArticle: function(article) {
        items.push(article);
      },
      sum: function() {
        return items.reduce(function(total, article) {
          return total + article.price;
        }, 0);
      }
    };
  })
  .factory('Article',['$resource',function($resource) {
    return $resource('articles.json', {}, {
      query: { method: 'GET', params: {}, isArray: true }
    });
  }])
  .controller('ArticlesCtrl', ['$scope', 'Article', 'Cart', function($scope, Article, Cart){
    $scope.cart = Cart;
    $scope.articles = Article.query();
  }])
  .controller('CartCtrl', ['$scope', 'Cart', function($scope, Cart){
    $scope.cart = Cart;
  }]);
}());
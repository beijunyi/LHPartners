//Authored by http://www.beijunyi.com on 17th March 2014

app.controller('NavigationController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
  $(document).keydown(function (e) {

    var home = "/home", about = "/service", contact = "/contact";

    function view(path) {
      $rootScope.$apply(function() {
        $location.path(path);
      });
    }

    var key = e.keyCode;
    if(key == 37 || key == 39) {
      var path = $location.path();
      if(key == 37) {
        if(path == home)
          view(contact);
        else if(path == contact)
          view(about);
        else if(path == about)
          view(home);
      } else {
        if(path == home)
          view(about);
        else if(path == about)
          view(contact);
        else if(path == contact)
          view(home);
      }
      return false;
    }
    return true;
  });
  $scope.isActive = function (route) {
    return route === $location.path();
  }
}
]);
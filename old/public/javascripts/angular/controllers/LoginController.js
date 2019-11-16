import oddin from '../app'

oddin.controller('LoginController', [
  '$scope',
  '$window',
  '$cookies',
  '$location',
  '$state',
  'LoginAPI',
  function($scope, $window, $cookies, $location, $state, LoginAPI) {
    $scope.load = true

    $scope.login = function(user) {
      $scope.load = false
      LoginAPI.login(user).then(function(response) {
        if (response.data.person.admin) {
          $cookies.put('admin', true)
        }
        $window.location.href = '/home'
      })
    }

    $scope.logout = function() {
      LoginAPI.logout()
        .then(function() {
          $cookies.remove('session')
          $cookies.remove('profile')
          $cookies.remove('token')
          $cookies.remove('admin')
          $window.location.href = '/'
        })
        .catch(function() {
          Materialize.toast('Não foi possível sair da aplicação')
        })
    }
  },
])

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

    $scope.recoverPassword = function(user) {
      $scope.load = false
      LoginAPI.recoverPassword(user)
        .then(function() {
          Materialize.toast(
            'Um Email com o link para recuperação de senha será enviado para ' +
              user.email,
            3000,
          )
          $state.go('login')
        })
        .catch(function() {
          Materialize.toast(
            'Não foi possível enviar o email de recuperação de senha',
            3000,
          )
        })
        .finally(function() {
          $scope.load = true
          delete $scope.user
        })
    }

    $scope.redefinePassword = function(user) {
      $scope.load = false
      if (user.password !== user.passwordConfirmation) {
        $scope.load = true
        delete $scope.user
        Materialize.toast('As senhas estão diferentes', 3000)
        return
      }
      user.token = $location.search().token
      LoginAPI.redefinePassword(user)
        .then(function() {
          Materialize.toast('Senha redefinida com sucesso', 3000)
          $state.go('login')
        })
        .catch(function() {
          Materialize.toast('Erro ao redefinir senha', 3000)
        })
        .finally(function() {
          $scope.load = true
          delete $scope.user
        })
    }
  },
])

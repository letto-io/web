import oddin from '../app'

oddin.controller('InstructionsController', [
  '$scope',
  '$cookies',
  '$state',
  'CurrentUser',
  'InstructionAPI',
  '$filter',
  function($scope, $cookies, $state, CurrentUser, InstructionAPI, $filter) {
    $scope.user = CurrentUser

    $scope.enterInstruction = function(instruction) {
      if (!$cookies.get('profile')) {
        InstructionAPI.getProfile(instruction.id)
          .then(function(response) {
            $cookies.put('profile', response.data.profile)
            $state.go('presentations', {
              instructionID: instruction.id,
            })
          })
          .catch(function() {
            Materialize.toast(
              'Erro ao tentar entrar em ' + instruction.lecture.name,
              3000,
            )
          })
      } else {
        $state.go('presentations', {
          instructionID: instruction.id,
        })
      }
    }
  },
])

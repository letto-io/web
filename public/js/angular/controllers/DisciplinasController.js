oddin.controller('DisciplinasController',
  function($scope, Disciplina, $cookies, Profile, $stateParams, $state) {
    function buscaDisciplinas() {
      Disciplina.query(
        function(disciplinas) {
          $scope.disciplinas = disciplinas;
        },
        function(erro) {
          console.log("Não foi possível obter a lista de disciplinas");
          console.log(erro);
        }
      );
    }
    $scope.buscarPerfil = function(disciplina) {
        if(!$cookies.get('profile')) {
            Profile.get({id: disciplina.id},
                function(data) {
                    $cookies.put('profile', data.profile);
                    if($cookies.get('profile') == 0) {
                        $state.go('aulas.aluno', {'disciplinaID': disciplina.id});
                    } else {
                        $state.go('aulas.professor', {'disciplinaID': disciplina.id});
                    }
                },
                function(erro) {
                    console.log("Erro ao encontrar perfil");
                }
            );
        } else {
            if($cookies.get('profile') == 0) {
                $state.go('aulas.aluno', {'disciplinaID': disciplina.id});
            } else {
                $state.go('aulas.professor', {'disciplinaID': disciplina.id});
            }
        }
    }

    $scope.usuario = {
        'nome': JSON.parse($cookies.get('session').substring(2)).person.name,
        'email': JSON.parse($cookies.get('session').substring(2)).user.email
    }

    $scope.titulo = "Disciplinas";
    buscaDisciplinas();
  }
);

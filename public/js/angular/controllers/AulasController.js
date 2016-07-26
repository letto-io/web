angular.module('oddin').controller('AulasController',
    function($scope, $stateParams, Aulas) {
        function buscaAulas() {
            Aulas.get({id: $stateParams.disciplinaID},
                function (disciplina) {
                    $scope.aulas = disciplina.aulas;
                    $scope.titulo = disciplina.nome;
                    $scope._id = disciplina._id;
                },
                function (erro) {
                    $scope.mensagem = {
                        texto: 'Não foi possível obter o resultado.'
                    };
                }
            );
        }
        buscaAulas();
    }
);

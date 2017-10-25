import io from 'socket.io-client'
import oddin from '../app'
import webRtcVideo from '../../webrtc_video'
import webRtcAudio from '../../webrtc_audio'

oddin.controller('PresentationShowController',
  ['$scope', '$http', '$stateParams', 'PresentationAPI', 'MaterialAPI', 'QuestionAPI', 'AnswerAPI', 'CurrentUser',
    function ($scope, $http, $stateParams, PresentationAPI, MaterialAPI, QuestionAPI, AnswerAPI, CurrentUser) {
      $scope.user = CurrentUser
      $scope.filter = false
      const socket = io.connect('http://socket-oddin.rhcloud.com:8000/presentation');

      (function getInfo() {
        $scope.load = false
        PresentationAPI.show($stateParams.presentationID)
                .then(function (response) {
                  $scope.presentation = response.data
                })
                .catch(function () {
                  Materialize.toast('Erro ao carregar informações da aula', 3000)
                })
                .finally(function () {
                  $scope.load = true
                })
      }());

      (function findQuestions() {
        $scope.load = false
        PresentationAPI.getQuestions($stateParams.presentationID)
                .then(function (response) {
                  $scope.questions = response.data
                })
                .catch(function () {
                  Materialize.toast('Erro ao carregar perguntas', 3000)
                })
                .finally(function () {
                  $scope.load = true
                })
      }())

      $scope.createQuestion = function (newQuestion) {
        $scope.load = false
        if (newQuestion.anonymous == undefined) newQuestion.anonymous = false
        PresentationAPI.createQuestion($stateParams.presentationID, newQuestion)
                .then(function (response) {
                  socket.emit('POST /questions', [response.data])
                  Materialize.toast('Dúvida postada', 3000)
                })
                .catch(function () {
                  Materialize.toast('Não foi possível postar a dúvida', 3000)
                })
                .finally(function () {
                  delete $scope.newQuestion
                  $scope.load = true
                })
      }

      $scope.upvoteQuestion = function (question) {
        $scope.load = false
        QuestionAPI.upvote(question.id)
                .then(function () {
                  question.upvotes++
                  question.my_vote = 1
                })
                .catch(function () {
                  Materialize.toast('Erro ao votar na dúvida', 3000)
                })
                .finally(function () {
                  $scope.load = true
                })
      }

      $scope.unvoteQuestion = function (question) {
        $scope.load = false
        QuestionAPI.destroyVote(question.id)
                .then(function () {
                  question.upvotes--
                  question.my_vote = 0
                })
                .catch(function () {
                  Materialize.toast('Não foi possível cancelar o voto', 3000)
                })
                .finally(function () {
                  $scope.load = true
                })
      }

      $scope.findAnswers = function (question) {
        $scope.load = false
        QuestionAPI.getAnswers(question.id)
                .then(function (response) {
                  question.answers = response.data
                })
                .catch(function () {
                  Materialize.toast('Erro ao carregar resposta', 3000)
                })
                .finally(function () {
                  $scope.load = true
                })
      }

      $scope.closeAnswers = function (question) {
        question.answers = undefined
      }

      $scope.createAnswer = function (newAnswer) {
        $scope.load = false
        QuestionAPI.createAnswer($scope.selectedQuestion.id, newAnswer)
                .then(function () {
                  $scope.selectedQuestion.has_answer = true
                  $scope.findAnswers($scope.selectedQuestion)
                  Materialize.toast('Resposta postada', 3000)
                })
                .catch(function () {
                  Materialize.toast('Não foi possível postar a resposta', 3000)
                })
                .finally(function () {
                  delete $scope.newAnswer
                  $scope.load = true
                })
      }

      $scope.upvoteAnswer = function (answer) {
        $scope.load = false
        AnswerAPI.upvote(answer.id)
                .then(function () {
                  if (answer.my_vote == 0) {
                    answer.upvotes++
                  } else if (answer.my_vote == -1) {
                    answer.upvotes += 2
                  }
                  answer.my_vote = 1
                })
                .catch(function () {
                  Materialize.toast('Erro ao votar na resposta', 3000)
                })
                .finally(function () {
                  $scope.load = true
                })
      }

      $scope.unvoteAnswer = function (answer) {
        $scope.load = false
        AnswerAPI.destroyVote(answer.id)
                .then(function () {
                  if (answer.my_vote == 1) {
                    answer.upvotes--
                  } else {
                    answer.upvotes++
                  }
                  answer.my_vote = 0
                })
                .catch(function (error) {
                  Materialize.toast('Não foi possível cancelar o voto', 3000)
                })
                .finally(function () {
                  $scope.load = true
                })
      }

      $scope.downvoteAnswer = function (answer) {
        $scope.load = false
        AnswerAPI.downvote(answer.id)
                .then(function () {
                  if (answer.my_vote == 0) {
                    answer.upvotes--
                  } else if (answer.my_vote == 1) {
                    answer.upvotes -= 2
                  }
                  answer.my_vote = -1
                })
                .catch(function (error) {
                  Materialize.toast('Erro ao votar na resposta', 3000)
                })
                .finally(function () {
                  $scope.load = true
                })
      }

      $scope.acceptAnswer = function (answer) {
        $scope.load = false
        AnswerAPI.accept(answer.id)
                .then(function () {
                  answer.accepted = true
                  for (var i = 0; i < $scope.questions.length; i++) {
                    if ($scope.questions[i].id == answer.question.id) {
                      $scope.questions[i].answered = true
                      break
                    }
                  }
                })
                .catch(function () {
                  Materialize.toast('Erro ao aceitar resposta', 3000)
                })
                .finally(function () {
                  $scope.load = true
                })
      }

      $scope.rejectAnswer = function (answer) {
        $scope.load = false
        AnswerAPI.reject(answer.id)
                .then(function () {
                  answer.accepted = false
                  for (var i = 0; i < $scope.questions.length; i++) {
                    if ($scope.questions[i].id == answer.question.id) {
                      $scope.questions[i].answered = false
                      break
                    }
                  }
                })
                .catch(function () {
                  Materialize.toast('Erro ao recusar resposta', 3000)
                })
                .finally(function () {
                  $scope.load = true
                })
      }

      // TODO: Check why newAnswer is coming as `undefined`
      $scope.createAnswerWithMedia = function (newAnswer) {
        $scope.load = false
        let newMaterial = null
        let file = null
        const answer = { text: ' ' }
        // TODO: Put the material inside an answer, not in the root scope
        const materials = $scope.materials = []

        QuestionAPI.createAnswer($scope.selectedQuestion.id, answer)
                .then((response) => {
                  const answer = response.data
                  console.log(response)
                  return AnswerAPI.createMaterial(answer.id)
                })
                .then((response) => {
                  newMaterial = response.data
                  // TODO: Generate a random file name for blob
                  file = blob
                  var fd = new FormData()

                  for (var key in newMaterial.fields) {
                    fd.append(key, newMaterial.fields[key])
                  }

                  fd.append('file', file)
                  return $http.post(newMaterial.url, fd, {
                    headers: {
                      'Content-Type': undefined,
                    },
                  })
                })
                .then(function () {
                  debugger;
                  return MaterialAPI.update(newMaterial.id, {
                    name: 'Recorded video',
                    mime: file.type,
                  })
                })
                .then(function (response) {
                  materials.push(response.data.material)
                  // TODO: file.name is `undefined`
                  Materialize.toast('O arquivo ' + file.name + ' foi postado', 3000)
                })
                .catch(function (err) {
                  console.log('Olha o erro aqui', err);

                  Materialize.toast('Erro ao fazer upload de material', 3000)
                })
                .finally(function () {
                  document.getElementById('new-material-file').value = ''
                  document.getElementById('new-material-description').value = ''
                  $scope.load = true
                })
      }

      $scope.createAnswerWithMaterial = function (newAnswer) {
        $scope.load = false
        QuestionAPI.createAnswer($scope.selectedQuestion.id, newAnswer)
                .then((response) => {
                  const answer = response.data
                  return AnswerAPI.createMaterial(answer.id)
                })
                .then((response) => {
                  var newMaterial = response.data
                  var file = document.forms.uploadArchive.file.files[0]
                  var fd = new FormData()

                  for (var key in newMaterial.fields) {
                    fd.append(key, newMaterial.fields[key])
                  }

                  fd.append('file', file)
                  return $http.post(newMaterial.url, fd, {
                    headers: {
                      'Content-Type': undefined,
                    },
                  })
                })
                .then(function () {
                  return MaterialAPI.update(newMaterial.id, {
                    name: file.name,
                    mime: file.type,
                  })
                })
                .then(function (response) {
                  $scope.materials.push(response.data.material)
                  Materialize.toast('O arquivo ' + file.name + ' foi postado', 3000)
                })
                .catch(function () {
                  Materialize.toast('Erro ao fazer upload de material', 3000)
                })
                .finally(function () {
                  document.getElementById('new-material-file').value = ''
                  document.getElementById('new-material-description').value = ''
                  $scope.load = true
                })
      }


      $scope.modalCreateAnswer = function (question) {
        $scope.selectedQuestion = question
        $('#modal-create-answer').openModal()
      }

      $scope.stopStream = function () {
        $scope.stream.getTracks().forEach(track => track.stop())
        delete $scope.stream
      }

      $scope.modalCreateVideo = function (question) {
        $('#modal-create-video').openModal({
          complete: function(){
            $scope.stopStream()
          }
        })
        $('#modal-create-answer').closeModal()
        webRtcVideo()
          .then((stream) => {
            $scope.stream = stream
          })
          .catch((err) => {
            alert('Desculpe-me mas não é possível detectar sua câmera!')
          })
      }

      $scope.modalCreateAudio = function (question) {
        $('#modal-create-audio').openModal({
          complete: function(){
            $scope.stopStream()
          }
        })
        $('#modal-create-answer').closeModal()
        webRtcAudio()
          .then((stream) => {
            $scope.stream = stream
          })
          .catch((err) => {
            alert('Desculpe-me mas não é possível detectar sua câmera!')
          })
      }

      $scope.modalCreateMaterial = function (question) {
        $('#modal-create-material').openModal()
        $('#modal-create-answer').closeModal()
      }

      $scope.enableFilter = function () {
        $scope.filter = true
        $('#post-order').removeClass('filter-item-active')
        $('#ranking-order').addClass('filter-item-active')
      }

      $scope.disableFilter = function () {
        $scope.filter = false
        $('#ranking-order').removeClass('filter-item-active')
        $('#post-order').addClass('filter-item-active')
      }

      socket.on('POST /questions', function (data) {
        $scope.$apply(function () {
          data.forEach(function (el) {
            $scope.questions.push(el)
          })
        })
      })
    },
  ])

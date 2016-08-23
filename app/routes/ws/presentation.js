module.exports = function (app) {
  var controller = app.controllers.ws.presentation;

  app.get('/api/presentations', controller.index);
  app.get('/api/presentations/:id', controller.show);
  app.post('/api/presentations', controller.create);
  app.post('/api/presentations/:id/close', controller.close);
  app.put('/api/presentations/:id', controller.update);
  app.delete('/api/presentations/:id', controller.destroy);
  app.get('/api/presentations/:id/questions', controller.showQuestions);
  app.post('/api/presentations/:id/questions', controller.postQuestion);
  app.get('/api/presentation/:id/materials', controller.showMaterials);
  app.get('/api/presentation/:id/materials/new', controller.createMaterial);
};


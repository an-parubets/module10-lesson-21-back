const getID = () => +new Date();

let articles = [];

const createArticlesAPI = (app) => {
  app.get('/articles', (request, response) => {
    if (request.query._limit && request.query._page) {
      const list = articles.slice(
        (request.query._page - 1) * request.query._limit,
        request.query._page * request.query._limit
      );

      response.json({
        articles: list,
        total: articles.length,
        page: request.query._page,
      });
    } else {
      response.json({ articles, total: articles.length, page: 1 });
    }
  });

  app.get('/articles/:id', (request, response) => {
    const article = articles.find(
      (item) => item.id.toString() === request.params.id
    );

    if (article) {
      response.json({ article });
    } else {
      response.status(404).send('Not found');
    }
  });

  app.post('/articles', (request, response) => {
    const article = {
      id: getID(),
      ...request.body,
    };
    articles.push(article);

    response.status(201).json({ article });
  });

  app.put('/articles/:id', (request, response) => {
    const index = articles.findIndex(
      (item) => item.id.toString() === request.params.id
    );

    if (index !== -1) {
      articles[index] = {
        ...articles[index],
        ...request.body,
      };

      response.status(201).json({ article: articles[index] });
    } else {
      response.status(404).send('Not found');
    }
  });

  app.patch('/articles/:id', (request, response) => {
    const index = articles.findIndex(
      (item) => item.id.toString() === request.params.id
    );

    if (index !== -1) {
      articles[index] = {
        ...articles[index],
        ...request.body,
      };

      response.status(203).json({ article: articles[index] });
    } else {
      response.status(404).send('Not found');
    }
  });

  app.delete('/articles/:id', (request, response) => {
    const article = articles.find(
      (item) => item.id.toString() === request.params.id
    );

    if (article) {
      articles = articles.filter(
        (item) => item.id.toString() !== request.params.id
      );

      response.status(203).json({ article });
    } else {
      response.status(404).send('Not found');
    }
  });
};

module.exports = createArticlesAPI;

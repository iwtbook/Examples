function render(app) {
  const helloWorld = document.createElement('h1');
  helloWorld.innerHTML = 'Hello, App World!';
  app.append(helloWorld);

  const description = document.createElement('p');
  description.innerHTML =
    'Why write anything in markup when I can use\
                               JavaScript for everything?';
  app.append(description);

  const listTitle = document.createElement('p');
  listTitle.innerHTML = 'Some of my favorite things about JavaScript are:';
  app.append(listTitle);

  const list = document.createElement('ul');
  const favoriteThings = [
    'Loose typing',
    'Asynchronous requests',
    'In the front and back end',
  ];
  for (let i = 0; i < favoriteThings.length; i++) {
    const newItem = document.createElement('li');
    newItem.innerHTML = favoriteThings[i];
    list.append(newItem);
  }
  app.append(list);
}

render(document.getElementById('app'));

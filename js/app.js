App = Ember.Application.create();

App.Router.map(function() {
  this.resource('about');
  this.resource('posts', function() {
    this.resource('post', { path: ':post_id' });
  });
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return posts;
  }
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return posts.findBy('id', params.post_id);
  }
});

App.PostController = Ember.ObjectController.extend({
  isEditing: false,

  actions: {
    edit: function() {
      this.set('isEditing', true);
    },

    doneEditing: function() {
      this.set('isEditing', false);
    }
  }
});

var posts = [{
  id: '1',
  title: 'Rails is Omakase',
  author: { name: "dhh" },
  date: new Date('12-12-2012'),
  excerpt: 'Lorem ipsum',
  body: 'Lorem ipsum'
}, {
  id: '2',
  title: 'I want parley',
  author: { name: "dhh" },
  date: new Date('12-12-2012'),
  excerpt: 'Lorem ipsum',
  body: 'Lorem ipsum'
}];

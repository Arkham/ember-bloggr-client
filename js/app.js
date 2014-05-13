App = Ember.Application.create();

App.Router.map(function() {
  this.resource('about');
  this.resource('posts', function() {
    this.resource('post', { path: ':post_id' });
  });
});

var posts = [];

App.PostsRoute = Ember.Route.extend({
  model: function() {
    if (posts.length != 0) {
      return posts;
    } else {
      return $.getJSON('http://tomdale.net/api/get_recent_posts/?callback=?').then(function(data) {
        posts = data.posts.map(function(post) {
          post.body = post.content;
          return post;
        });

        return posts;
      });
    }
  },

  afterModel: function(posts) {
    this.transitionTo('post', posts[0]);
  }
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return $.getJSON('http://tomdale.net/api/get_post/?id=' + params.post_id + '&callback=?').then(function(data) {
      data.post.body = data.post.content;
      return data.post;
    });
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

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});

var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input) {
  return new Handlebars.SafeString(showdown.makeHtml(input));
});

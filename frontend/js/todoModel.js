/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
var app = app || {};

(function () {
	'use strict';

	var Utils = app.Utils;
	// Generic "model" object. You can use whatever
	// framework you want. For this application it
	// may not even be worth separating this logic
	// out, but we do this to demonstrate one way to
	// separate out parts of your application.
	app.TodoModel = function (key, todos) {
		this.key = key;
		this.todos = todos;
		this.onChanges = [];
	};

	app.TodoModel.prototype.subscribe = function (onChange) {
		this.onChanges.push(onChange);
	};

	app.TodoModel.prototype.inform = async function () {
		await Utils.store(this.key, this.todos);
		this.onChanges.forEach(function (cb) { cb(); });
	};

	app.TodoModel.prototype.addTodo = async function (title) {
		this.todos = this.todos.concat({
			id: Math.random().toString(36).substr(2),
			title: title,
			completed: false
		});

		await this.inform();
	};

	app.TodoModel.prototype.toggleAll = async function (checked) {
		// Note: it's usually better to use immutable data structures since they're
		// easier to reason about and React works very well with them. That's why
		// we use map() and filter() everywhere instead of mutating the array or
		// todo items themselves.
		this.todos = this.todos.map(function (todo) {
			return Object.assign({}, todo, {completed: checked});
		});

		await this.inform();
	};

	app.TodoModel.prototype.toggle = async function (todoToToggle) {
		this.todos = this.todos.map(function (todo) {
			return todo !== todoToToggle ?
				todo :
				Object.assign({}, todo, {completed: !todo.completed});
		});

		await this.inform();
	};

	app.TodoModel.prototype.destroy = async function (todo) {
		this.todos = this.todos.filter(function (candidate) {
			return candidate !== todo;
		});

		await this.inform();
	};

	app.TodoModel.prototype.save = async function (todoToSave, text) {
		this.todos = this.todos.map(function (todo) {
			return todo !== todoToSave ? todo : Object.assign({}, todo, {title: text});
		});

		await this.inform();
	};

	app.TodoModel.prototype.clearCompleted = async function () {
		this.todos = this.todos.filter(function (todo) {
			return !todo.completed;
		});

		await this.inform();
	};

})();

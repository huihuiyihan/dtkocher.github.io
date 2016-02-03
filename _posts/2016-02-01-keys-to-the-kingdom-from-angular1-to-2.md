---
layout: post
title:  The Keys to the Kingdom - From Angular 1 to 2
url: /angular2/2016/01/25/keys-to-the-kingdom-from-angular-1-to-2.html
permalink: /angular2/2016/02/01/keys-to-the-kingdom-from-angular-1-to-2.html
keywords: Angular2, Angular, Directives, Components
excerpt: The Keys to the Kingdom - From Angular 1 to 2
date:   2016-01-24 23:54:08
categories: Angular2
body_title: The Keys
body_description: |
  to the Kingdom - From Angular 1 to 2
excerpt: |
  <p>
    AngularJS was originally created back around 2009. It was built with the hope of helping web designers sprinkle a
    little magic into their designs. What happened instead was the revolution of the single page application. While
    AngularJS is still very powerful it has it warts, after all it was built with design first in mind. With new frameworks
    like Flux with React coming out with speed and developer savy in mind, AngularJS needed a revamp.
  </p>
  <p>
    Now that the revamp of AngularJS is here in the form of Angular 2 beta, given it is powered by Google where everything
    is beta. I think it is time to investigate the Keys to the Kingdom that is Angular 2
    <a href="/angular2/2016/01/25/keys-to-the-kingdom-from-angular-1-to-2.html">... read more</a>
  </p>
---
AngularJS was originally created back in 2009. It was built initially with the hope of helping web designers sprinkle a
little magic into their html. What happened instead was the revolution of the single page application. While
AngularJS is still very powerful it has it warts, after all it was built with design first in mind. Given new frameworks
like Flux with React coming out with speed and developer savy in mind, AngularJS needed a revamp.

Now that the revamp of AngularJS is here, in the form of Angular 2 beta and production ready. After all it is Google and
everything in production is beta. I think it is time to investigate the Keys to the Kingdom that is Angular 2.

While following along the process of Angular 2's creation, I don't see any easy way to upgrade your apps from Angular 1 to 2.
There are helpful methods and procedures you can follow, but in the end you will be updating the majority of your code base.
From what I have seen it is worth it in everyway, whether for a code readability perspective or for technical reasons.

In this blog post I am going to start you on your way to picking up Angular 2 based on what you know from Angular 1. The
true power of Angular 1 was in something called a Directive, and this is where I will start. I will be explaining the Angular 1
approach in the case as I go along in the case you are new to Angular 1 as well.

I will be using Typescript for Angular 2 throughout this post as I want to show Angular 2 in all its glory. As we walk through the
differences in how to create a Directive between Angular 1 and 2 we will be building Task and Subtask directives. If you wish to
follow along by writing the code yourself you can get a start here:

  + [Angular 1 Task Start][angular1-starter]
  + [Angular 2 Task Start][angular2-starter]

<br/>

###Setting Up Your Directive
This will be the start of many differences you see between the Angular 1 and 2. In this section we aren't going to add any
special logic, we will be focusing strickly on setting up the directive files only.
<br/>

In **Angular 1** we create a directive by creating a `.directive` function.

``` javascript
// tasks.js
angular.module('TaskApp');

app.directive('tasks',function() {
  return {};
});
```
<br/>

In **Angular 2** you have three things you have to do:

  1. Import the Directives you are going to need
  1. Create a first rate class
  1. Add the magical metadata using either a `@Component` or `@Directive` annotation

``` ts
// app/tasks.ts
import {Component, View} from 'angular2/core';

@Component({
  selector: 'tasks',
})
@View({
  template: '<p>Hi</p>'
})
export class Task { }
```

After seeing the differences in setting up the the directive files between Angular 1 and 2 you probably have some questions.

  1. **Why are we using `@Component` instead of `@Directive`?** To start out, in Angular 2 everything is a Directive. There is no more
  deciding on whether I should use a controller or a directive. The annotation `@Component` is a directive that requires a view. This will be
  what you use to build out all the different parts of you Angular app's view, **Angular 2's** foundation. The annotation `@Directive` is a
  directive that acts on a behavior, you will use this to add behavior to your different HTML elements.
  1. **Do we always have to put the template in the `@View` or can we put it somewhere external?** `@View` also has the templateUrl option you
  can add to the metadata properties. With templateUrl you can point to a file location for your template.
  1. **Do we have to always use `@View` with `@Component`?** You will always need to have a view with a `@Component`. However, you do not
  necessarly need to use the `@View` annonation. `@Component` actually contains the option of template and templateUrl as well. The power
  of using `@View` though is it allows you to specify devices to apply the display on, for example mobile or desktop. You can have multiple
  `@View's`.
  1. **What is this `import` and `export`?** In Angular2 everything is modular, and therefore better by default, including the core Angular library.
  So if you need something external from your Component you must `import` it into your new component hince the `import {Component, View} from 'angular2/core';`.
  To make your class/component available to the rest of your Angular app you will need to `export` it hince the `export class Task {}`.
  If you have been doing AngularJS for very long you probably made your Angular 1 app modular by using something like RequireJS or Webpack,
  no more of however. If you have never used RequireJS or Webpack to make your application modular here is what it would look like:

    ``` javascript
      // tasks.directive.js
      (function() {
        'use strict';

        module.exports = Tasks;

        Tasks.$inject = [];

        function Tasks() {
          return {
          };
        }
      })();
    ```

    ``` javascript
      // tasks.module.js
      angular.module('TaskApp')
      .directive('Tasks', require('./tasks.directive'));
    ```

<br/>

###Building Out The Ability To Add Tasks
Now we have setup the directives in both Angular 1 and 2, and understand how the setups differ. It is now time to add
some logic to these Directives. We will be adding the ability to Add Tasks to a list by entering the Task name and
clicking a Submit button.

We will start in **Angular 1**. We need to start out by adding `<task>` tags to the index.html. It is between these tags
that Angular does all its work. For this post we are not concerned with `ng-controller="MainCtrl"`, but this is required in
Angular 1 as everything starts with a controller. If you are familar with Angular 1 you can just view the code snippets and move
on to the Angular 2 section.

``` html
<!-- index.html -->
  <body ng-controller="MainCtrl">
    <tasks></tasks>
  </body>
```

Now lets build the tasks template in tasks.html.

``` html
<!-- tasks.html -->
<input type="text" ng-model="newTask" placeholder="Enter Tasks"/>
<button type="button" class="btn btn-primary" ng-click="addTask()">Submit</button>
<ol>
  <li ng-repeat="task in tasks track by $index">
    <h3>{{ task }}</h3>
  </li>
</ol>
```

The only things to notice in the template are:

  + `ng-model="newTask"` - In Angualr 1, ng-model is a way to associate/use a variable in the Tasks directive's scope to it's template.
  + `ng-click="addTask()"` - Here we are creating an onclick event and having it call the Tasks directive's `addTask()` function.
  + `ng-repeat="task in tasks track by $index"` - This is Angular 1's template version of a for loop. We are just looping through the
  tasks on the Tasks directive's scope and tracking each task by it's index. There will be a `<li></li>` tag created for each task.

It is now time to build the actual directive now that we have the tags in the index.html and the template for it.

``` javascript
// tasks.js
angular.module('TaskApp')

  .directive('tasks', function() {
    return {
      restrict: 'E',
      templateUrl: 'tasks.html',
      link: function(scope, element, attrs){
        scope.tasks = [];
        scope.newTask = '';

        scope.addTask = function(){
          if(scope.newTask !== ''){
            scope.tasks.push(scope.newTask);
            scope.newTask = '';
          }
        }
      }
    };
  });
```

The things to point out about this Tasks directive are:

  + `restrict: 'E'` - Restrict is the way we define how we declare the Tasks directive in the DOM.
    * A - matches attribute name - `<div tasks></div>`
    * E - matches element name - `<tasks></tasks>`
    * C - matches class name - `<div class="tasks"></div>`
  + **link function** - This is often a debate in Angular 1, should we use link or controller.
    * link - This is rendered after the directive is cloned and typically used for behavior oriented things on the directive.
    * controller - Typically used if another directive needs to talk to it.

<br>

It is now time to build the **Angular 2** Tasks directive or should I say component.

``` html
<!-- app/app.html -->
<tasks></tasks>
```

The only thing to ask here is why are we putting the `<tasks>` tags in app/app.html instead of index.html. The reason is in Angular 2
there is always root component and in this example I made the root component a component called App. There is no particular reason I
did this. I could have just as easily made Tasks the root component.

``` html
<!-- app/tasks.html -->
<input type="text" [(ngModel)]="newTask" placeholder="Enter Tasks" />
<button type="button" class="btn btn-primary" (click)="add()">Submit</button>
<ol>
  <li *ngFor="#task of tasks; #index = index;">
    <h3>{{ task }}</h3>
  </li>
</ol>
```

For the most part the Angular 2 Tasks template probably doesn't look much different than the Angular 1 version.
So nothing to say here. Time to get to the real reason we are here.

``` ts
//app/task.ts
import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

@Component({
  selector: 'tasks',
  templateUrl: 'app/tasks.html',
  directives: [CORE_DIRECTIVES]
})
export class Tasks {
  private _tasks:Array<string> = [];
  private _newTask:string = '';

  get tasks():Array<Task> {
    return this._tasks;
  }

  get newTask():string {
    return this._newTask;
  }

  set newTask(newTask):void {
    this._newTask = newTask;
  }

  add():void {
    if(this.newTask.length > 0){
      this._tasks.push(new Task(this.newTask));
      this.newTask = '';
    }
  }
}
```

So what you ask is going on here.

  + As described earlier we have to import all the components needed for this component. **CORE_DIRECTIVES** is actually a short cut for
  importing **NgClass, NgIf, NgFor, NgSwitch, NgSwitchWhen, and NgSwitchDefault**.
  + For the sake of a different look I removed the `@View` annotation and added the **templateUrl** to the `@Component` metadata.
  + **What is this ``directives: [CORE_DIRECTIVES]``?** Every component that is needed in the view is now required to be added to the
  `directives` property array. This would be available in the `@View` metadata as well if you went that route for your display metadata.
  + **Where is the link function?** Well in Angular 2 we don't have to worry about links or controllers anymore. As you see we now have
  a first rate class to represent what is going on. With the beauty of **Typescript** we are able to hide our variables using private
  encapsolation and expose them via getters and/or setters. By default everything in a Typescript class is public. We also no longer
  have to worry about this silly **scope** thing. Every class public method or variable is available to the template to call and/or use.

<br>

###What Are These Tasks For

We have the ability to add tasks now. But what are these tasks for (Chores at Home, Work, etc.)? Lets add the ability to
define what the tasks are for and style it using the bootstrap page header. We want to be able to put html markup between
the `<tasks>` tags. In other words we want to be able to:

``` html
<tasks>
  <h1>House Chores <br/>
    <small>Create your chores and the taskes to complete them.</small>
  </h1>
</tasks>
```

<br>

In **Angular 1** we will be using something fancy called **Transclusion**. It isn't actually all that fancy, it is basicly just
moving html from one location to another.

``` html
<!-- tasks.html -->
<div class="page-header" ng-transclude>
</div>
<input type="text" ng-model="newTask" placeholder="Enter Tasks"/>
<button type="button" class="btn btn-primary" ng-click="addTask()">Submit</button>
<ol>
  <li ng-repeat="task in tasks track by $index" >
    <h3>{{ task.name }}</h3>
  </li>
</ol>
```

``` javascript
// tasks.js
angular.module('TaskApp')

  .directive('tasks', function() {
    return {
      restrict: 'E',
      templateUrl: 'tasks.html',
      transclude: true,
      link: function(scope, element, attrs){
        scope.tasks = [];
        scope.newTask = '';

        scope.addTask = function(){
          if(scope.newTask !== ''){
            scope.tasks.push(scope.newTask);
            scope.newTask = '';
          }
        }
      }
    };
  });
```

In Angular 1 to perform transclusion there is something called `ng-transclude` which we will add to the Tasks directive template
where we want the html injected. We will also need to add the `transclude: true` line to the Tasks directive. If you would like
to learn more about Transclusion there is a great article [here][[tranclude].

<br>

In **Angular 2** you just need to do one thing, add `<ng-content>` tags to the template.

``` html
<!-- app/tasks.html -->
<div class="page-header">
  <ng-content></ng-content>
</div>
<input type="text" [(ngModel)]="newTask" placeholder="Enter Tasks" />
<button type="button" class="btn btn-primary" (click)="add()">Submit</button>
<ol>
  <li *ngFor="#task of tasks; #index = index;">
    <h3>{{ task.name }}</h3>
  </li>
</ol>
```

Where did **Transclusion** go? Well in Angular 2 we no longer use transculsion, we use something way more powerful called
**Shadow DOM**. The basics of Shadow DOM are as follows:

  + Shadow DOM allows you to build true components. It seperates the content from the presentation.
    * There are two new nodes introduced to the DOM the Shadow Root and Host.
    * There are two new important standards used. The `<template>` and `<content>` elements.
    * Any style defined on inside the `<template>` tags are private to that template and does not affect the
    rest of the DOM.
    * Any markup or text (dynamic or not) defined in the root element is passed to the host element or `<template>`
    and placed between `<content>` tags.
    * An example is if you define a root element for example `<div id="#Dustin">Hi</div>` and a host element
    `<template id="#Dustinhost"><style> span { font-family: 'Arial' } </style><content></content> <span>World</span></template>`
    you will be given the display **Hi World**. Also only the span tags within the `<template>` tags are affected by
    the style.
    * If you are interested in a more indepth view into Shadow DOM you should check out this article [here][shadow-dom].
  + You might ask why are we then using ng-content instead of just content tags, which would be a great question. Because
  very few browsers currently support Shadow DOM, Angular 2 provides three forms of Shadow DOM encapsulation. If you don't
  use the default encapsulation you would need to define in the `@Component` metadata the property **encapsulation** of one of the following
    * ViewEncapsulation.None - This takes away Shadow DOM and provides no encapsulation.
    * ViewEncapsulation.Emulated - This is the default. It does not use true Shadow DOM. However it does provide
    style encapsulation emulation. This inserts style in the main header. To provide the encapsolution it adds attributes
    to the style's name and therefor makes it unique to each component. This provides basically what real Shadow DOM provides
    but is a work around for browsers not up to standards.
    * ViewEncapsulation.Native - This uses real Shadow DOM.

<br>

###Adding Subtasks To A Task

Now that we have the ability to add tasks it would be nice if we could add subtasks to each task to allow more detail
to be added. Lets also add a checkbox to each subtask so we can mark when it is complete (really since we aren't hitting a
server this is more for visual appeal).

Lets add the following in **Angular 1**.

``` html
<!-- tasks.html -->
<div class="page-header" ng-transclude>
</div>
<input type="text" ng-model="newTask" placeholder="Enter Tasks"/>
<button type="button" class="btn btn-primary" ng-click="addTask()">Submit</button>
<ol>
  <li ng-repeat="task in tasks track by $index" >
    <h3>{{ task.name }}</h3>
    <sub-tasks ></sub-tasks>
  </li>
</ol>
```

``` html
<!-- sub-tasks.html -->
<input type="text" ng-model="newSubTask" placeholder="Enter Sub Tasks"/>
<button type="button" class="btn btn-primary" ng-click="addSubTask()">Submit</button>
<ul>
  <li ng-repeat="subTask in subTasks track by $index">
    <input type="checkbox">
    {{ subTask }}
  </li>
</ul>
```

``` javascript
//sub-tasks.js
angular.module('TaskApp')
  .directive('subTasks', function() {
    return {
      restrict: 'E',
      templateUrl: 'sub-tasks.html',
      link: function(scope, element, attrs) {
        scope.subTasks = [];
        scope.newSubTask = '';

        scope.addSubTask = function(){
          if(scope.newSubTask !== ''){
            scope.subTasks.push(scope.newSubTask);
            scope.newSubTask = '';
          }
        }
      }
    };
  });
```

There is really nothing of note here. We just created the Subtasks directive, template, and added `<sub-tasks>` tags
to the tasks.html. Everything else should make sense.

<br>

In **Angular 2** there is slightly more work to do.

``` html
<!-- app/tasks.html -->
<div class="page-header">
  <ng-content></ng-content>
</div>
<input type="text" [(ngModel)]="newTask" placeholder="Enter Tasks" />
<button type="button" class="btn btn-primary" (click)="add()">Submit</button>
<ol>
  <li *ngFor="#task of tasks; #index = index;">
    <h3>{{ task.name }}</h3>
    <sub-tasks ></sub-tasks>
  </li>
</ol>
```

``` ts
//app/tasks.ts
import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {SubTasks} from './sub-tasks'

@Component({
  selector: 'tasks',
  templateUrl: 'app/tasks.html',
  directives: [CORE_DIRECTIVES, SubTasks]
})
export class Tasks {
  private _tasks:Array<string> = [];
  private _newTask:string = '';

  get tasks():Array<string> {
    return this._tasks;
  }

  get newTask():string {
    return this._newTask;
  }

  set newTask(newTask):void {
    this._newTask = newTask;
  }

  add():void {
    if(this._newTask.length > 0){
      this._tasks.push(this.newTask);
      this.newTask = '';
    }
  }
}
```

We have to import the **SubTasks** component into app/tasks.ts so that Tasks knows about it. Along with that we had
to add **SubTasks** as a directive that will be used in the components view.

``` ts
//app/sub-tasks.ts
import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

@Component({
  selector: 'sub-tasks',
  templateUrl: 'app/sub-tasks.html',
  directives: [CORE_DIRECTIVES],
})
export class SubTasks {
  private subTasks:Array<string> = [];

  add(newSubTask):void {
    if(newSubTask.length > 0){
      this.subTasks.push(newSubTask);
    }
  }
}
```

This probably looks pretty similar to the Tasks component. The only difference is we are passing in the newSubTask
to the add method instead of using a variable already defined on SubTasks. Lets see why.

```html
<!-- app/sub-tasks.html -->
<input type="text" #newSubTask placeholder="Enter Sub Tasks"/>
<button type="button" class="btn btn-primary" (click)="add(newSubTask.value); newSubTask.value=''">Submit</button>
<ul>
  <li *ngFor="#subTask of subTasks; #index = index;">
    <input type="checkbox">
    {{ subTask.name }}
  </li>
</ul>
```

The reasons is because in Angular 2 we can define template variables. You do this by adding a #variablename attribute
to the element. As you can see we created a newSubTask template element that holds the input value for the input field.
We then pass this to the add function and reset it on the click event.

<br>

###Removing Completed Subtasks and Completed Tasks

Now that we can create tasks and subtasks lets take it one more step. Lets remove the subtasks that are complete and
if a tasks no longer has any active subtasks lets remove them as well.

In **Angular 1** lets start by setting up the Tasks directive:

``` html
<!-- tasks.html -->
<div class="page-header" ng-transclude>
</div>
<input type="text" ng-model="newTask" placeholder="Enter Tasks"/>
<button type="button" class="btn btn-primary" ng-click="addTask()">Submit</button>
<ol>
  <li ng-repeat="task in tasks track by $index" ng-show="task.show">
    <h3>{{ task.name }}</h3>
    <sub-tasks task-index="$index"></sub-tasks>
  </li>
</ol>
```

First we are going to have to send the Subtasks directive the index of the directive that they belong to. This
is done by passing the index as we loop.

``` js
//tasks.js
angular.module('TaskApp')

  .directive('tasks', function() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'tasks.html',
      controller: function($scope){
        this.closeOut = function(index){
          if(index !== -1){
            $scope.tasks[index].show = false;
          }
        }
      },
      link: function(scope, element, attrs, ctrl){
        scope.tasks = [];
        scope.newTask = '';

        scope.addTask = function(){
          if(scope.newTask !== ''){
            scope.tasks.push({name: scope.newTask, show: true});
            scope.newTask = '';
          }
        }
      }
    };
  });
```

Second we are going to have to add a controller to the Tasks directive. We need this as mentioned earlier because
another directive will need to talk to it, that directive being the Subtasks directive. In the controller we created
a closeOut function that will be called by the Subtasks directive with the index of the finished task.

Now lets look at Subtasks.

``` html
<!-- sub-tasks.html -->
<input type="text" ng-model="newSubTask" placeholder="Enter Sub Tasks"/>
<button type="button" class="btn btn-primary" ng-click="addSubTask()">Submit</button>
<ul>
  <li ng-repeat="subTask in subTasks track by $index">
    <input type="checkbox" ng-click="removeSubTask($index)">
    {{ subTask }}
  </li>
</ul>
```

All we did here was add a ng-click event to call removeSubTasks with the index of the Subtask that needs to be removed.

``` js
//sub-tasks.js
angular.module('TaskApp')
  .directive('subTasks', function() {
    return {
      restrict: 'E',
      templateUrl: 'sub-tasks.html',
      scope: {
        taskIndex: '='
      },
      require: '^tasks',
      link: function(scope, element, attrs, ctrl) {
        scope.subTasks = [];
        scope.newSubTask = '';

        scope.addSubTask = function(){
          if(scope.newSubTask !== ''){
            scope.subTasks.push(scope.newSubTask);
            scope.newSubTask = '';
          }
        }

        scope.removeSubTask = function(index){
          if(index !== -1){
            scope.subTasks.splice(index, 1);
          }

          if(scope.subTasks.length === 0){
            ctrl.closeOut(scope.taskIndex);
          }
        }
      }
    };
  });
```

What to notice here are:
  + We added a scope taskIndex that needs to be passed in. This will alow the Subtask directive to know the task it is unders
  index. For more information the options for scope variables being passed in are:
    * `=` - This is a two way binding between both the parent and child directive. So when the value changes in one directive
    it changes in both. A ng-modle most always be passed in these cases.
    * `&` - This is used to bind a parent directive's method to the child directive.
    * `@` - This is a one way binding between the parent directive and child directive. When the parent directive changes
    it changes the child directive but not visa versa. An expression must be passed in these cases - `{{}}`.
  + We added a `require: '^tasks'` property to the directive. This forces the directive to be a child of the Tasks directive. It
  also gives access in the link fuction to the Tasks controller.
  + In the link function we added the ability to remove a subtaks and when there are no more we call the Tasks directive
  closeOut function with the approriate task indes so it is no longer displayed.

We now have a working Angular 1 Task and Subtask tracker.

<br>

So in **Angular 2** and the power of Typescript lets build a new class called Task. In this class we want to hold the
Task name and whether it is active or not.

``` ts
//app/task.ts
export class Task {
  private _active:boolean;

  constructor(private _name:string){
    this._active = true;
  }

  get name():string{
    return this._name;
  }

  get active():string{
    return this._active;
  }

  deactive():void{
    this._active = false;
  }
}
```

You might ask why we have an `_active:boolean` defined but not one for `_name`. Well in Typescript we can create public
and private class variables in the contrustor which is what we did with `_name`.  You also might notice we have export
in front of class, this is so other component or classes can use this Task class.

Now lets update the Tasks component.

``` ts
//app/tasks.ts
import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Task} from './task';
import {SubTasks} from './sub-tasks'

@Component({
  selector: 'tasks',
  templateUrl: 'app/tasks.html',
  directives: [CORE_DIRECTIVES, SubTasks]
})
export class Tasks {
  private _tasks:Array<Task> = [];
  private _newTask:string = '';

  get tasks():Array<Task> {
    return this._tasks;
  }

  get newTask():string {
    return this._newTask;
  }

  set newTask(newTask):void {
    this._newTask = newTask;
  }

  add():void {
    if(this._newTask.length > 0){
      this._tasks.push(new Task(this.newTask));
      this.newTask = '';
    }
  }

  remove(index):void {
    this._tasks[index].deactive();
  }
}
```

Here we have imported the new Task class. We have also updated all the _tasks to use the new Task class. We have an
Array of Task now and we create `new Task(this.newTask)` objects when we add a task. The other thing we added was
the remove a task method. This method calls the `deactive()` method on the Task class to set the active attribute to false
as shown above for the tasks index that was passed into the remove method.

``` html
<!-- app/tasks.html -->
<div class="page-header">
  <ng-content></ng-content>
</div>
<input type="text" [(ngModel)]="newTask" placeholder="Enter Tasks" />
<button type="button" class="btn btn-primary" (click)="add()">Submit</button>
<ol>
  <li *ngFor="#task of tasks; #index = index;" [hidden]="!task.active">
    <h3>{{ task.name }}</h3>
    <sub-tasks [taskIndex]="index"></sub-tasks>
  </li>
</ol>
```

In the tasks.html we have added a [hidden] attribute that is part of the CORE_DIRECTIVES which allows us to define wether or
not to show a element. The other thing we did was define a new attribute on sub-tasks called [taskIndex] in which we pass
the index of the task the subtask is associated with.

Now lets see how the subtask directive changed.

``` html
<!-- app/sub-tasks.html -->
<input type="text" #newSubTask placeholder="Enter Sub Tasks"/>
<button type="button" class="btn btn-primary" (click)="add(newSubTask.value); newSubTask.value=''">Submit</button>
<ul>
  <li *ngFor="#subTask of subTasks; #index = index;">
    <input type="checkbox" (click)="remove(index)">
    {{ subTask.name }}
  </li>
</ul>
```

Here all we did was add a (click) event to call the subtask directive's `remove` function with the index of the subtask
to remove.

``` ts
//app/sub-tasks.ts
import {Component, Inject, forwardRef} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Tasks} from './tasks';
import {Task} from './task';

@Component({
  selector: 'sub-tasks',
  templateUrl: 'app/sub-tasks.html',
  directives: [CORE_DIRECTIVES],
  inputs: ['taskIndex']
})
export class SubTasks {
  private subTasks:Array<Task> = [];
  private _tasks:Tasks;

  constructor(@Inject(forwardRef(() => Tasks)) tasks) {
    this._tasks = tasks;
  }

  add(newSubTask):void {
    if(newSubTask.length > 0){
      this.subTasks.push(new Task(newSubTask));
    }
  }

  remove(index:number):void{
    if(index !== -1){
      this.subTasks.splice(index, 1);
    }

    if(this.subTasks.length === 0){
      this._tasks.remove(this.taskIndex);
    }
  }
}
```

Yes we changed quite a decent amount here.
  + We imported the Task class here just as we did in the Tasks component. Just as we did there we updated all
  the areas dealing with `_tasks` to use the new Task class.
  + You might also notice we have a new metadata property **inputs** which we pass in the array the taskIndex.
  No longer do we have to create some weird scope variable using the following signes which make no sense =, &, and @.
  We also don't have to worry does this bind one way or two way. If it is an inputs it binds from parent to child. If
  it is outputs it binds from child to parent. Lastly you can have the inputs also be in the outputs so you get your
  two way binding.
  + No more `require` to say you want to use another directive. Instead you can do what makes sense. You can inject
  the component or directive you need straight into the constructor. You might ask why I had to do `@Inject(forwardRef(() => Tasks)) tasks)`?
  Well this particular injection is special. That is because the Tasks component also imports the SubTasks component.
  So since there is a circular dependency we use the `@Inject` and `forwardRef` component to allow us to force
  SubTasks not to be created until there is a Tasks component instantiated.
  + Last but not least we were able to use the injected Tasks component to call the Tasks remove function to close
  out a Task when it no longer has any subtasks.

<br>

###Conclusion
I hope this post has helped you learn. As you can see just from the perspective of writing a
Directive, a ton has changed from Angular 1 to 2. If you wish to see the difference between
Angular 1 and Angular2 in working order you can view the plunkers of the two versions of Tasking here:

  + [Angular1 Task][angular1-task-done]
  + [Angular2 Task][angular2-task-done]


[angular1-starter]: http://plnkr.co/edit/M1Sl3pdhdSOVh2jZUJR6?p=preview
[angular2-starter]: http://plnkr.co/edit/6jG1UEPt96aY3JeY3Uww?p=preview
[angular1-task-done]: http://plnkr.co/edit/PyAgQLtmnoP9AP7JNh0G?p=preview
[angular2-task-done]: http://plnkr.co/edit/mAAN3GmgPcuvRvEDhixO?p=preview
[tranclude]: http://teropa.info/blog/2015/06/09/transclusion.html
[shadow-dom]: http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/

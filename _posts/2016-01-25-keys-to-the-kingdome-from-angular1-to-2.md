---
layout: post
title:  The Keys to the Kingdom - From Angular 1 to 2
url: /angular2/2016/01/25/keys-to-the-kingdom-from-angular-1-to-2.html
permalink: /angular2/2016/01/25/keys-to-the-kingdom-from-angular-1-to-2.html
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
true power of Angular 1 was in something called a Directive, and this is where I will start.

I will be using Typescript for Angular 2 throughout this post as I want to show Angular 2 in all its glory. As we walk through the
differences in how to create a Directive between Angular 1 and 2 we will be building Task and Subtask directives. If you wish to
follow along by writing the code yourself you can get a start here:

  + [Angular 1 Task Start][angular1-starter]
  + [Angular 2 Task Start][angular2-starter]

<br/>

###Setting up your Directive
This will be the start of many differences you see between the two languages.
<br/>

In **Angular 1** we create a directive by creating a `.directive` function.

``` javascript
angular.module('TaskApp');

app.directive('task',function() {
  return {};
});
```
<br/>

In **Angular 2** you have three things you have to do:

  1. Import the Directives you are going to need
  1. Create a first rate class
  1. Add the magical metadata using either a `@Component` or `@Directive` annotation

``` ts
import {Component, View} from 'angular2/core';

@Component({
  selector: 'task',
})
@View({
  template: '<p>Hi</p>'
})
export class Task { }
```

After seeing the differences between Angular 1 and 2 you probably have some questions.

  1. **Why are we using `@Component` instead of `@Directive`?** To start out, in Angular 2 everything is a Directive. There is no more
  deciding on whether I should use a controller or a directive. The annotation `@Component` is a directive that requires a view. This will be
  what you use to build out all the different parts of you Angular app's view. The annotation `@Directive` is a directive that acts
  on a behavior, you will use this to add behavior to your different HTML elements.
  1. **Do we always have to put the template in the `@View` or can we put it somewhere external?** `@View` also has the templateUrl option you
  can add to the metadata properties. With templateUrl you can point to a file location for your template.
  1. **Do we have to always use `@View` with `@Component`?** You will always need to have a view with a `@Component`. However, you do not
  necessarly need to use the `@View` annonation. `@Component` actually contains the option of template and templateUrl as well. The power
  of using `@View` is it allows you to specify devices to apply the display on, for example mobile or desktop.
  1. **What is this `import` and `export`?** In Angular2 everything is modular, and therefore better by default, including the core library.
  So if you need something you must `import` it into your new component hince the `import {Component, View} from 'angular2/core';`.
  To make your class/component available to the rest of your Angular app you will need to `export` it hince the `export class Task {}`.
  If you have been doing AngularJS for very long you probably made your Angular 1 app modular by using something like RequireJS or Webpack.
  For Example the Angular 1 code above if made modular would look like:

    ``` javascript
      // task.directive.js
      (function() {
        'use strict';

        module.exports = Task;

        Task.$inject = [];

        function Task() {
          return {
          };
        }
      })();
    ```

    ``` javascript
      // task.module.js
      angular.module('TaskApp')
      .directive('Task', require('./task.directive'));
    ```

<br/>

###Creating the Task Directive and Template


###Conclusion
As you can see just from the perspective of writing a Directive, a ton has changed from Angular 1 to 2. If you wish to see the difference between
Angular 1 and Angular2 in working order you can view the plunkers of the two versions of Tasking here:

  + [Angular1 Task][angular1-task-done]
  + [Angular2 Task][angular2-task-done]


[angular1-starter]: http://plnkr.co/edit/p7jiJyQFuwTr5W0r4Jl7?p=preview
[angular2-starter]: http://plnkr.co/edit/7o4bfFxFChlV5giG3lEx?p=preview
[angular1-task-done]: http://plnkr.co/edit/JRyNzWLjRO6FEhg8MrwH?p=preview
[angular2-task-done]: http://plnkr.co/edit/mAAN3GmgPcuvRvEDhixO?p=preview

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
AngularJS was originally created back around 2009. It was built with the hope of helping web designers sprinkle a
little magic into their designs. What happened instead was the revolution of the single page application. While
AngularJS is still very powerful it has it warts, after all it was built with design first in mind. With new frameworks
like Flux with React coming out with speed and developer savy in mind, AngularJS needed a revamp.

Now that the revamp of AngularJS is here in the form of Angular 2 beta, given it is powered by Google where everything
is beta. I think it is time to investigate the Keys to the Kingdom that is Angular 2.

While following Angular 2 I don't see any easy way to upgrade your apps from Angular 1 to 3. There are helpful methods
and procedures you can follow, but in the end you will be updating the majority of your code base. From what I have seen
it is worth it in everyway, wether for a code readability perspective or a technical reason.

In this blog post I am going to start you on your way to picking up Angular 2 based on what you know from Angular 1. The
true power of Angular 1 was in something called a Directive, and this is where I will start. Along the way as I explain
think

##Key 1
The first step in going to Angular 2 would be to make sure it is modular and broken into compenents (isolated chunks of
functionality).

``` ruby
def show
  @widget = Widget(params[:id])
  respond_to do |format|
    format.html # show.html.erb
    format.json { render json: @widget }
  end
end
```

``` ts
export class Highway(){}
```
{% highlight ts %}
export class Highway(){}
{% endhighlight %}

Check out the [Jekyll docs][jekyll] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll’s dedicated Help repository][jekyll-help].

[jekyll]:      http://jekyllrb.com
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-help]: https://github.com/jekyll/jekyll-help

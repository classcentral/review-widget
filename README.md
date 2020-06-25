# Class Central Review Widget

### View the Demo

```shell
$ git clone https://github.com/classcentral/review-widget.git
$ cd review-widget
$ python -m SimpleHTTPServer 8000
```

Head over to http://localhost:8000 to see it live. If you get an error, try changing the port.

### Embedding the Widget on 3rd Party Sites

Embed the widget either via a course id or auto-detection. Ensure to include the `widget.min.js` file found on our CDN.

#### 1. Via Course Id
```HTML
  <div class="classcentral-review" lang="en" data-courseid="2161"> </div>
  <script async src="https://d3f1iyfxxz8i1e.cloudfront.net/reviews/widget.min.js" charset="utf-8"></script>
```

#### 2. Via Auto-detect
```HTML
  <div class="classcentral-review" data-courseid="auto-detect" data-course-name="Machine Learning for Musicians and Artists" data-provider-courseurl="https://www.kadenze.com/courses/machine-learning-for-musicians-and-artists/info" data-provider-name="kadenze"></div>
  <script async src="https://d3f1iyfxxz8i1e.cloudfront.net/reviews/widget.min.js" charset="utf-8"></script>
```

--- 

### For Changes/Development

#### Setup dev config
1. Duplicate and rename `config.dev.js.dist` to `config.dev.js`
1. Update the parameters to reflect your local setup.

#### To build widget.js for developoment

1. Run `npx gulp dev`
1. Output to > `build/widget.dev.js`

#### To build widget.js for production

1. Run `npx gulp prod`
1. Output to > `build/widget.min.js`

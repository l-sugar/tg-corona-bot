# CoronaVirus API

The novelcovid NPM package is an API wrapper for https://corona.lmao.ninja/ api.

there are 2 methods.

- all
- countries(country)

If you don't pass an argument to countries, it'll respond with an array of all country objects.

# Usage

You can use it like this:

```js
var covid = require('novelcovid');

covid
	.all()
	.then(data => console.log(data))
	.catch(err => console.error(err));

covid
	.countries('usa')
	.then(data => console.log(data))
	.catch(err => console.error(err));
```

# angular-strapi-test
angular-strapi-test

Steps for deploy on gh-pages branch:
[1] manual copy index.html to different folder
[2] ng build --prod --base-href "https://carminda.github.io/angular-strapi-test"
[2] change index.html and add to ./dist folder
[3] run npx angular-cli-ghpages

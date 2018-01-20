*LOCAL SETUP*

Sass watch
- from client/dist/styles run:
`sass --watch input_base.scss:custom_base.css input_768up.scss:custom_768up.css input_970up.scss:custom_970up.css`

Webpack
- from root of project
`webpack --progress --colors —watch`

Mongo
- run ‘mongod'

Redis
to start: `redis-server /usr/local/etc/redis.conf`
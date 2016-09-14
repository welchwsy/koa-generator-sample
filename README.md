# koa-generator-sample
`koa-generator`最新的模板,koa2版本。
# Start
```
git clone https://github.com/welchwsy/koa-generator-sample.git
cd koa-generator-sample
npm i
npm start
```
# With Sequelize
```
npm i sequelize --save

npm i sequelize-cli -g
```
postgresSQL使用

```
npm install --save pg pg-hstore
```

使用其他数据库： [sequelizejs文档](http://docs.sequelizejs.com/en/v3/docs/getting-started/)

添加新的`model`
```                                                                                                     
sequelize model:create --name User --attributes 'first_name:string, last_name:string, bio:text' 
```

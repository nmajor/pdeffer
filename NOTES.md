# History:

1. Following these instructions: https://serverless-stack.com/chapters/add-support-for-es6-es7-javascript.html created a repository using this command:

```
serverless install --url https://github.com/AnomalyInnovations/serverless-nodejs-starter --name my-project
```

2. Then added git and github

```
git init
git add --all
git commit -m "Initial commit"
hub create
git push origin master
```

3. Change folder structure

```
# Rename the tests folder
mv tests test

mkdir handlers
mkdir handlers/create handlers/compile handlers/page
```

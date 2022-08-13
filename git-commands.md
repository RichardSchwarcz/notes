# Git

## Git Commands

- `Clone` - Download repository hosted on Github or elsewhere
- `status` - Prints you changes made in your
- `add` - Track your files and changes in Git
- `commit` - Save your files in git
- `push` - Upload git commints to a remote repo like Github
- `pull` - Download changes from remote repo, oposite of push
- `branch` - List all branches in repo

## Workflow

### Setup

You either create repository locally, using this command

```shell
git init
```

or you clone repository using SSH key from Github

```shell
git clone git@github.com:nnja/advanced-git.git
```

Inside of repository, there is a hidden `.git` folder, which stores all your commits and previous versions of your code

Let's say you have JavaScript file called `greeting.js` containing this piece of code

```JS
console.log('hello')
```

Then you make some changes

```JS
console.log('hi!')
```

Now lets create HTML file called `index.html`

```HTML
<div>Hello</div>
```

### git status

By typing `status` command to the terminal, you can see all files that have been updated, created or deleted, but not saved to the commit yet.

```shell
git status
```

This command will show you

- modified: `greeting.js`
- untracked: `index.html`

### git add

To tell git to track the file, you use `add` command

```shell
git add index.html
git add .
```

Using second option will stage all changes (both `greeting.js` and `index.html`). By staging changes, your files are now ready to be commited.

## git commit

To commit files you use `commit` command

```shell
git commit -m "some mesasge"
```

`-m` means message

Changes are now **locally** commited.

### git push

To push changes to github, you use `push` command

```shell
git push
```

Errors occure in case you cloned your repository initialized it locally, before youo created repository on Github

**Cloned**
In case you cloned repository and you are going to push changes to Github you need to create private SSH key.

<!-- TODO -->

**Initialized locally**
In case you used `git init` command, by pushing changes befor you created repository on Github, you get an error:

> _origin doesn't appear to be a git repository_

Origin is the default name git gives to the server you cloned from. You can fix it by creating repository on Github, copying SSH key and using `remote` command

```shell
git remote add origin git@github.com:nnja/advanced-git.git
```

A remote is a git repository stored somwhere on the web, Github, etc.

## Branching

To list all branches in your repository you use `branch` command.
To create new branch you either use `branch` command with `name` argument

```shell
git branch new-feature
```

or you use `checkout` command with argument `-b` and `name` to create and jump to this newly created branch

```shell
git checkout -b new-feature
```

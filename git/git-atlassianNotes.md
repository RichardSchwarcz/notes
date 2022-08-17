# Git

<style>
r { color: #f54842 }    /*h2*/
o { color: Orange }     /*h3*/
g { color: Green }      /*h4*/
my { background: #ffdc6e4d }
</style>

## <r>Setting up a repository</r>

### <o>git init</o>

```shell
git init
```

The `git init` command creates a new Git repository. Executing `git init` creates a `.git` subdirectory in the current working directory, which contains all of the necessary Git metadata. By default, `git init` will initialize the Git configuration to the `.git` subdirectory path.

### <o>git clone</o>

```shell
git clone ssh://john@example.com/path/to/my-project.git
```

The `git clone` command copies an existing Git repository.
`git clone` is primarily used to point to an existing repo and make a clone or copy of that repo at in a new directory, at another location. The original repository can be located on the local filesystem or on remote machine accessible supported protocols.
Like `git init`, cloning is generally a one-time operation. Once a developer has obtained a working copy, all version control operations and collaborations are managed through their local repository.

## <r>Saving changes</r>

### <o>git add</o>

```shell
git add <file>
```

The `git add` command adds a change in the working directory to the staging area.
However, `git add` doesn't really affect the repository in any significant way - changes are not actually recorded until you run `git commit`

In conjunction with these commands, you'll also need `git status` to view the state of the working directory and the staging area.

Developing a project revolves around the basic edit/stage/commit pattern.
First, you edit your files in the working directory. When you’re ready to save a copy of the current state of the project, you stage changes with `git add`. After you’re happy with the staged snapshot, you commit it to the project history with `git commit`.

**Staging area**
The primary function of the `git add` command, is to promote pending changes in the working directory, to the git staging area.
It as a buffer between the working directory and the project history. The staging area is considered one of the "three trees" of Git, along with, the working directory, and the commit history.

<my>
Instead of committing all of the changes you've made since the last commit, the stage lets you group related changes into highly focused snapshots before actually committing it to the project history. This means you can make all sorts of edits to unrelated files, then go back and split them up into logical commits by adding related changes to the stage and commit them piece-by-piece. As in any revision control system, it’s important to create atomic commits so that it’s easy to track down bugs and revert changes with minimal impact on the rest of the project.
</my>

### <o>git commit</o>

```shell
git commit -m "commit message"
```

At a high-level, Git can be thought of as a timeline management utility. Commits are the core building block units of a Git project timeline. Commits can be thought of as snapshots or milestones along the timeline of a Git project. Commits are created with the `git commit` command to capture the state of a project at that point in time. Git Snapshots are always committed to the local repository. <my> Git doesn’t force you to interact with the central repository until you’re ready. Just as the staging area is a buffer between the working directory and the project history, each developer’s local repository is a buffer between their contributions and the central repository.</my>

```shell
git commit --amend
```

This option adds another level of functionality to the commit command. Passing this option will modify the last commit. Instead of creating a new commit, staged changes will be added to the previous commit. This command will open up the system's configured text editor and prompt to change the previously specified commit message.

**Commit example**

1. git add

Let's assume you’ve edited some content in a file called `hello.py` on the current branch, and are ready to commit it to the project history. First, you need to stage the file with `git add`, then you can commit the staged snapshot.

```shell
git add hello.py
```

This command will add `hello.py` to the Git staging area.

2. git status

We can examine the result of this action by using the git status command.

```shell
git status
On branch main
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
   new file: hello.py
```

3. git commit

commit is created by executing:

```shell
git commit
```

This will open a text editor (customizable via git config) asking for a commit log message, along with a list of what’s being committed:

```shell
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
# On branch main
# Changes to be committed:
# (use "git reset HEAD ..." to unstage)
#
#modified: hello.py
```

Git doesn't require commit messages to follow any specific formatting constraints, but the canonical format is to summarize the entire commit on the first line in less than 50 characters, leave a blank line, then a detailed explanation of what’s been changed. For example:

```shell
Change the message displayed by hello.py

- Update the sayHello() function to output the user's name
- Change the sayGoodbye() function to a friendlier message
```

**Update (amend) commit**

To continue with the `hello.py` example above. Let's make further updates to `hello.py` and execute the following:

```shell
git add hello.py
git commit --amend
```

This will once again, open up the configured text editor. This time, however, it will be pre-filled with the commit message we previously entered. This indicates that we are not creating a new commit, but editing the last

### <o>git diff</o>

Diffing is a function that takes two input data sets and outputs the changes between them. `git diff` is a multi-use Git command that when executed runs a diff function on Git data sources.

### <o>git stash</o>

`git stash` temporarily shelves (or stashes) changes you've made to your working copy so you can work on something else, and then come back and re-apply them later on. Stashing is handy if you need to quickly switch context and work on something else, but you're mid-way through a code change and aren't quite ready to commit.

#### <g>Stashing your work</g>

The `git stash` command takes your uncommitted changes (both staged and unstaged), saves them away for later use, and then reverts them from your working copy. For example:

```shell
$ git status
On branch main
Changes to be committed:

    new file:   style.css

Changes not staged for commit:

    modified:   index.html

$ git stash
Saved working directory and index state WIP on main: 5002d47 our new homepage
HEAD is now at 5002d47 our new homepage

$ git status
On branch main
nothing to commit, working tree clean
```

At this point you're free to make changes, create new commits, switch branches, and perform any other Git operations; then come back and re-apply your stash when you're ready.<my>
Note that the stash is local to your Git repository; stashes are not transferred to the server when you push.</my>

#### <g>Re-applying your stashed changes</g>

You can reapply previously stashed changes with git stash pop:

```shell
$ git status
On branch main
nothing to commit, working tree clean
$ git stash pop
On branch main
Changes to be committed:

    new file:   style.css

Changes not staged for commit:

    modified:   index.html

Dropped refs/stash@{0} (32b3aa1d185dfe6d57b3c3cc3b32cbf3e380cc6a)
```

Popping your stash removes the changes from your stash and reapplies them to your working copy.

Alternatively, you can reapply the changes to your working copy and keep them in your stash with git stash apply:

```shell
$ git stash apply
On branch main
Changes to be committed:

    new file:   style.css

Changes not staged for commit:

    modified:   index.html
```

#### <g>Stashing untracked or ignored files</g>

By default, running `git stash` will stash changes made to files that are currently tracked by Git

But it will not stash:

- new files in your working copy that have not yet been staged
- files that have been ignored

Adding the `-u` option (or `--include-untracked`) tells `git stash` to also stash your untracked files:

#### <g>Managing multiple stashes</g>

You can run `git stash` several times to create multiple stashes, and then use `git stash list` to view them.
By default, stashes are identified simply as a "WIP" – work in progress – on top of the branch and commit that you created the stash from.

```shell
$ git stash list
stash@{0}: WIP on main: 5002d47 our new homepage
stash@{1}: WIP on main: 5002d47 our new homepage
stash@{2}: WIP on main: 5002d47 our new homepage
```

> :memo: **Note:** To provide a bit more context what each stash contains, it's good practice to annotate your stashes with a description

Using `git stash save "message"`:

```shell
$ git stash save "add style to our site"
Saved working directory and index state On main: add style to our site
HEAD is now at 5002d47 our new homepage

$ git stash list
stash@{0}: On main: add style to our site
stash@{1}: WIP on main: 5002d47 our new homepage
stash@{2}: WIP on main: 5002d47 our new homepage
```

By default, git stash pop will re-apply the most recently created stash: stash@{0}

You can choose which stash to re-apply by passing its identifier as the last argument, for example:

```shell
$ git stash pop stash@{2}
```

#### <g>Partial stashes</g>

<!-- TODO
Find out what are 'hunks'
-->

You can also choose to stash just a single file, a collection of files, or individual changes from within files. If you pass the `-p` option (or `--patch`) to `git stash`, it will iterate through each changed "hunk" in your working copy and ask whether you wish to stash it:

```shell
$ git stash -p
diff --git a/style.css b/style.css
new file mode 100644
index 0000000..d92368b
--- /dev/null
+++ b/style.css
@@ -0,0 +1,3 @@
+* {
+  text-decoration: blink;
+}
Stash this hunk [y,n,q,a,d,/,e,?]? y
diff --git a/index.html b/index.html
index 9daeafb..ebdcbd2 100644
--- a/index.html
+++ b/index.html
@@ -1 +1,2 @@
+<link rel="stylesheet" href="style.css"/>
Stash this hunk [y,n,q,a,d,/,e,?]? n
```

#### <g>Creating a branch from your stash</g>

If the changes on your branch diverge from the changes in your stash, you may run into conflicts when popping or applying your stash. Instead, you can use `git stash branch` to create a new branch to apply your stashed changes to:

```shell
$ git stash branch add-stylesheet stash@{1}
Switched to a new branch 'add-stylesheet'
On branch add-stylesheet
Changes to be committed:

    new file:   style.css

Changes not staged for commit:

    modified:   index.html

Dropped refs/stash@{1} (32b3aa1d185dfe6d57b3c3cc3b32cbf3e380cc6a)
```

#### <g>Cleaning up your stash</g>

If you decide you no longer need a particular stash, you can delete it with `git stash drop`:

```shell
$ git stash drop stash@{1}
Dropped stash@{1} (17e2697fd8251df6163117cb3d58c1f62a5e7cdb)
```

Or you can delete all of your stashes with:

```shell
$ git stash clear
```

### <o>.gitignore</o>

Git sees every file in your working copy as one of three things:

1. tracked - a file which has been previously staged or committed;
2. untracked - a file which has not been staged or committed; or
3. ignored - a file which Git has been explicitly told to ignore.

Ignored files are usually build artifacts and machine generated files that can be derived from your repository source or should otherwise not be committed. Some common examples are:

- dependency caches, such as the contents of `/node_modules` or `/packages`
- compiled code, such as `.o`, `.pyc`, and `.class` files
- build output directories, such as `/bin`, `/out`, or `/target`
- files generated at runtime, such as `.log`, `.lock`, or `.tmp`
- hidden system files, such as `.DS_Store` or `Thumbs.db`
- personal IDE config files, such as `.idea/workspace.xml`

Ignored files are tracked in a special file named .gitignore that is checked in at the root of your repository.

## <r>Inspecting a repository</r>

### <o>git status</o>

`git status`

List which files are staged, unstaged, and untracked. Status output does not show you any information regarding the committed project history. For this, you need to use `git log`.
It simply shows you what's been going on with `git add` and `git commit`. Status messages also include relevant instructions for staging/unstaging files. Sample output showing the three main categories of a `git status` call is included below:

```shell
# On branch main
# Changes to be committed:
# (use "git reset HEAD <file>..." to unstage)
#
#modified: hello.py
#
# Changes not staged for commit:
# (use "git add <file>..." to update what will be committed)
# (use "git checkout -- <file>..." to discard changes in working directory)
#
#modified: main.py
#
# Untracked files:
# (use "git add <file>..." to include in what will be committed)
#
#hello.pyc
```

It's good practice to check the state of your repository before committing changes so that you don't accidentally commit something you don't mean to. This example displays the repository status before and after staging and committing a snapshot:

```shell
# Edit hello.py
git status
# hello.py is listed under "Changes not staged for commit"
git add hello.py
git status
# hello.py is listed under "Changes to be committed"
git commit
git status
# nothing to commit (working directory clean)
```

### <o>git log</o>

```shell
git log
```

The `git log` command displays committed snapshots. It lets you list the project history, filter it, and search for specific changes. While `git status` lets you inspect the working directory and the staging area, `git log` only operates on the committed history. By default, `git log` will only show commits for the currently selected branch. You can view all commits across all branches by executing `git log --branches=*`.

### <o>git tag</o>

Tags are ref's that point to specific points in Git history.

```shell
git tag <tagname>
```

Replace `<tagname>` with a semantic identifier to the state of the repo at the time the tag is being created. A common pattern is to use version numbers like `git tag v1.4`.
Git supports two different types of tags, annotated and lightweight tags. A best practice is to consider Annotated tags as public, and Lightweight tags as private. Annotated tags store extra meta data such as: the tagger name, email, and date.

> :memo: **Note:** Lightweight tags are essentially 'bookmarks' to a commit, they are just a name and a pointer to a commit, useful for creating quick links to relevant commits.

#### <g>Annotated tags</g>

```shell
git tag -a v1.4 -m "my version 1.4"
```

Annotated tags are stored as full objects in the Git database. To reiterate, They store extra meta data such as: the tagger name, email, and date. Similar to commits and commit messages Annotated tags have a tagging message. Suggested best practices for git tagging is to prefer annotated tags over lightweight so you can have all the associated meta-data.

#### <g>Lightweight tags</g>

```shell
git tag v1.4-lw
```

Executing this command creates a lightweight tag identified as `v1.4-lw`. Lightweight tags create a new tag checksum and store it in the `.git/` directory of the project's repo.

## <r>Undoing changes</r>

Each commit has a unique SHA-1 identifying hash. These IDs are used to travel through the committed timeline and revisit commits.

When you have found a commit reference to the point in history you want to visit, you can utilize the `git checkout` command to visit that commit. `Git checkout` is an easy way to “load” any of these saved snapshots onto your development machine. During the normal course of development, the `HEAD` usually points to `main` or some other local branch, but when you check out a previous commit, `HEAD` no longer points to a branch—it points directly to a commit. This is called a “detached HEAD” state

### <o>git revert</o>

```shell
git revert
```

Instead of removing the commit from the project history, it figures out how to invert the changes introduced by the commit and appends a new commit with the resulting inverse content.

`Git revert` expects a commit ref to be passed in and will not execute without one. By passing HEAD ref, `git revert` will revert the latest commit. Revert will create a new commit which will open up the configured system editor prompting for a new commit message.

## <r>Rewriting history</r>

Git has several mechanisms for storing history and saving changes. These mechanisms include: `Commit --amend`, `git rebase` and `git reflog`.

### <o>git commit --amend</o>

It is a convenient way to modify the most recent commit. It lets you combine staged changes with the previous commit instead of creating an entirely new commit. It can also be used to simply edit the previous commit message without changing its snapshot. But, amending does not just alter the most recent commit, it replaces it entirely, meaning the amended commit will be a new entity with its own ref.

#### <g>Change most recent Git commit message</g>

```shell
git commit --amend -m "an updated commit message"
```

Running this command when there is nothing staged lets you edit the previous commit’s message without altering its snapshot.

#### <g>Changing committed files</g>

```shell
# Edit hello.py and main.py
git add hello.py
git commit
# Realize you forgot to add the changes from main.py
git add main.py
git commit --amend --no-edit
```

The `--no-edit` flag will allow you to make the amendment to your commit without changing its commit message. The resulting commit will replace the incomplete one, and it will look like we committed the changes to `hello.py` and `main.py` in a single snapshot.

> :memo: **Note**: _Don’t amend public commits. Amended commits are actually entirely new commits and the previous commit will no longer be on your current branch. Avoid amending a commit that other developers have based their work on._

### <o>git rebase</o>

Rebase is one of two Git utilities that specializes in integrating changes from one branch onto another. The other change integration utility is `git merge`. Rebasing is the process of moving or combining a sequence of commits to a new base commit.

### <o>Usage</o>

The primary reason for rebasing is to maintain a linear project history. For example, consider a situation where the main branch has progressed since you started working on a feature branch. You want to get the latest updates to the main branch in your feature branch, but you want to keep your branch's history clean so it appears as if you've been working off the latest main branch. This gives the later benefit of a clean merge of your feature branch back into the main branch.
Rebase itself has 2 main modes: "manual" and "interactive" mode.

#### <g>Git Rebase Standard vs Git Rebase Interactive</g>

Git rebase interactive is when git rebase accepts an `--i` argument. This stands for "Interactive." Without any arguments, the command runs in standard mode.

##### Standard Rebase

Git rebase in standard mode will automatically take the commits in your current working branch and apply them to the head of the passed branch.

```shell
git rebase <base>
```

This automatically rebases the current branch onto ＜ base ＞, which can be any kind of commit reference (for example an ID, a branch name, a tag, or a relative reference to HEAD).

##### Interactive Rebase

Running `git rebase` with the `--i` flag begins an interactive rebasing session. Instead of blindly moving all of the commits to the new base, interactive rebasing gives you the opportunity to alter individual commits in the process. This lets you clean up history by removing, splitting, and altering an existing series of commits. It's like `Git commit --amend` on steroids.

## <r>Syncing</r>

### <o>git remote</o>

```shell
git remote
```

The `git remote` command lets you create, view, and delete connections to other repositories. Remote connections are more like bookmarks rather than direct links into other repositories.

### <o>git fetch</o>

```shell
git fetch
```

The `git fetch` command downloads commits, files, and refs from a remote repository into your local repo.
Git isolates fetched content from existing local content; it has absolutely no effect on your local development work. Fetched content has to be explicitly checked out using the `git checkout` command. This makes fetching a safe way to review commits before integrating them with your local repository.

When downloading content from a remote repo, `git pull` and `git fetch` commands are available to accomplish the task. You can consider `git fetch` the 'safe' version of the two commands. It will download the remote content but not update your local repo's working state, leaving your current work intact.

#### <g>Synchronize origin with git fetch</g>

Typical workflow for synchronizing your local repository with the central repository's main branch.

```shell
git fetch origin
```

This will display the branches that were downloaded:

```shell
a1e8fb5..45e66a4 main -> origin/main
a1e8fb5..9e8ab1c develop -> origin/develop
* [new branch] some-feature -> origin/some-feature
```

To see what commits have been added to the upstream main, you can run a `git log` using origin/main as a filter:

```shell
git log --oneline main..origin/main
```

To approve the changes and merge them into your local main branch use the following commands:

```shell
git checkout main
git log origin/main
```

Then we can use git merge origin/main:

```shell
git merge origin/main
```

### <o>git push</o>

The `git push` command is used to upload local repository content to a remote repository. Pushing is how you transfer commits from your local repository to a remote repo.

> :memo: **Note**: _Pushing has the potential to overwrite changes, caution should be taken when pushing_

#### <g>Amended force push</g>

The `git commit` command accepts a `--amend` option which will update the previous commit. A commit is often amended to update the commit message or add new changes. Once a commit is amended a git push will fail because Git will see the amended commit and the remote commit as diverged content. The `--force` option must be used to push an amended commit.

```shell
# make changes to a repo and git add
git commit --amend
# update the existing commit message
git push --force origin main
```

### <o>git pull</o>

The `git pull` command is used to fetch and download content from a remote repository and immediately update the local repository to match that content.

> :memo: **Note**: _The `git pull` command is actually a combination of two other commands, `git fetch` followed by `git merge`._

In the first stage of operation `git pull` will execute a `git fetch` scoped to the local branch that `HEAD` is pointed at. Once the content is downloaded, `git pull` will enter a merge workflow. A new merge commit will be-created and `HEAD` updated to point at the new commit.

#### <g>Git pull rebase instead of merge</g>

The `--rebase` option can be used to ensure a linear history by preventing unnecessary merge commits. Many developers prefer rebasing over merging, since it’s like saying, "I want to put my changes on top of what everybody else has done."

```shell
git checkout main
git pull --rebase origin
```

This simply moves your local changes onto the top of what everybody else has already contributed.

## <r>Branches</r>

Instead of copying files from directory to directory, Git stores a branch as a reference to a commit. You can think of them as a way to request a brand new working directory, staging area, and project history.

### <o>git branch</o>

```shell
git branch
```

List all of the branches in your repository.

```shell
git branch <branch>
```

Create a new branch called ＜ branch ＞. This _does not_ check out the new branch.

```shell
git branch -d <branch>
```

Delete the specified branch. This is a “safe” operation in that Git prevents you from deleting the branch if it has unmerged changes.

```shell
git branch -m <branch>
```

Rename the current branch to ＜ branch ＞.

#### <g>Creating Branches</g>

It's important to understand that branches are just pointers to commits. When you create a branch, all Git needs to do is create a new pointer, it doesn’t change the repository in any other way.

```shell
git branch crazy-experiment
```

The repository history remains unchanged. All you get is a new pointer to the current commit.
Note that this only creates the new branch. To start adding commits to it, you need to select it with `git checkout`, and then use the standard `git add` and `git commit` commands.

### <o>git checkout</o>

The `git checkout` command lets you navigate between the branches created by git branch and can be used to view old commits.

Switching between branches

```shell
git branch
main
another_branch
feature_inprogress_branch
git checkout feature_inprogress_branch
```

The `git branch` command can be used to create a new branch. When you want to start a new feature, you create a new branch off main using `git branch new_branch`. Once created you can then use `git checkout new_branch` to switch to that branch. Additionally, The `git checkout` command accepts a `-b` argument which will create the new branch and immediately switch to it.

```shell
git checkout -b ＜new-branch＞
```

#### <g>Detached HEAD</g>

`HEAD` is Git’s way of referring to the current snapshot. Internally, the `git checkout` command simply updates the `HEAD` to point to either the specified branch or commit. When it points to a branch, Git doesn't complain, but when you check out a commit, it switches into a `“detached HEAD”` state.

This is a warning telling you that everything you’re doing is “detached” from the rest of your project’s development. If you were to start developing a feature while in a detached `HEAD` state, there would be no branch allowing you to get back to it.

The point is, your development should always take place on a branch—never on a detached `HEAD`. This makes sure you always have a reference to your new commits. However, if you’re just looking at an old commit, it doesn’t really matter if you’re in a detached `HEAD` state or not.

### <o>git merge</o>

The `git merge` command lets you take the independent lines of development created by `git branch` and integrate them into a single branch.

Say we have a new branch feature that is based off the `main` branch. We now want to merge this feature branch into `main`.
Invoking this command will merge the specified branch feature into the current branch, we'll assume `main`.
Merge commits are unique against other commits in the fact that they have two parent commits.

```shell
# Start a new feature
git checkout -b new-feature main
# Edit some files
git add <file>
git commit -m "Start a feature"
# Edit some files
git add <file>
git commit -m "Finish a feature"
# Merge in the new-feature branch
git checkout main
git merge new-feature
git branch -d new-feature
```

This is a common workflow for short-lived topic branches that are used more as an isolated development than an organizational tool for longer-running features.

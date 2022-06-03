# Examples

The repo of example demos that the introweb.tech website pulls from.

Live at [https://introweb.tech/examples](https://introweb.tech/examples).

The repo for [introweb.tech/examples](https://introweb.tech/examples) (same as the [examples.introweb.tech](https://examples.introweb.tech) site/repo) can be found [here](https://github.com/iwtbook/examples.introweb.tech).

## Table of Contents

1. [How to Read this Repo](#how-to-read-this-repo)
   1. [`_repo-apis`](#repo-apis)
      1. [Content API](#content-api)
      2. [Zip API](#zip-api)
   2. [Main Category Directories](#main-category-directories)
   3. [`root-dir-config.json`](#root-dir-configjson)
   4. [General Repo Files](#general-repo-files)
2. [How to Contribute](#how-to-contribute)
3. [Continuous Deployment](#continuous-deployment)

## How to Read this Repo

Upon first glance there are a few different things you'll notice in this repo:

- A directory that starts with an underscore (_repo-apis)
- A bunch of category directories (asynchronous, communications, etc)
- A file called `root-dir-config.json`
- The basic `.gitignore`, `README.md`, and `continuous-deployment.webp` files

We'll start with `_repo-apis`


### `_repo-apis`

This directory is where all of the APIs and build scripts live. The APIs are prefixed with `api-` while the build scripts are prefixed with `build-`.

<dl>
  <dt>Content API</dt>
  <dd>This is the largest API. Started as a mimic of the GitHub API to easily access the code in this repo in a digestible manner, but has grown more features. See full API table below.</dd>

  <dt>Zip API</dt>
  <dd>Designed to return a zip download file of any demo in this repository. User-centered so ignores files irrelevent to the demo (like `quiz.md` and such)</dd>

  <dt>Sidebar Build Process</dt>
  <dd>All of the sidebars for each main category (asynchronous, communications, etc) are pre-generated on build and placed in the top level of each main category in a file called `sidebar.html`. This script creates and updates those files.</dd>
</dl>

### Content API

*Note: Everything for the Content API is pre-prended with `/repos` so `/:repo/demos` becomes `https://introweb.tech/repos/examples/demos` in practice*

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Route</th>
      <th>Query Params</th>
      <th>Returns</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>GET</code></td>
      <td><code>/:repo</code></td>
      <td><code>dir</code> (Optional - the desired subdirectory. Defaults to every subdirectory.)</td>
      <td>Object&lt;Array&gt;</td>
      <td>All of the file paths for every file (and a URL to reach the file contents at) in the specified repo. In no particular order.</td>
      <td><code>GET /examples?dir=html</code></td>
    </tr>
    <tr>
      <td><code>GET</code></td>
      <td><code>/:repo/demos</code></td>
      <td><code>dir</code> (Optional - the desired subdirectory. Defaults to every subdirectory.)</td>
      <td>Array&lt;String&gt;</td>
      <td>A list of every demo in the specified repo. In no particular order.</td>
      <td><code>GET /examples/demos?=html</code></td>
    </tr>
    <tr>
      <td><code>GET</code></td>
      <td><code>/:repo/demo-frames</code></td>
      <td>none</td>
      <td>Array&lt;String&gt;</td>
      <td>A list of every demo and what frames they use (e.g. markdown, editor, etc). In no particular order.</td>
      <td><code>GET /examples/demo-frames</code></td>
    </tr>
    <tr>
      <td><code>GET</code></td>
      <td><code>/:repo/file/*</code></td>
      <td>none</td>
      <td>Object</td>
      <td>The contents and metadata of the specified file from the specified repo. Must be a relative route to a file (e.g. `form/spa/index.html`)</td>
      <td><code>GET /examples/file/form/<br>spa/index.html</code></td>
    </tr>
    <tr>
      <td><code>GET</code></td>
      <td><code>/:repo/contents/*</code></td>
      <td>none</td>
      <td>String</td>
      <td>The direct contents (with the MIME type `text/plain`) of the specified file from the specified repo. Must be a relative route to a file (e.g. `form/spa/index.html`)</td>
      <td><code>GET /examples/contents/<br>form/spa/index.html</code></td>
    </tr>
    <tr>
      <td><code>GET</code></td>
      <td><code>/:repo/contents-mime/*</code></td>
      <td>none</td>
      <td>String</td>
      <td>The direct contents (with the corresponding MIME type) of the specified file from the specified repo. Must be a relative route to a file (e.g. `form/spa/index.html`)</td>
      <td><code>GET /examples/contents-<br>mime/form/spa/index.html</code></td>
    </tr>
    <tr>
      <td><code>GET</code></td>
      <td><code>/:repo/route-configs</code></td>
      <td><code>dir</code> (Optional - the desired subdirectory. Defaults to every subdirectory.)</td>
      <td>Object</td>
      <td>Reads all of the <code>demo-config.json</code> and <code>dir-config.json</code> files and makes returns them in a structured object in order according to the configs. If <code>dir</code> is specified, just that subdirectory is returned and all of the demos are flattened (proper order is retained).</td>
      <td><code>GET /examples/route-configs</code></td>
    </tr>
  </tbody>
</table>

### Zip API

*Note: Everything for the Zip API is pre-prended with `/zip` so `/` becomes `https://introweb.tech/zip` in practice (the trailing slash having been omitted here)*

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Route</th>
      <th>Query Params</th>
      <th>Returns</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>GET</code></td>
      <td><code>/</code></td>
      <td><code>repo</code> & <code>dir</code> (Both required - the desired demo to zip and the repo it's from)</td>
      <td>.zip File</td>
      <td>Creates a .zip file of all of the relevant files to the specified demo (ignoring files like <code>quiz.md</code> which aren't meant to be seen raw by users).</td>
      <td>GET https://introweb.tech/zip?repo=examples&dir=http/bundle-size</td>
    </tr>
  </tbody>
</table>

### Main Category Directories

Outside of `_repo-apis`, every other folder in the top level of this repo is a "Main Category Directory". If you look over at [https://introweb.tech/examples](https://introweb.tech/examples), the main categories are the sections that say "**Part I - Introduction**", "**Part II - HTTP**", etc. Everything is built and generated dynamically from this repo, so if a new folder is added, that /examples page will update in the build process.

### `root-dir-config.json`

We'll talk about `dir-config.json` files later on, but this `root-dir-config.json` file is a special file that specifies which order the main category directories should appear in as it defaults to alphabetical.

### General Repo Files

- `.gitignore` has some basics files and direcotries to ignore to keep this repo clean
- `README.md` and `continuous-deployment.webp` both make up this current README that you are reading right now.


## How to Contribute

### Adding a demo

Adding a demo in an existing category / subcategory is pretty straightforward. All of the templates for 
these files along with the available options for each template will be inside [`_templates`](_templates). Follow these
steps:

1. Create a new folder next to the other demo(s) in the existing category / subcategory
2. (Optional) If you want this demo to be in a specific order with the other demos it's near, you can specify that
   inside the [`dir-config.json`](_templates/dir-config-tpl.txt) that should be in the same directory as where you just created the new folder.
3. Inside this new folder, create a file named [`demo-config.json`](_templates/demo-config-tpl.txt).
4. (Optional) If you want to include markdown to explain your demo, create a file named [`learn.md`](_templates/learn-tpl.md) to store it all.
5. (Optional) If you want to include a quiz for users to take after going through your demo, create a file named [`quiz.md`](_templates/quiz-tpl.md).
6. (Optional) If you want to include a tab to store links to resources for users, create a file named [`resources.md`](_templates/resources-tpl.md).
7. (Optional) If your demo has media:
   i. Create a folder inside your demo named `media` where your media will live.
   ii. Inside that `media` folder, create a file named [`media-config.json`](_templates/media-config-tpl.txt).
   iii. Specify whether you want to use that media inline in the markdown panel or external in its own media panel
        inside the media config.

### Adding a new category / subcategory

Adding a new category / subcategory is also pretty straightforward. All of the templates for 
these files along with the available options for each template will be inside [`_templates`](_templates). Follow these steps:

1. Create a new folder where you want your new category / subcategory to be.
2. Inside that folder, create a file named [`dir-config.json`](_templates/dir-config-tpl.txt).
3. If this demo is a main category demo, add its folder's name to the order array in [`root-dir-config.json`](root-dir-config.json).


## Continuous Deployment (CD)

![Diagram explaining the Continuous Deployment process for this repo](continuous-deployment.webp)

The above diagram illustrates the continuous deployment process of this repository. The process starts on your local machine.

1. On your local machine changes are made to either the [examples](https://github.com/iwtbook/examples) repo (by adding / modifying a demo) or the [examples.introweb.tech](https://github.com/iwtbook/examples.introweb.tech) repo
2. The git origin is then set to the corresponding bare repository on the DigitalOcean droplet
   * `git@introweb.tech:/var/repos/bare/examples.git`
   * `git@introweb.tech:/var/repos/bare/examples.introweb.tech.git`
3. The changes are pushed to the remote machine
4. Both repos have a `post-receive` hook that then pushes those changes to GitHub and triggers the build process after changes are pushed
   1. The hook first pushes the changes to GitHub
   2. Then, if the changes came from the [Examples](https://github.com/iwtbook/examples) repo, the hook first runs `build-sidebar.js` to generate all of the `sidebar.html` pages
   3. Then the hook removes the old `/dist` folder from the `examples.introweb.tech` repo
   4. Finally, the hook initiates the build process for `examples.introweb.tech` which creates a new `/dist` folder
5. The `examples.introweb.tech` DocumentRoot has been set up to live at `/var/www/examples.introweb.tech` within Apache on the remote server. The actual file at `/var/www/examples.introweb.tech` is a symbolic link to `/var/repos/examples.introweb.tech/dist` so creating the new `/dist` folder automatically deploys the updates live. (This is the dashed green arrow in the diagram)
ts-framework-cli
================

A minimalistic web framework for Typescript applications.

## Installation

Start by installing the command line globally.

```bash
# Add to your dependencies using yarn
yarn global add "nxtep-io/ts-framework-cli";

# Or, using NPM
npm global install "github:nxtep-io/ts-framework-cli";
```

It will also work as a project dependency calling directly from `node_modules` or `yarn run`.

<br />

## Getting Started

**Generate a new project**

Get started by generating a new TS Framework project using the built-in Yeoman generator:

```bash
ts-framework new app
```

After your project is created and all dependencies were installed, you can check its information directly from
the typescript source, backed by `ts-node` runtime interpreter.

```bash
ts-framework info --development ./api/server.ts

#  --------------------------------------------------------------------------------
#                                                                                        
#              ts-framework                                                              
#              ============                                                              
#                                                                                        
#              Framework version:   nxtep-io/ts-framework#2.3.2                                       
#                                                                                        
#              App name:            ts-framework-cli                                          
#              App version:         2.4.4                                       
#              App port:            3000                             
#                                                                                        
#      
#      --------------------------------------------------------------------------------
#
```

<br />

**Start the development server**

To start coding into your project, use the development server, with file watching and live-reloading, backed by `nodemon` and `ts-node`.

```bash
ts-framework watch ./api/server.ts
```

<<<<<<< HEAD
The `watch` command will use the `listen` command behind the scenes. To use `run` instead, you can use the `-r` flag.
=======
<br />
>>>>>>> v2.5

**Start the interactive console**

The framework allows you to get into the instance and manipulate its components using a REPL interface, as an interactive console.

```bash
ts-framework console ./api/server.ts
```

<br />

**Start the production server**

Make sure you have the transpiled files from typescript ready before continuing.

```bash
yarn run tsc
```

Then, start the production server:

```bash
# Prepare same envs, if needed
export PORT=80;

# Start the production server
ts-framework start ./api/server.ts
```

<br />

**Verbose and Inspection mode**

You can run the command in verbose mode starting with the `-v`or `--verbose` flag. It is positional for the verbose mode 
to be also applied to the shell scripts, must the be first one.

```shell
ts-framework -V listen api/server.ts
```

<br />

To start the command in inspection mode (debug), you must pass the `-i HOST:PORT` or `--inspect HOST:PORT` flag. It is also positional,
must be the second one when `verbose` is present. If not in verbose mode, it must be the first one.

```shell
# In regular mode
ts-framework --inspect 9229 listen api/server.ts

# In verbose mode
ts-framework -V --inspect 0.0.0.0:9229 listen api/server.ts
```

Note: The host may be ommitted for localhost, but in docker environments you may need to pass `0.0.0.0:PORT` to make it work properly.

<br />

## Running from docker

The command line has also an official docker image in the repository based on `node:stretch`. You may clone it and build locally to automate workflows in Docker environments.

```shell
docker build -t ts-framework .
docker run -it ts-framework --help
```

Or you may use it as a base image for your project deployments.

```dockerfile
# Use as base image.
FROM ts-framework:latest

# Prepare node dependencies
WORKDIR /usr/src/my-app/
COPY ./package.json ./yarn.lock /usr/src/my-app/
RUN yarn install 

# Copy the app source code
COPY . /usr/src/my-app/

# Start container with ts-framework command
CMD ts-framework start api/server.ts
```

<br />

**Debugging with VS Code and Docker**

The `watch` command spins up a `ts-node` instance to execute Typescript code without a compilation step, and a `nodemon` instance to restart `ts-node` on source code changes.
When inside a docker container, this combination can confuse the VS Code debugger. VS Code won't be able to locate the source code from the source maps, and many features will be disabled, like breakpoints.  
  
You can manually add a source map path override to your VS Code's launch task, with
```
"sourceMapPathOverrides": {
    "/usr/src/myapp/*": "${workspaceFolder}/*"
},
```
Replace `/usr/src/myapp` with the container's source code path (Usually the argument of a `WORKDIR` call in the dockerfile).  
Futher reading: https://github.com/Microsoft/vscode-recipes/issues/187

<br />

## API Reference

The full library reference is available in the `docs/` directory or published in [nxtep-io.github.io/ts-framework-cli](https://nxtep-io.github.io/ts-framework-cli).

<br />

## License

The project is licensed under the [MIT License](./LICENSE.md).

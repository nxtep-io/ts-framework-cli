ts-framework-cli
================

A minimalistic web framework for Typescript applications.

## Getting started

```bash
# Add to your dependencies using yarn
yarn add "nxtep-io/ts-framework-cli";

# Or, using NPM
npm install "github:nxtep-io/ts-framework-cli";
```

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

**Start the development server**

To start coding into your project, use the development server, with file watching and live-reloading, backed by `nodemon` and `ts-node`.

```bash
ts-framework watch ./api/server.ts
```

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

## API Reference

The full library reference is available in the `docs/` directory or published in https://nxtep-io.github.io/ts-framework-cli.

## Debugging with VS Code and Docker

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

## License

The project is licensed under the [MIT License](./LICENSE.md).

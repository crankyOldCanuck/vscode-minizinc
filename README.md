# Visual Studio Code MiniZinc Extension

This extension provide language support for MiniZinc within Visual Studio Code. Fork of the extension [vscode-minizinc](https://github.com/Dekker1/vscode-minizinc), with increased functionality.

## Features

  * Syntax highlighting
  * [Snippets](#snippets)
  * [Information Hovers](#information-hovers)
  * [Run models](#run-models)

## Feature descriptions and usages

### Snippets

  * Including all the global constraints
  * Based on docs within [The MiniZinc Handbook](https://www.minizinc.org/doc-2.2.3/en/lib-globals.html#)


### Information hovers
  Hovers show information about the constraint predicate under the mouse cursor.

### Run models

  Executes the command line tool, which is expected on your
  system path, in the integrated terminal.

  * Command  `MiniZinc: run without data file`

    Opens the integrated terminal and runs the model
    in your active text editor.
    This command is available from the command palette as
    well as the editor context menu.

  * Command  `MiniZinc: select data file and run`

    Opens a filepicker to allow you to select your .dzn file then runs the model in your active text editor.
    This command is available from the command palette as
    well as the editor context menu.

  * Command  `MiniZinc: repeat last command`

    Opens the integrated terminal and runs the previously
    executed command.
    This command is available from the command palette as
    well as the editor context menu.

  * Command  `MiniZinc: set command options`

    Opens an input box where you can set the command line
    options to use. Reference the handbook for details.
    This command is available from the command palette as
    well as the editor context menu.


## Acknowledgements

[Dekker1](https://github.com/Dekker1) who published the extension [vscode-minizinc](https://github.com/Dekker1/vscode-minizinc).

## License

[MIT](http://www.opensource.org/licenses/mit-license.php)

## Release Notes

### 0.0.1

Initial release.

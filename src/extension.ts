// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { extname } from "path";
import {
    commands,
    DocumentFilter,
    ExtensionContext,
    languages,
    Terminal,
    Uri,
    window,
} from "vscode";
import { MiniZincHoverProvider } from "./features/hoverProvider";
import { Utils } from "./utils/utils";

const execName = "minizinc";
const termName = "MiniZinc";
const docExtName = [".mzn", ".fzn"];

let lastMzn = "";
let lastDzn = "";
let lastOptions = "";
let lastCmd = "";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated

    // tslint:disable-next-line:no-console
    console.log('Congratulations, your extension "vsc-minizinc" is now active!');

    const MINIZINC_MODE: DocumentFilter = { language: "minizinc", scheme: "file" };

    Utils.init(context);

    context.subscriptions.push(
        languages.registerHoverProvider(MINIZINC_MODE, new MiniZincHoverProvider()),
        commands.registerCommand("minizinc.run", () => {
            const terminal = setTerminal();
            const editor = window.activeTextEditor;

            if (isValidDocument() && editor) {
                lastMzn = editor.document.fileName;
                lastCmd = execName + " " + lastOptions + " " + lastMzn;
                terminal.sendText(lastCmd);
                terminal.show();
            }
        }),

        commands.registerCommand("minizinc.dzn", async () => {
            const terminal = setTerminal();
            const editor = window.activeTextEditor;

            if (isValidDocument() && editor) {
                const dzn: Uri[] | undefined = await window.showOpenDialog({
                    filters: { dzn: ["dzn"] },
                });

                if (dzn) {
                    lastMzn = editor.document.fileName;
                    lastDzn = Uri.parse(dzn[0].toString()).fsPath;
                    lastCmd = execName + " " + lastOptions + " " + lastMzn + " " + lastDzn;
                    terminal.sendText(lastCmd);
                    terminal.show();
                } else {
                    window.showErrorMessage("Cancelled. Select a dzn for this command.");
                }
            }
        }),

        commands.registerCommand("minizinc.repeat", () => {
            const terminal = setTerminal();

            if (lastCmd) {
                terminal.sendText(lastCmd);
                terminal.show();
            } else {
                window.showErrorMessage("No previous command to run.");
            }
        }),

        commands.registerCommand("minizinc.options", async () => {
            const options = await window.showInputBox(
                {value: lastOptions},
            );

            if (options !== undefined) {
                lastOptions = options;
            } else {
                window.showErrorMessage("Cancelled. Options unchanged.");
            }
        }),
    );

    context.subscriptions.push(commands.registerCommand("minizinc.dispose", () => {}));
}

// this method is called when your extension is deactivated
export function deactivate() {
    // tslint:disable-next-line:no-console
    console.log('Your extension "vsc-minizinc" is deactivated!');
}

function setTerminal(): Terminal {
    if (window.activeTerminal) {
        commands.executeCommand("workbench.action.terminal.clear");
        return window.activeTerminal;
    } else {
        return window.createTerminal(termName);
    }
}

function isValidDocument(): boolean {
    const editor = window.activeTextEditor;
    let isValid = false;

    if (editor) {
        const document = editor.document;
        const filename = document.fileName;

        if (! docExtName.includes(extname(filename)) || document.isUntitled) {
            window.showErrorMessage("Run requires an fzn or mzn file in active text editor.");
        } else if (document.isDirty) {
            window.showErrorMessage("Unsaved changes. Please save before running.");
        } else {
            isValid = true;
        }
    } else {
        window.showErrorMessage("No active editor.");
    }

    return isValid;
}

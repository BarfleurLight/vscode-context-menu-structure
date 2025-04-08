const vscode = require('vscode');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {

    const runInTerminal = vscode.commands.registerCommand('context-menu.runInTerminal', function () {
        const filePath = vscode.window.activeTextEditor.document.fileName;
        const terminal = vscode.window.activeTerminal ||
            vscode.window.createTerminal('Python Runner');

        terminal.sendText(`python "${filePath}"`)
    });

    const runTask = vscode.commands.registerCommand('context-menu.runTask', function () {
        const filePath = vscode.window.activeTextEditor.document.fileName;
        const dirPath = path.dirname(vscode.window.activeTextEditor.document.uri.fsPath);

        const pythonExtension = vscode.extensions.getExtension('ms-python.python').exports;
        const venvPath = pythonExtension.settings.getExecutionDetails().execCommand[0]

        const taskDefinition = { type: "shell", label: "Run Python" };
        const scope = vscode.TaskScope.Workspace;
        const name = "My Task";
        const source = "Python Extension";
        const execution = new vscode.ProcessExecution(
            venvPath,
            [filePath],
            { cwd: dirPath },
        );
        const problemMatchers = [];

        const task = new vscode.Task(
            taskDefinition,
            scope,
            name,
            source,
            execution,
            problemMatchers
        );

        task.presentationOptions = {
            reveal: vscode.TaskRevealKind.Always,
            panel: vscode.TaskPanelKind.Dedicated,
            focus: true,
            clear: true,
            showReuseMessage: false
        };

        vscode.tasks.executeTask(task);
    });
    context.subscriptions.push(runInTerminal, runTask, runPytest);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
    activate,
    deactivate
}

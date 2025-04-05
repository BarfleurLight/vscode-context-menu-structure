const vscode = require('vscode');

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

	context.subscriptions.push(runInTerminal);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

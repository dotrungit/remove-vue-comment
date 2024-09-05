const vscode = require('vscode');

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.removeComments', function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const document = editor.document;
        const text = document.getText();

        // Xóa comment trong Vue file (HTML, CSS, JS)
        const newText = text
            .replace(/<!--[\s\S]*?-->/g, '')    // Xóa comment HTML
            .replace(/\/\*[\s\S]*?\*\//g, '')   // Xóa comment block JS/CSS
            .replace(/\/\/.*$/gm, '');          // Xóa comment line JS

        const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(text.length)
        );

        editor.edit(editBuilder => {
            editBuilder.replace(fullRange, newText);
        });
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};

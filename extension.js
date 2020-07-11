// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed



/**
 * @param {vscode.ExtensionContext} context
 */

function escapeRegex(string) {//在正则保留字符前面加上转义字符： \
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

// 给待匹配的文本中所有匹配正则表达式的字符串的前面或者后面加字符串的函数
// re：正则表达式， rp1：要加在前面的字符串， rp2：要加在后面的字符串， str：待匹配的文本
function RegInsertStr(re, rp1, rp2, str) {
    var arr = str.match(re);
    var ret = "";
    var rpt = "";
    var re2 = null;

    if (!arr) return str;

    for (var i = 0; i < arr.length; i++) {
		ret = escapeRegex(arr[i]);//若ret中有保留的字符： ] [ ) ( } { . * + ? ^ $ \ |   则之后re2会无法匹配ret
								//故使用自己定义的escapeRegex()在ret中可能出现的保留字符前面加上转义字符： \
		re2 = new RegExp(ret, "g");
		
		rpt = rp1 + arr[i] + rp2;
		str = str.replace(re2, rpt);
    }
    return str;
}

function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.lower_header_level_for_markdown', function () {
		// The code you place here will be executed every time your command is executed

		let activeTextEditor = vscode.window.activeTextEditor;
		let activeDocument = activeTextEditor.document;

		// 1. 获取所有选中行信息
		let selection = vscode.window.activeTextEditor.selection;

		// 起止行行号
		let startLine = selection.start.line;
		let endLine = selection.end.line;

		// 2. 获取每行的文本信息，是标题的存入数组
		let titleArr = [];                                                           // 选中行信息缓存数组
		var re = new RegExp('^#+.*', "gm");
		// var re = new RegExp('^[^\n\r]\s*#+.*', "gm");
		// var re = new RegExp('(^\\s*\\#)\\s*((\\d+\\.)+)\\s+', "g");
		for(let i = startLine; i <= endLine; i++) {
			let curLineText = activeDocument.lineAt(i).text;                           // 当前行文本内容
			let curLine_plus = RegInsertStr(re, "#", "", curLineText);               // 在标题前面加#

			titleArr.push({
				line: i,
				lineLength: curLineText.length,
				curLineText: curLineText,
				curLine_plus: curLine_plus
			});
		}
		
		
		// 3. 把前面加了#的新标题提取出来
		let newText = titleArr.map(item => {
			return item.curLine_plus;
		});
		//vscode.Range4个参数的含义：startLine, startCharacter, endLine, endCharacter
		let replaceRange = new vscode.Range(startLine, 0, endLine, titleArr[titleArr.length - 1].lineLength);
		
		// 4. 调用编辑接口，用前面加了#的新标题，替换原来的标题
		activeTextEditor.edit((TextEditorEdit) => {
			TextEditorEdit.replace(replaceRange, newText.join('\n'));
		});

		// Display a message box to the user
		vscode.window.showInformationMessage('success!');
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

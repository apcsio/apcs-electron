var fs = require('fs'),
	tmp = require('tmp'),
	util  = require('util'),
	filepath = require('path'),
    exec = require('child_process').exec;

var View = require('./js/view');
var CodeMirror = require('codemirror');

// Require codemirror mode for Java
require('codemirror/mode/clike/clike');

// Require all codemirror add-ons
['comment/comment', 'hint/show-hint'].forEach(function(addon) {
	require('codemirror/addon/' + addon);
});

var cm = CodeMirror(document.body, {
	lineNumbers: true,
	mode: 'text/x-java',
	theme: 'monokai',
	indentWithTabs: true,
	indentUnit: 4,
	foldGutter: true,
	gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
	extraKeys: {
        "Ctrl-Space": "autocomplete",
		"Ctrl-R": function() {
			alert('test');
		}
    }
});

cm.on('change', function(mirror, edit) {
	if (edit.origin == '+input' && edit.text[0] == '.') {
		mirror.showHint({
			hint: function(e, o) {
				return {
					list: ['foo', 'bar'],
					from: e.getCursor(),
					to: e.getCursor()
				};
			}
		});
	}
});

cm.setValue("public class Test {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println(\"test\");\n\t}\n}");

var button = View().mark('run');
button.add(View('i').mark(['fa', 'fa play']));

document.body.appendChild(button.element);

button.click(function() {

	var createTempFile = function(name, content, k) {
		tmp.file(function(err, path) {
			if (err) k(null, err);

			var oldPath = path,
				b = path.length - 4;

			// Get to the index of the path
			while (path.charAt(b) != '/') b--;
			path = path.substring(0, b + 1) + name + '.java';

			fs.rename(oldPath, path, function() {
				fs.writeFile(path, content, function(err) {
					if (k) k(path, err);
				});
			});
		});
	};

	var run = function(command, output, done) {
		var cmd = exec(command);
		cmd.stdout.on('data', function (data) {
		  output(data.toString());
		});

		cmd.stderr.on('data', function (data) {
		  output(null, data.toString());
		});

		cmd.on('exit', function (code) {
		  output(null, null, code.toString() === '0');
		});
	};

	var c = cm.getValue();
	var pc = c.match(/\bpublic\s+class\s+([a-zA-Z0-9]+)/);

	if (pc) {
		createTempFile(pc[1], c, function(path, error) {
			var i = path.length - 1;
			while (path.charAt(i) != '/') i--;

			run('javac ' + path, function(output, error, done) {
				if (done) {
					console.log('Done compiling');
					run('cd ' +
						path.substring(0, i) +
						' && java ' +
						path.substring(i + 1, path.length - 5),

						function(output, error, done) {
							if (done) {
								console.log('Done');
							}
							else if (error != null) {
								console.log('Runtime error: ' + error);
							}
							else if (output != null) {
								console.log('Output: ' + output);
							}
						});
				}
				else if (error != null) {

					console.log('Compile error: ' + error);
				}
				else if (output != null) {
					console.log('Compile output: ' + output);
				}
			});
		});
	}
	else {
		console.log('No class in file.');
	}
});

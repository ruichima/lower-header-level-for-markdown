# VSCode extension lower header level for Markdown

This VSCode extension is developed to lower the levels of all headers in the selected part of a Markdown file.

I used [Academic](https://github.com/gcushen/hugo-academic) to build my personal website. However, I encountered difficulties when adding the Markdown file in the Courses section: the TOC in this section uses the second level headers of the Markdown file to construct its first level headings, and so on for other headers. To deal with this problem, I developed this VSCode extension.

## Features

- Lower the levels of all headers in the selected part of a Markdown file. See an example below.

<!-- ![example](./img/features.gif) -->
<div  align="center">
<img src="./img/features.gif" width = "70%" height = "70%" align=center />
</div>

## Install

- This VSCode extension is available in the VSCode Extension Marketplace now. Search `lower header level for Markdown` in it and install or click [here](https://marketplace.visualstudio.com/items?itemName=RuichiMa.lower-header-level-for-markdown) to visit the installation page directly.

## Run

- Select the text including the headers of which levels you want to lower.
- Type `CTRL+SHIFT+P` to open the command board and input `lower header level for Markdown`. A shortcut `CTRL+SHIFT+3` is also provided.

## Resource code

https://github.com/ruichima/lower-header-level-for-markdown

## Release Notes

### 1.0.3

Remove the message box 'success!' in the lower right corner.
Reduce the size of gif for example in README.

### 1.0.2

Fix bug: Can't lower the level of head which includes reserved characters in markdown: [ ]() { } . \* + ? ^ \$ \ |.

### 1.0.1

Update README.

### 1.0.0

Initial release.

## License

[MIT](./LICENSE)

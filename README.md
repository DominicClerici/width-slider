# Modify Editor Width Plugin for Obsidian

![Obsidian Downloads](https://img.shields.io/badge/dynamic/json?logo=obsidian&color=%23483699&label=downloads&query=%24%5B%22editor-width%22%5D.downloads&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json)

Modify Obsidian's editor width with a simple slider in the footer. This plugin was inspired by the currently non-functional [obsidian-editor-width-slider](https://github.com/MugishoMp/obsidian-editor-width-slider).

## Features

-   Adds a slider to the Obsidian footer for easy adjustment of editor width
-   Supports custom editor width settings per note using YAML frontmatter
-   Configurable default slider width and percentage
-   Responsive design that works well with Obsidian's theme

## Installation

1. Open Obsidian Settings
2. Navigate to Community Plugins and disable Safe Mode
3. Click Browse community plugins
4. Search for "Modify Editor Width"
5. Click Install
6. Once installed, close the Community Plugins window and activate the plugin

## Usage

### Global Width Adjustment

Use the slider in the footer to adjust the editor width globally. The width value is displayed next to the slider.

### Per-Note Width Adjustment

To set a custom width for a specific note, add the following to the note's YAML frontmatter:

```yaml
---
editor-width: 50
---
```

Replace `50` with any value between 0 and 100 to set the desired width percentage.

### Reset to Default

Click on the width value next to the slider to reset the editor width to the default value.

## Configuration

You can customize the plugin's behavior in the plugin settings:

1. Open Obsidian Settings
2. Navigate to Plugin Options
3. Find "Modify Editor Width"

Available settings:

-   **Slider Width**: Set the width of the slider in pixels
-   **Slider Default Percentage**: Set the default value for the slider

## Development

If you want to contribute to the development of this plugin:

1. Clone this repository
2. Run `npm i` or `yarn` to install dependencies
3. Run `npm run dev` to start compilation in watch mode

## Support

If you encounter any issues or have feature requests, please file them in the [Issues](https://github.com/DominicClerici/obsidian-editor-width/issues) section of the GitHub repository.

## Funding

If you find this plugin helpful, you can support its development:

[![Ko-Fi](https://shields.io/badge/kofi-Buy_a_coffee-ff5f5f?logo=ko-fi&style=for-the-badgeKofi)](https://ko-fi.com/dominicclerici)

## License

This project is licensed under the MIT License.

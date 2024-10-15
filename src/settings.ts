import { App, PluginSettingTab, Setting } from "obsidian";
import { EditorWidthSliderSettings } from "./types";
import ChangeEditorWidth from "./main";

// ---------------------------- Storing Information ----------------------------
// the default value of the thing you want to store
export const DEFAULT_SETTINGS: EditorWidthSliderSettings = {
	sliderPercentage: "20",
	sliderPercentageDefault: "20",
	sliderWidth: "150",
};
// ---------------------------- Storing Information ----------------------------

export class EditorWidthSliderSettingTab extends PluginSettingTab {
	plugin: ChangeEditorWidth;

	constructor(app: App, plugin: ChangeEditorWidth) {
		super(app, plugin);
		this.plugin = plugin;
	}
	// this.settings.sliderWidth
	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Slider Width")
			.setDesc("Width of the slider in the document footer.")
			.addText((text) =>
				text
					.setPlaceholder("Slider width in px")
					.setValue(this.plugin.settings.sliderWidth)
					.onChange(async (value) => {
						if (value === "") {
							value = "150";
						}
						this.plugin.settings.sliderWidth = value;
						this.plugin.updateSliderStyle();
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Slider Default Percentage")
			.setDesc("What do you want the default value of the slider to be?")
			.addText((text) =>
				text
					.setPlaceholder("20")
					.setValue(this.plugin.settings.sliderPercentageDefault)
					.onChange(async (value) => {
						if (value === "") {
							value = "20";
						}
						this.plugin.settings.sliderPercentageDefault = value;
						this.plugin.updateSliderStyle();
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Note:")
			.setDesc(
				"The field should be named \"editor-width\" in the YAML frontmatter of the note in order to customize the editor width of that repective note. It won't work globally for all notes unless you specify it in each note's frontmatter."
			);
	}
}

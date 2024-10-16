import { App, PluginSettingTab, Setting } from "obsidian";
import { EditorWidthSliderSettings } from "./types";
import ChangeEditorWidth from "./main";

// ---------------------------- Storing Information ----------------------------
// the default value of the thing you want to store
export const DEFAULT_SETTINGS: EditorWidthSliderSettings = {
	sliderPercentage: "40",
	sliderPercentageDefault: "40",
	sliderWidth: "default",
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
			.addDropdown((dd) => {
				// has values xs: 50 sm: 100 default: 150 lg: 200 xl: 250 xxl:350
				dd.addOption("xs", "Tiny");
				dd.addOption("sm", "Small");
				dd.addOption("default", "Default");
				dd.addOption("lg", "Large");
				dd.addOption("xl", "Very large");
				dd.addOption("xxl", "Huge");
				dd.setValue(this.plugin.settings.sliderWidth);
				dd.onChange(async (value) => {
					this.plugin.settings.sliderWidth = value;
					this.plugin.updateSliderStyle();
					await this.plugin.saveSettings();
				});
			});

		new Setting(containerEl)
			.setName("Slider Reset Value")
			.setDesc(
				"Editor width (0-100) that will be applied when the slider reset button is pushed. Default is 40."
			)
			.addText((text) =>
				text
					.setPlaceholder("20")
					.setValue(this.plugin.settings.sliderPercentageDefault)
					.onChange(async (value) => {
						if (isNaN(parseInt(value))) {
							value = "20";
						}
						if (parseInt(value) < 0) {
							value = "0";
						}

						if (parseInt(value) > 100) {
							value = "100";
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

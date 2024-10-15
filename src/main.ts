import { Plugin, TFile } from "obsidian";

import { DEFAULT_SETTINGS, EditorWidthSliderSettingTab } from "./settings";

import { EditorWidthSliderSettings } from "./types";

import { WarningModal } from "./warning";

export default class EditorWidthSlider extends Plugin {
	settings: EditorWidthSliderSettings;

	async onload() {
		await this.loadSettings();
		this.addStyle();
		this.app.workspace.on("file-open", () => {
			this.updateEditorStyleYAML();
		});
		this.createSlider();
		this.addSettingTab(new EditorWidthSliderSettingTab(this.app, this));
	}

	onunload() {
		this.cleanUpResources();
	}

	// ---------------------------- SLIDER -------------------------------------
	createSlider() {
		// Create the slider element
		const rangeInput = document.createElement("input");
		rangeInput.id = "width-slider";
		rangeInput.type = "range";
		rangeInput.min = "0";
		rangeInput.max = "100";
		rangeInput.value = this.settings.sliderPercentage;
		rangeInput.style.width = this.settings.sliderWidth + "px";

		// Add event listener to the slider
		rangeInput.addEventListener("input", (event) => {
			const value = parseInt(rangeInput.value);
			// const widthInPixels = 400 + value * 10;
			this.settings.sliderPercentage = value.toString();

			this.saveSettings();
			this.updateEditorStyle();
			widthValue.textContent = value.toString();
		});

		// Create the text element for displaying the slider value
		const widthValue = document.createElement("div");
		widthValue.textContent = rangeInput.value;
		widthValue.className = "width-value";
		widthValue.id = "width-value";

		widthValue.addEventListener("click", () => {
			this.resetEditorWidth();
		});

		const statusBarContainer = this.addStatusBarItem();
		statusBarContainer.classList.add("width-slider-container");
		statusBarContainer.appendChild(rangeInput);
		statusBarContainer.appendChild(widthValue);
	}
	// ---------------------------- SLIDER -------------------------------------

	cleanUpResources() {
		this.resetEditorWidth();
	}

	resetEditorWidth() {
		// const widthInPixels = 400 + value * 10;
		this.settings.sliderPercentage = this.settings.sliderPercentageDefault;

		// get the custom css element
		const rangeInput = document.getElementById(
			"width-slider"
		) as HTMLInputElement;
		const widthValue = document.getElementById(
			"width-value"
		) as HTMLInputElement;
		if (rangeInput) {
			if (widthValue) {
				rangeInput.value = this.settings.sliderPercentageDefault;
				widthValue.textContent =
					this.settings.sliderPercentageDefault.toString();
			}
		}

		this.saveSettings();
		this.updateEditorStyleYAML();
	}

	// add element that contains all of the styling elements we need
	addStyle() {
		// add a css block for our settings-dependent styles
		const widthController = document.createElement("style");
		widthController.id = "width-controller";
		document.head.appendChild(widthController);
		// document.getElementsByTagName("head")[0].appendChild(widthController);

		// add the main class
		document.body.classList.add("width-controller");

		// update the style with the settings-dependent styles
		// this.updateEditorStyle();
	}

	// update the styles (at the start, or as the result of a settings change)
	updateEditorStyle() {
		// get the custom css element
		const styleElement = document.getElementById("width-controller");
		if (!styleElement) throw "width controller element not found";
		else {
			styleElement.innerText = `
				body {
					--line-width: calc(31rem + .75 * ${this.settings.sliderPercentage}rem) !important;
				  	--file-line-width: calc(31rem + .75 * ${this.settings.sliderPercentage}rem) !important;
				}
			`;
		}
	}

	updateEditorStyleYAMLHelper(editorWidth: any) {
		const styleElement = document.getElementById("width-controller");
		if (!styleElement) throw "width controller element not found";
		else {
			styleElement.innerText = `
			body {
   				--line-width: calc(100px + ${editorWidth}vw) !important;
			  	--file-line-width: calc(100px + ${editorWidth}vw) !important;
			}
		`;
		}
	}

	pattern = /^(?:[0-9]{1,2}|100)$/;

	validateString(inputString: string): boolean {
		return this.pattern.test(inputString);
	}

	updateEditorStyleYAML() {
		// if there is yaml frontmatter, take info from yaml, otherwise take info from slider
		const file = this.app.workspace.getActiveFile() as TFile; // Currently Open Note
		if (file.name) {
			const metadata = this.app.metadataCache.getFileCache(file);
			// const metadata = app.vault.metadataCache.getFileCache(file);
			if (metadata) {
				if (metadata.frontmatter) {
					try {
						if (metadata.frontmatter["editor-width"]) {
							if (
								this.validateString(
									metadata.frontmatter["editor-width"]
								)
							) {
								this.updateEditorStyleYAMLHelper(
									metadata.frontmatter["editor-width"]
								);
							} else {
								new WarningModal(this.app).open();
								throw new Error(
									"Editor width must be a number from 0 to 100."
								);
							}
						} else {
							this.updateEditorStyle();
						}
					} catch (e) {
						console.error("Error:", e.message);
					}
				} else {
					this.updateEditorStyle();
				}
			}
		}
		// return; // Nothing Open
	}

	updateSliderStyle() {
		const rangeInput = document.getElementById("width-slider");

		if (!rangeInput) {
			throw new Error("width slider element not found");
		} else {
			rangeInput.style.width = this.settings.sliderWidth + "px";
		}
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
// ---------------------------- Plugin Class -----------------------------------

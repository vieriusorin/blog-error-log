import fs from "fs/promises";
import path from "path";

const tokensPath = path.resolve("design-tokens.json");
const outputPath = path.resolve("src/styles/design-tokens.css");
const prefix = "cds"; // Your chosen prefix
const baseFontSizePx = 16; // Base font size for px to rem conversion
let hasError = false; // Flag to track validation errors

// --- Validation Helpers ---

// Keep hex/rgba check, add a simple check for lch start/end
const hexRgbaRegex = /^(#(?:[0-9a-fA-F]{3,4}){1,2}|(rgba?)\\s*\\([^)]*\\))$/i;
function isValidColor(value) {
	if (typeof value !== "string" || value.trim() === "") return false;
	const trimmedValue = value.trim();
	// Test for hex/rgba first, then check for lch() structure
	return (
		hexRgbaRegex.test(trimmedValue) ||
		(trimmedValue.startsWith("lch(") && trimmedValue.endsWith(")"))
	);
}

// Checks for number followed by common units
const sizeUnitRegex = /^-?\d+(\.\d+)?(rem|em|px)$/;
function isValidSize(value) {
	return typeof value === "string" && sizeUnitRegex.test(value);
}

// Checks for valid number (potentially string representation)
function isUnitlessNumber(value) {
	return !isNaN(parseFloat(value)) && isFinite(value);
}

// --- Unit Conversion Helper ---
function convertPxToRem(value) {
	if (typeof value === "string" && value.endsWith("px")) {
		const pxValue = parseFloat(value);
		if (!isNaN(pxValue)) {
			const remValue = pxValue / baseFontSizePx;
			// Round to avoid excessive decimal places, adjust precision as needed
			return `${Number(remValue.toFixed(4))}rem`;
		}
	}
	return value; // Return original value if not px or invalid
}

// --- Token Processing ---

// Helper function to flatten tokens into CSS variables
function flattenTokensToCSS(obj, parentKey = "") {
	let cssVars = "";
	for (const key in obj) {
		const currentPath = parentKey ? `${parentKey}.${key}` : key;

		// Skip the theme override keys at the root level
		if (parentKey === "" && key === "dark") {
			continue;
		}

		let value = obj[key]; // Use 'let' so we can potentially modify it

		if (typeof value === "object" && value !== null && !Array.isArray(value)) {
			// Recursively handle nested objects
			// Note: Changed parentKey construction to use '.' for path consistency
			cssVars += flattenTokensToCSS(
				value,
				parentKey ? `${parentKey}.${key}` : key
			);
		} else {
			// --- Validation Logic ---
			let isValid = true;
			let needsConversion = false;

			if (currentPath.startsWith("color")) {
				isValid = isValidColor(value);
				if (!isValid)
					console.error(
						`❌ Invalid color value for [${currentPath}]: ${value}`
					);
			} else if (
				currentPath.startsWith("spacing") ||
				currentPath.startsWith("typography.fontSize") ||
				(currentPath.startsWith("borderRadius") && key !== "full")
			) {
				isValid = isValidSize(value);
				if (!isValid)
					console.error(
						`❌ Invalid size value for [${currentPath}]: ${value}. Expected number with rem, em, or px.`
					);
				if (isValid) {
					needsConversion = true; // Mark for potential conversion
				}
			} else if (
				currentPath.startsWith("typography.fontWeight") ||
				currentPath.startsWith("typography.lineHeight") ||
				currentPath.startsWith("zIndex")
			) {
				isValid = isUnitlessNumber(value);
				if (!isValid)
					console.error(
						`❌ Invalid unitless number value for [${currentPath}]: ${value}.`
					);
			}
			// Add more specific checks for timing, shadows etc. if needed

			if (!isValid) {
				hasError = true; // Set the flag if any validation fails
			} else {
				// --- Unit Conversion ---
				if (needsConversion) {
					value = convertPxToRem(value);
				}
				// --- End Unit Conversion ---
			}
			// --- End Validation ---

			// Format: --prefix-category-property: value;
			// Use parentKey with dots replaced by dashes for CSS var name
			const cssVarName = `--${prefix}-${
				parentKey ? `${parentKey.replace(/\./g, "-")}-${key}` : key
			}`;
			cssVars += `  ${cssVarName}: ${value};\n`;
		}
	}
	return cssVars;
}

async function generateCSSTokens() {
	hasError = false; // Reset error flag at start
	try {
		const tokensData = await fs.readFile(tokensPath, "utf-8");
		const tokens = JSON.parse(tokensData);

		// Generate :root variables (base theme)
		let cssContent = `:root {\n`;
		cssContent += flattenTokensToCSS(tokens);
		cssContent += `}\n`;

		// --- Theme Overrides ---

		// Dark Theme
		if (tokens.dark) {
			cssContent += `\n[data-theme='dark'] {\n`;
			// Pass the theme key itself to ensure paths like 'dark.color.primary' are handled
			cssContent += flattenTokensToCSS(tokens.dark, "dark");
			cssContent += `}\n`;
		}

		// Add other themes here if needed (e.g., high contrast)
		// if (tokens.highContrast) { ... }

		// --- Final Check & Write ---
		if (hasError) {
			console.error("\n❌ Validation errors found. CSS file not generated.");
			process.exit(1); // Exit with error code
		}

		await fs.writeFile(outputPath, cssContent, "utf-8");
		console.log(
			`✅ CSS tokens generated successfully at ${outputPath} (with validation & conversion)`
		);
	} catch (error) {
		if (error instanceof SyntaxError) {
			console.error("❌ Error parsing design-tokens.json:", error.message);
		} else {
			console.error("❌ Error generating CSS tokens:", error);
		}
		process.exit(1);
	}
}

generateCSSTokens();

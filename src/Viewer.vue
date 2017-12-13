<template>
  <div id="viewer" v-show="example !== null">
		<canvas width="800" height="800"></canvas>
		<fieldset>
			<legend for="viewDropdown">View</legend>
			<select id="viewDropdown" v-model="view">
				<option>Default</option>
				<option>Front</option>
				<option>Back</option>
				<option>Left</option>
				<option>Right</option>
				<option>Top</option>
				<option>Bottom</option>
			</select>
		</fieldset>
		<fieldset>
			<legend>Options</legend>
			<div>
				<input id="autorotate" v-model="autorotate" type="checkbox">
				<label for="autorotate">autorotation</label>
			</div>
			<div>
				<input id="clip" v-model="clip" type="checkbox">
				<label for="clip">clipping</label>
			</div>
			<div>
				<input id="ortho" v-model="ortho" type="checkbox">
				<label for="ortho">orthogonal</label>
			</div>
			<div>
				<input id="transparency" v-model="transparency" type="checkbox">
				<label for="transparency">transparency</label>
			</div>
		</fieldset>
		<fieldset>
			<legend>Downloads</legend>
			<div style="display: none">
					<button id="surfaceButton">3D model</button>
			</div>
			<div>
					<button id="screenshotButton" @click="exportScreenshot">
						Image
					</button>
			</div>
			<div>
					<button id="domainColouringButton" @click="exportDomainColouring">
						Sheets
					</button>
			</div>
		</fieldset>
	</div>
</template>

<script>
export default {
  name: 'viewer',
  data: function () {
    return {
			complexCurves: null,
			view: "Default",
			autorotate: false,
			clip: false,
			ortho: false,
			transparency: false
    };
  },
	methods: {
		exportDomainColouring: function () {
			this.complexCurves.exportDomainColouring();
		},
		exportScreenshot: function () {
			this.complexCurves.exportScreenshot();
		}
	},
	props: {
    example: null
	},
  watch: {
		autorotate: function (autorotate) {
			this.complexCurves.setAutorotate(autorotate);
		},
		clip: function (clip) {
			this.complexCurves.setClipping(clip);
		},
		example: function (example) {
			var canvas = document.querySelector("#viewer canvas");
			if (canvas === null)
				return;
			if (!example || example.sheets < 2) // TODO does not belong here
					return;
			if (this.complexCurves) {
					this.complexCurves.unregisterEventHandlers();
					var parentNode = canvas.parentNode;
					var newCanvas = document.createElement("canvas");
					newCanvas.width = 800;
					newCanvas.height = 800;
					parentNode.replaceChild(newCanvas, canvas);
					canvas = newCanvas;
			}
			var piOver180 = Math.PI / 180;
			var lat = 75 * piOver180;
			var lon = 30 * piOver180;
			if (example.cached) {
					this.complexCurves =
							ComplexCurves.fromFile(canvas,
									'/models/' + example.id + '.bin',
									example.equation, lat, lon);
			} else {
					this.complexCurves = ComplexCurves.fromPolynomial(canvas,
							example.polynomial, example.depth || 12, lat, lon);
			}
			if (example.zoom !== undefined)
					this.complexCurves.setZoom(example.zoom);
			// TODO search should be small
			// TODO reset options
			// TODO update hash
		},
		ortho: function (ortho) {
			this.complexCurves.setOrtho(ortho);
		},
		transparency: function (transparency) {
			this.complexCurves.setTransparency(transparency);
		},
		view: function (view) {
        this.complexCurves['rotate' + view]();
		}
	}
}
</script>

<style>
canvas {
	background-color: black;
}
</style>

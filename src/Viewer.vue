<template>
  <div id="viewer" v-show="example !== null">
		<canvas width="800" height="800"></canvas>
		<form>
			<fieldset>
				<legend for="viewDropdown">View</legend>
				<select id="viewDropdown" class="ui fluid dropdown">
					<option selected>Default</option>
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
					<input name="autorotate" type="checkbox">
					<label for="autorotate">autorotation</label>
				</div>
				<div>
					<input name="clip" type="checkbox">
					<label for="clip">clipping</label>
				</div>
				<div>
					<input name="ortho" type="checkbox">
					<label for="ortho">orthogonal</label>
				</div>
				<div>
					<input name="transparency" type="checkbox">
					<label for="transparency">transparency</label>
				</div>
			</fieldset>
			<fieldset>
				<legend>Downloads</legend>
				<div style="display: none">
						<button id="surfaceButton">3D model</button>
				</div>
				<div>
						<button id="screenshotButton">Image</button>
				</div>
				<div>
						<button id="domainColouringButton">Sheets</button>
				</div>
			</fieldset>
    </form>
	</div>
</template>

<script>
export default {
  name: 'viewer',
  data: function () {
    return {
			complexCurves: null
    };
  },
	props: {
    example: null
	},
  watch: {
		example: function (newExample) {
			var canvas = document.querySelector("#viewer canvas");
			console.log("#viewer", document.querySelector("#viewer"));
			if (canvas === null)
				return;
			if (!newExample || newExample.sheets < 2) // TODO does not belong here
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
			if (newExample.cached) {
					this.complexCurves =
							ComplexCurves.fromFile(canvas,
									'/models/' + newExample.id + '.bin',
									newExample.equation, lat, lon);
			} else {
					this.complexCurves = ComplexCurves.fromPolynomial(canvas,
							newExample.polynomial, newExample.depth || 12, lat, lon);
			}
			if (newExample.zoom !== undefined)
					this.complexCurves.setZoom(newExample.zoom);
			// TODO search should be small
			// TODO reset options
			// TODO update hash
		}
	}
}
</script>

<style>
canvas {
	background-color: black;
}
</style>

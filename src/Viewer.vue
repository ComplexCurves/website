<template>
  <div id="viewer">
		<canvas width="800" height="800"></canvas>
    <div id="controls">
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
  activated: function () {
    var example = this.example;
    if (this.complexCurves)
      this.teardownComplexCurves();
    if (example.cached) {
        var path = '/models/' + example.id + '.bin';
        this.complexCurves =
            ComplexCurves.fromFile(this.canvas, path, example.equation);
    } else {
        this.complexCurves = ComplexCurves.fromPolynomial(this.canvas,
            example.polynomial, example.depth || 12);
    }
    if (example.zoom !== undefined)
        this.complexCurves.setZoom(example.zoom);
    this.complexCurves.setBackground(1, 1, 1, 0);
  },
	computed: {
		canvas: function () {
			return document.querySelector("#viewer canvas");
		}
	},
	methods: {
		exportDomainColouring: function () {
			this.complexCurves.exportDomainColouring();
		},
		exportScreenshot: function () {
			this.complexCurves.exportScreenshot();
		},
		resetCanvas: function () {
			var parentNode = this.canvas.parentNode;
			var newCanvas = document.createElement("canvas");
			newCanvas.width = 800;
			newCanvas.height = 800;
			parentNode.replaceChild(newCanvas, canvas);
		},
		resetOptions: function () {
			this.view = "Default";
			this.autorotate = false;
			this.clip = false;
			this.ortho = false;
			this.transparency = false;
		},
		teardownComplexCurves: function () {
			this.resetOptions();
			this.complexCurves.unregisterEventHandlers();
			this.resetCanvas();
		}
	},
	props: {
    example: {
			type: Object,
      required: true,
			validator: function (example) {
				console.log(example, example.sheets);
				return !(example !== null && example.sheets < 2);
			}
		}
	},
  watch: {
		autorotate: function (autorotate) {
			this.complexCurves.setAutorotate(autorotate);
		},
		clip: function (clip) {
			this.complexCurves.setClipping(clip);
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
  float: left;
  width: 100%;
  margin-bottom: 1.5em;
}
#controls {
  min-width: 10em;
}
@media (min-width: 715px) {
  canvas {
    width: 70%;
  }
	#controls {
    float: left;
    width: 30%;
	}
}
#controls fieldset {
  border: none;
  text-align: left;
  float: left;
}
#controls legend {
  font-weight: bold;
}
#controls select, #controls button {
  min-width: 8em;
}
#controls input {
  vertical-align: middle;
}
</style>

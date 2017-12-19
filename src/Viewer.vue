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
import Example from './Example.js'
export default {
  name: 'viewer',
  data: function () {
    return {
      complexCurves: null,
			view: this.initialView || "Default",
			autorotate: this.initialAutorotate || false,
			clip: this.initialClip || false,
			ortho: this.initialOrtho || false,
			transparency: this.initialTransparency || false
    };
  },
  activated: function () {
    this.updateComplexCurves();
  },
	computed: {
		canvas: function () {
			return document.querySelector("#viewer canvas");
		},
	},
	methods: {
		exportDomainColouring: function () {
			this.complexCurves.exportDomainColouring();
		},
		exportScreenshot: function () {
			this.complexCurves.exportScreenshot();
		},
    updateComplexCurves: function () {
      var example = this.example;
      if (this.complexCurves)
        this.complexCurves.unregisterEventHandlers();
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
      this.complexCurves.setBackground(0, 0, 0, 1);
			this.complexCurves.setAutorotate(this.autorotate);
			this.complexCurves.setClipping(this.clip);
			this.complexCurves.setOrtho(this.ortho);
			this.complexCurves.setTransparency(this.transparency);
      this.complexCurves['rotate' + this.view]();
    },
    updateRoute: function () {
      var example = this.example;
      var id = encodeURIComponent(example.id);
      var options = [];
      if (id === 'Custom')
          options.push('equation=' +
              encodeURIComponent(example.equation));
      if (!example.cached && id !== 'Custom')
          options.push('cached=0');
      if (this.view !== 'Default')
          options.push('view=' + this.view);
      if (this.autorotate)
          options.push('autorotate=1');
      if (this.clip)
          options.push('clip=1');
      if (this.ortho)
          options.push('ortho=1');
      if (this.transparency)
          options.push('transparency=1');
      var hash = '/' + id + (options.length === 0 ? '' : '?' + options.join('&'));
      this.$router.push(hash);
    }
	},
	props: {
    example: {
			type: Object,
      required: true,
			validator: function (example) {
				return Example.isValid(example);
			}
		},
    initialView: String,
    initialAutorotate: Boolean,
    initialClip: Boolean,
    initialOrtho: Boolean,
    initialTransparency: Boolean
	},
  watch: {
		autorotate: function (autorotate) {
			this.complexCurves.setAutorotate(autorotate);
      this.updateRoute();
		},
		clip: function (clip) {
			this.complexCurves.setClipping(clip);
      this.updateRoute();
    },
		ortho: function (ortho) {
			this.complexCurves.setOrtho(ortho);
      this.updateRoute();
		},
		transparency: function (transparency) {
			this.complexCurves.setTransparency(transparency);
      this.updateRoute();
		},
		view: function (view) {
      this.complexCurves['rotate' + view]();
      this.updateRoute();
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

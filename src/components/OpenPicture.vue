<template>
  <section>
    <div class="flex flex-cols justify-around">
      <div class="border-2 border-gray-500">
        <p class="text-xl pb-2">Import your image below:</p>

        <input
          class="py-6"
          type="file"
          id="inpFile"
          name="img"
          accept="image/*"
          @change="getFile('inpFile')"
        />
      </div>

      <div class="border-2 border-gray-500">
        <p class="text-xl pb-2">Insert your link below:</p>
        <input v-model="url" type="url" id="url" pattern="https://.*" />
      </div>
    </div>

    <div class="flex flex-col">
      <div class="mx-auto" id="image-preview-container">
        <img :src="url" alt="Image Preview" id="image-preview-image" />
        <span id="image-preview-text">Image Preview</span>
      </div>

      <canvas
        class="hidden"
        id="myCanvas"
        :width="widthX"
        :height="heightY"
        style="border: 1px solid #000000"
      ></canvas>

      <button
        @click="getColorArray"
        class="
          bg-blue-500
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          my-4
          px-4
          rounded
        "
      >
        Click here find the average color
      </button>

      <color-container
        class="mx-auto"
        :RGBcolor="RGBcolor"
        :firstTrigger="firstTrigger"
      ></color-container>
    </div>
  </section>
</template>

<script>
import ColorContainer from "./ColorContainer.vue";
export default {
  components: {
    ColorContainer,
  },

  data() {
    return {
      file: null,
      widthX: 0,
      heightY: 0,
      RGBcolor: "",
      firstTrigger: false,
      url: "",
    };
  },

  methods: {
    getFile(id) {
      const previewImage = this.$el.querySelector("#image-preview-image");
      const previewText = this.$el.querySelector("#image-preview-text");
      if (id == "inpFile") {
        const inpFile = document.getElementById(id);

        this.file = inpFile.files[0];

        if (this.file) {
          const reader = new FileReader();

          previewText.style.display = "none";
          previewImage.style.display = "block";
          reader.addEventListener("load", function () {
            previewImage.setAttribute("src", this.result);
          });

          reader.readAsDataURL(this.file);
        } else {
          previewText.style.display = null;
          previewImage.style.display = null;
          previewImage.setAttribute("src", "");
        }
      } else {
        var request = new XMLHttpRequest();
        request.open("GET", this.url, true);
        request.send();
        request.onload = function () {
          if (request.status == 200) {
            console.log("image exists");
          } else {
            previewText.style.display = "block";
            previewImage.style.display = "none";
            console.log("image doesn't exist");
          }
        };
      }
    },

    getColorArray() {
      if (this.file) {
        this.firstTrigger = true;
        const reader = new FileReader();

        var file = document.getElementById("image-preview-image");
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");

        this.widthX = file.naturalWidth;
        this.heightY = file.naturalHeight;

        var that = this;
        reader.addEventListener("load", function () {
          ctx.drawImage(file, 0, 0, that.widthX, that.heightY);
          var imageArray = ctx.getImageData(
            0,
            0,
            that.widthX,
            that.heightY
          ).data;

          var rgb = { r: 0, g: 0, b: 0 };
          var count = 0;
          var i = -4;
          var length = imageArray.length;

          while ((i += 5 * 4) < length) {
            count++;
            rgb.r += imageArray[i];
            rgb.g += imageArray[i + 1];
            rgb.b += imageArray[i + 2];
          }

          rgb.r = Math.floor(rgb.r / count);
          rgb.g = Math.floor(rgb.g / count);
          rgb.b = Math.floor(rgb.b / count);
          that.RGBcolor = rgb;
        });

        reader.readAsDataURL(this.file);
      }
    },
  },

  watch: {
    url() {
      this.getFile("url");
    },
  },
};
</script>

<style scoped>
#image-preview-container {
  width: 30rem;
  min-height: 100px;
  border: 2px solid lightgray;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: gray;
}

#image-preview-image {
  display: none;
  width: 100%;
}
</style>

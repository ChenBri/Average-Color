<template>
  <section>
    <p class="text-xl pb-2">Import your image below:</p>

    <input
      type="file"
      id="inpFile"
      name="img"
      accept="image/*"
      @change="getFile"
    />

    <div id="image-preview-container">
      <img src="" alt="Image Preview" id="image-preview-image" />

      <span id="image-preview-text">Image Preview</span>
    </div>

    <canvas class="hidden" id="myCanvas" :width="widthX" :height="heightY" style="border:1px solid #000000"></canvas>

    <button @click="getColorArray">asdasdasd</button>
   
  </section>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      widthX: 0,
      heightY: 0,
      RGBcolor: 'red'
    };
  },

  methods: {
    getFile() {
      const inpFile = document.getElementById("inpFile");
      const previewImage = this.$el.querySelector("#image-preview-image");
      const previewText = this.$el.querySelector("#image-preview-text");

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
      
    },

    getColorArray() {
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      var file = this.$el.querySelector("#image-preview-image");

      this.widthX = file.naturalWidth;
      this.heightY = file.naturalHeight;
        
        // Double click is required in order to work.
      ctx.drawImage(file, 0, 0, this.widthX, this.heightY);
      var imageArray = ctx.getImageData(0, 0, this.widthX, this.heightY).data;

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
      console.log(rgb);
      console.log(imageArray);
    },
  },
};
</script>

<style scoped>
#image-preview-container {
  width: 300px;
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

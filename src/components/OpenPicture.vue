<template>
    <section>
        <div
            class="flex flex-cols justify-around items-center justify-items-center"
        >
            <div
                class="border-r-2 border-b-4 border-gray-500 w-[50%] h-[10rem] p-6"
            >
                <p class="text-xl pb-2">Import your image below:</p>

                <input
                    class="py-6"
                    type="file"
                    id="inpFile"
                    name="img"
                    accept="image/*"
                    @change="getFile('inpFile')"
                    @click="activeTab('file')"
                />
            </div>

            <div
                class="border-l-2 border-b-4 border-gray-500 w-[50%] h-[10rem] p-6"
            >
                <p class="text-xl pb-2">Insert your link below:</p>
                <input
                    class="mt-6 w-[80%]"
                    @click="activeTab('url')"
                    v-model="url"
                    type="url"
                    id="url"
                    pattern="https://.*"
                />
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
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 my-4 px-4 text-xl"
            >
                Get Average Color
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
            file: null, // Input File
            url: "", // Input URL
            widthX: 0, // Width of the canvas
            heightY: 0, // Height of the canvas
            RGBcolor: "", // EGB Object, e.g {r: 113, g: 100, b: 87}
            firstTrigger: false, // Enable ColorContainer.vue after the first click on the button
            active: "none",
            validimg: false,
        };
    },

    methods: {
        getFile(id) {
            const previewImage = this.$el.querySelector("#image-preview-image");
            const previewText = this.$el.querySelector("#image-preview-text");
            var that = this;
            if (id == "inpFile") {
                this.url = ""; //Reset URL
                that.validimg = false;

                const inpFile = document.getElementById(id);

                this.file = inpFile.files[0];

                if (this.file) {
                    const reader = new FileReader();
                    reader.addEventListener("load", function () {
                        previewImage.setAttribute("src", this.result);
                    });

                    previewText.style.display = "none";
                    previewImage.style.display = "block";

                    reader.readAsDataURL(this.file);
                } else {
                    previewText.style.display = null;
                    previewImage.style.display = null;
                    previewImage.setAttribute("src", "");
                }
            } else if (id == "url") {
                var request = new XMLHttpRequest();
                request.open("GET", this.url, true);
                request.send();
                request.onload = function () {
                    if (request.status !== 200) {
                        // URL isn't a valid image
                        previewText.style.display = "block";
                        previewImage.style.display = "none";
                        that.validimg = false;
                    } else {
                        // URL is a valid image
                        previewText.style.display = "none";
                        previewImage.style.display = "block";
                        that.validimg = true;
                    }
                };
            }
        },

        getColorArray() {
            var file = document.getElementById("image-preview-image");
            var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d");
            this.widthX = file.naturalWidth;
            this.heightY = file.naturalHeight;
            var that = this;
            var imageArray;

            if (this.file && this.active == "file") {
                this.firstTrigger = true;

                const reader = new FileReader();
                reader.addEventListener("load", function () {
                    ctx.drawImage(file, 0, 0, that.widthX, that.heightY);

                    imageArray = ctx.getImageData(
                        0,
                        0,
                        that.widthX,
                        that.heightY,
                    ).data;
                    var rgb = { r: 0, g: 0, b: 0 };
                    var count = 0;
                    var i = -4;
                    var length = imageArray.length;
                    that.theArray = imageArray;

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
            } else if (this.active == "url" && this.validimg) {
                this.firstTrigger = true;

                var img = new Image();

                img.onload = function () {
                    ctx.drawImage(img, 0, 0, that.widthX, that.heightY);
                    imageArray = ctx.getImageData(
                        0,
                        0,
                        that.widthX,
                        that.heightY,
                    ).data;
                    var rgb = { r: 0, g: 0, b: 0 };
                    var count = 0;
                    var i = -4;
                    var length = imageArray.length;
                    that.theArray = imageArray;

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
                };
                img.crossOrigin = "anonymous";
                img.src = this.url;
            }
        },

        activeTab(src) {
            this.firstTrigger = false;
            const previewImage = this.$el.querySelector("#image-preview-image");
            const previewText = this.$el.querySelector("#image-preview-text");
            this.$el.querySelector("#inpFile").value = "";

            previewText.style.display = "block";
            previewImage.style.display = "none";

            this.active = src;
        },
    },

    watch: {
        url() {
            this.url = this.url.replace(/\s/g, "");
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
    max-height: 17.5rem;
}
</style>

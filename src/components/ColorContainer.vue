<template>
    <div
        v-if="firstTrigger === true"
        :style="{ backgroundColor: HEX }"
        id="container"
        class="border-2 w-[200px] h-[200px] flex flex-col justify-evenly items-center p-12 font-bold text-white"
    >
        <div class="w-[150px] h-[50px] content-center text-center border-2">
            <div id="rgb">{{ RGB }}</div>
            <button
                v-clipboard="RGB"
                @click="copyColor('rgb')"
                class="inline-block"
            >
                Copy
            </button>
        </div>

        <div class="m-4 w-[150px] h-[50px] content-center text-center border-2">
            <div id="hex">{{ HEX }}</div>
            <button
                v-clipboard="HEX"
                @click="copyColor('hex')"
                class="inline-block"
            >
                Copy
            </button>
        </div>

        <div class="w-[150px] h-[50px] content-center text-center border-2">
            <div id="hsl">{{ HSL }}</div>
            <button
                v-clipboard="'[' + HSL + ']'"
                @click="copyColor('hsl')"
                class="inline-block"
            >
                Copy
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            RGB: "",
            HEX: "",
            HSL: "",
        };
    },

    props: ["RGBcolor", "firstTrigger"],

    methods: {
        copyColor() {
            // Message about the copied color
        },
    },

    watch: {
        RGBcolor() {
            const Red = this.RGBcolor.r;
            const Green = this.RGBcolor.g;
            const Blue = this.RGBcolor.b;

            this.RGB = `rgb(${Red}, ${Green}, ${Blue})`;

            const rgbToHex = (r, g, b) =>
                "#" +
                ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            this.HEX = rgbToHex(Red, Green, Blue);

            function rgbToHsl(r, g, b) {
                (r /= 255), (g /= 255), (b /= 255);
                var max = Math.max(r, g, b),
                    min = Math.min(r, g, b);
                var h,
                    s,
                    l = (max + min) / 2;

                if (max == min) {
                    h = s = 0;
                } else {
                    var d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch (max) {
                        case r:
                            h = (g - b) / d + (g < b ? 6 : 0);
                            break;
                        case g:
                            h = (b - r) / d + 2;
                            break;
                        case b:
                            h = (r - g) / d + 4;
                            break;
                    }
                    h /= 6;
                }

                return [
                    Math.floor(h * 360),
                    Math.floor(s * 100),
                    Math.floor(l * 100),
                ];
            }
            this.HSL = rgbToHsl(Red, Green, Blue);
        },
    },
};
</script>

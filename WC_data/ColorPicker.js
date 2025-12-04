document.addEventListener("DOMContentLoaded", function () {
    const MAX_SIZE = 500;
    const size = Math.min(window.innerWidth, window.innerHeight, MAX_SIZE) * 0.8;

    let effectData = null; // opslag voor serverwaarden en updates

    const colorPicker = new iro.ColorPicker("#picker", {
        width: size,
        color: "#ffffff",
        layout: [
            { component: iro.ui.Wheel },
            { component: iro.ui.Slider, options: { sliderType: 'value' } }
        ]
    });

    // Kleur ophalen
    fetch("/getcolor")
        .then(res => res.json())
        .then(data => {
            if (data && data.r !== undefined) {
                colorPicker.color.rgb = { r: data.r, g: data.g, b: data.b };
            }
        })
        .catch(err => console.warn("Geen kleur ontvangen:", err));

    const effectSelect = document.getElementById("effect");

    // Effect ophalen
    fetch("/geteffect")
        .then(res => res.json())
        .then(data => {
            if (!data) return;
            effectData = data;
            effectSelect.value = data.effect;
            effectSelect.dispatchEvent(new Event("change"));
        })
        .catch(err => console.warn("Geen effectgegevens ontvangen:", err));

    window.addEventListener("resize", () => {
        const newSize = Math.min(window.innerWidth, window.innerHeight, MAX_SIZE) * 0.8;
        colorPicker.resize(newSize);
    });

    colorPicker.on("color:change", function (color) {
        const { r, g, b } = color.rgb;
        document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        fetch(`/setcolor?r=${r}&g=${g}&b=${b}`)
            .then(res => { if (!res.ok) console.error("Kleur verzenden mislukt"); })
            .catch(err => console.error("Netwerkfout:", err));
    });

    // Elementen
    const HETISynSlider = document.getElementById("HETIS-yn");

    const scrollOptions = document.getElementById("scroll-options");
    const scrollText = document.getElementById("scroll-text");
    const scrollDuration = document.getElementById("scroll-duration");
    const scrollSpeedSlider = document.getElementById("scroll-speed");
    const scrollSpeedValue = document.getElementById("scroll-speed-value");

    const rainbowControls = document.getElementById("rainbowControls");
    const rainbowSpeedSlider = document.getElementById("rainbow-speed");
    const rainbowSpeedValue = document.getElementById("rainbow-speed-value");
    const brightnessRainbowSlider = document.getElementById("brightness-rainbow");
    const brightnessRainbowValue = document.getElementById("brightness-rainbow-value");

    const matrixControls = document.getElementById("matrixControls");
    const matrixSpeedSlider = document.getElementById("matrix-speed");
    const matrixSpeedValue = document.getElementById("matrix-speed-value");
    const brightnessMatrixSlider = document.getElementById("brightness-matrix");
    const brightnessMatrixValue = document.getElementById("brightness-matrix-value");
    const matrixTrail = document.getElementById("matrix-trail");

    const fireControls = document.getElementById("fireControls");
    const fireSpeedSlider = document.getElementById("fire-speed");
    const fireSpeedValue = document.getElementById("fire-speed-value");
    const fireIntensitySlider = document.getElementById("fire-intensity");
    const fireIntensityValue = document.getElementById("fire-intensity-value");
    const brightnessFireSlider = document.getElementById("brightness-fire");
    const brightnessFireValue = document.getElementById("brightness-fire-value");

    const wavesControls = document.getElementById("wavesControls");
    const wavePalette = document.getElementById("wave-palette");
    const waveSpeedSlider = document.getElementById("wave-speed");
    const waveSpeedValue = document.getElementById("wave-speed-value");
    const waveScrollSlider = document.getElementById("wave-scroll");
    const waveScrollValue = document.getElementById("wave-scroll-value");
    const waveColorSpeedSlider = document.getElementById("wave-color-speed");
    const waveColorSpeedValue = document.getElementById("wave-color-speed-value");
    const brightnessWaveSlider = document.getElementById("brightness-wave");
    const brightnessWaveValue = document.getElementById("brightness-wave-value");

    const plasmaControls = document.getElementById("plasmaControls");
    const plasmaPalette = document.getElementById("plasma-palette");
    const plasmaSpeedSlider = document.getElementById("plasma-speed");
    const plasmaSpeedValue = document.getElementById("plasma-speed-value");
    const plasmaScaleSlider = document.getElementById("plasma-scale");
    const plasmaScaleValue = document.getElementById("plasma-scale-value");
    const brightnessPlasmaSlider = document.getElementById("brightness-plasma");
    const brightnessPlasmaValue = document.getElementById("brightness-plasma-value");

    const snowControls = document.getElementById("snowControls");
    const snowSpeedSlider = document.getElementById("snow-speed");
    const snowSpeedValue = document.getElementById("snow-speed-value");
    const snowCountSlider = document.getElementById("snow-count");
    const snowCountValue = document.getElementById("snow-count-value");
    const snowWindSlider = document.getElementById("snow-wind");
    const snowWindValue = document.getElementById("snow-wind-value");
    const brightnessSnowSlider = document.getElementById("brightness-snow");
    const brightnessSnowValue = document.getElementById("brightness-snow-value");

    const starsControls = document.getElementById("starsControls");
    const starsCountSlider = document.getElementById("stars-count");
    const starsCountValue = document.getElementById("stars-count-value");
    const starsDimTimeSlider = document.getElementById("stars-dimtime");
    const starsDimTimeValue = document.getElementById("stars-dimtime-value");
    const starsAppSpeedSlider = document.getElementById("stars-appspeed");
    const starsAppSpeedValue = document.getElementById("stars-appspeed-value");
    const starsColorModeSlider = document.getElementById("stars-colormode");
    const starsColorModeValue = document.getElementById("stars-colormode-value");
    const brightnessStarsSlider = document.getElementById("brightness-stars");
    const brightnessStarsValue = document.getElementById("brightness-stars-value");

    const warpControls = document.getElementById("warpControls");
    const warpPalette = document.getElementById("warp-palette");
    const warpSpeedSlider = document.getElementById("warp-speed");
    const warpSpeedValue = document.getElementById("warp-speed-value");
    const brightnessWarpSlider = document.getElementById("brightness-warp");
    const brightnessWarpValue = document.getElementById("brightness-warp-value");
    const warpAngleStepSlider = document.getElementById("warp-anglestep");
    const warpAngleStepValue = document.getElementById("warp-anglestep-value");
    const warpColorStepSlider = document.getElementById("warp-colorstep");
    const warpColorStepValue = document.getElementById("warp-colorstep-value");
    const warpDirectionSlider = document.getElementById("warp-direction");
    const warpDirectionValue = document.getElementById("warp-direction-value");
    const warpMode = document.getElementById("warp-mode");

    const fwControls = document.getElementById("fwControls");
    const fwCountSlider = document.getElementById("fw-count");
    const fwCountValue = document.getElementById("fw-count-value");
    const fwSpeedSlider = document.getElementById("fw-speed");
    const fwSpeedValue = document.getElementById("fw-speed-value");
    const fwFadeSpeedSlider = document.getElementById("fw-fade-speed");
    const fwFadeSpeedValue = document.getElementById("fw-fade-speed-value");
    const fwTwinkleSlider = document.getElementById("fw-twinkle");
    const fwTwinkleValue = document.getElementById("fw-twinkle-value");
    const fwCometSlider = document.getElementById("fw-comet");
    const fwCometValue = document.getElementById("fw-comet-value");
    const fwBurstSlider = document.getElementById("fw-burst");
    const fwBurstValue = document.getElementById("fw-burst-value");

    const auControls = document.getElementById("auControls");
    const auPalette = document.getElementById("au-palette");
    const auTimeSlider = document.getElementById("au-time");
    const auTimeValue = document.getElementById("au-time-value");
    const auSpeedSlider = document.getElementById("au-speed");
    const auSpeedValue = document.getElementById("au-speed-value");
    const auScaleSlider = document.getElementById("au-scale");
    const auScaleValue = document.getElementById("au-scale-value");
    const auYoffsetSlider = document.getElementById("au-yoffset");
    const auYoffsetValue = document.getElementById("au-yoffset-value");
    const brightnessAuSlider = document.getElementById("brightness-au");
    const brightnessAuValue = document.getElementById("brightness-au-value");

    const confControls = document.getElementById("confControls");
    const confDensitySlider = document.getElementById("conf-density");
    const confDensityValue = document.getElementById("conf-density-value");
    const confSpeedSlider = document.getElementById("conf-speed");
    const confSpeedValue = document.getElementById("conf-speed-value");
    const confFadeSlider = document.getElementById("conf-fade");
    const confFadeValue = document.getElementById("conf-fade-value");
    const confSatSlider = document.getElementById("conf-sat");
    const confSatValue = document.getElementById("conf-sat-value");
    const brightnessConfSlider = document.getElementById("brightness-conf");
    const brightnessConfValue = document.getElementById("brightness-conf-value");
    // Snake Controls
    const snakeControls = document.getElementById("snakeControls");
    const snakeLengthModeSlider = document.getElementById("snake-lengthmode");
    const snakeLengthModeValue = document.getElementById("snake-lengthmode-value");
    const brightnessSnakeSlider = document.getElementById("brightness-snake");
    const brightnessSnakeValue = document.getElementById("brightness-snake-value");
    const snakeTargetsSlider = document.getElementById("snake-targets");
    const snakeTargetsValue = document.getElementById("snake-targets-value");

    
    const paletteOptions = [
        { value: "analogous", label: "analogous" },
        { value: "aurora_green", label: "aurora_green" },
        { value: "aurora_purple", label: "aurora_purple" },
        { value: "autumn_19", label: "autumn_19" },
        { value: "bhw1_28", label: "bhw1_28" },
        { value: "bhw2_49", label: "bhw2_49" },
        { value: "black_blue_magenta_white", label: "black_blue_magenta_white" },
        { value: "black_magenta_red", label: "black_magenta_red" },
        { value: "black_red_maganta_yellow", label: "black_red_maganta_yellow" },
        { value: "black_white", label: "black_white" },
        { value: "blue_cyan_yellow", label: "blue_cyan_yellow" },
        { value: "cloud", label: "cloud" },
        { value: "colorfull", label: "colorfull" },
        { value: "coral_reef", label: "coral_reef" },
        { value: "departure", label: "departure" },
        { value: "dry_wet", label: "dry_wet" },
        { value: "emerald_dragon", label: "emerald_dragon" },
        { value: "fire", label: "fire" },
        { value: "forest", label: "forest" },
        { value: "fuschia_7", label: "fuschia_7" },
        { value: "hate_thursday", label: "hate_thursday" },
        { value: "heat", label: "heat" },
        { value: "hult_gr64", label: "hult_gr64" },
        { value: "hult_gr65", label: "hult_gr65" },
        { value: "ib_jul_01", label: "ib_jul_01" },
        { value: "ib15", label: "ib15" },
        { value: "landscape_33", label: "landscape_33" },
        { value: "landscape_64", label: "landscape_64" },
        { value: "lava", label: "lava" },
        { value: "lava_2", label: "lava_2" },
        { value: "magenta_evening", label: "magenta_evening" },
        { value: "morn_coffee", label: "morn_coffee" },
        { value: "ocean", label: "ocean" },
        { value: "ocean_breeze", label: "ocean_breeze" },
        { value: "ocean_breeze_036", label: "ocean_breeze_036" },
        { value: "party", label: "party" },
        { value: "pink_purple", label: "pink_purple" },
        { value: "pinksplah_07", label: "pinksplah_07" },
        { value: "pinksplash_08", label: "pinksplash_08" },
        { value: "quagga", label: "quagga" },
        { value: "rainbow", label: "rainbow" },
        { value: "rainbowstripe", label: "rainbowstripe" },
        { value: "raindowsherbet", label: "raindowsherbet" },
        { value: "retro", label: "retro" },
        { value: "rgi_15", label: "rgi_15" },
        { value: "rivendell", label: "rivendell" },
        { value: "sunrise", label: "sunrise" },
        { value: "sunset", label: "sunset" },
        { value: "vintage_01", label: "vintage_01" },
        { value: "vintage_57", label: "vintage_57" }
    ];
    
        // Vul beide dropdowns
    fillPaletteSelect(document.getElementById("wave-palette"));
    fillPaletteSelect(document.getElementById("plasma-palette"));
    fillPaletteSelect(document.getElementById("warp-palette"));
    fillPaletteSelect(document.getElementById("au-palette"));

    const startButton = document.getElementById("start-effect");
    
    // Snake direction commands
    function sendSnakeCmd(cmd) {
    fetch(`/snake?cmd=${cmd}`)
        .then(response => response.text())
        .then(text => {
            console.log("Snake response:", text); // zou "OK" moeten zijn
        })
        .catch(err => console.error("Snake command error:", err));
    }

    // Slider updates + effectData bijwerken
    HETISynSlider.addEventListener("change", () => {
        const yn = HETISynSlider.checked ? 1 : -1;
        if (effectData) effectData.hetisyn = yn;
    });

    scrollText.addEventListener("input", () => {
        if (effectData) effectData.scrtext = scrollText.value;
    });
    scrollDuration.addEventListener("input", () => {
        if (effectData) effectData.scrduration = parseInt(scrollDuration.value, 10);
    });
    scrollSpeedSlider.addEventListener("input", () => {
        scrollSpeedValue.textContent = scrollSpeedSlider.value;
        if (effectData) effectData.scrspeed = parseInt(scrollSpeedSlider.value, 10);
    });

    rainbowSpeedSlider.addEventListener("input", () => {
        rainbowSpeedValue.textContent = rainbowSpeedSlider.value;
        if (effectData) effectData.rnbspeed = parseInt(rainbowSpeedSlider.value, 10);
    });
    brightnessRainbowSlider.addEventListener("input", () => {
        brightnessRainbowValue.textContent = brightnessRainbowSlider.value;
        if (effectData) effectData.rnbbrightness = parseInt(brightnessRainbowSlider.value, 10);
    });

    matrixSpeedSlider.addEventListener("input", () => {
        matrixSpeedValue.textContent = matrixSpeedSlider.value;
        if (effectData) effectData.mtrxspeed = parseInt(matrixSpeedSlider.value, 10);
    });
    brightnessMatrixSlider.addEventListener("input", () => {
        brightnessMatrixValue.textContent = brightnessMatrixSlider.value;
        if (effectData) effectData.mtrxbrightness = parseInt(brightnessMatrixSlider.value, 10);
    });
    matrixTrail.addEventListener("input", () => {
        if (effectData) effectData.matrixtrail = parseInt(matrixTrail.value, 10);
    });

    fireSpeedSlider.addEventListener("input", () => {
        fireSpeedValue.textContent = fireSpeedSlider.value;
        if (effectData) effectData.firespeed = parseInt(fireSpeedSlider.value, 10);
    });
    fireIntensitySlider.addEventListener("input", () => {
        fireIntensityValue.textContent = fireIntensitySlider.value;
        if (effectData) effectData.fireintensity = parseInt(fireIntensitySlider.value, 10);
    });
    brightnessFireSlider.addEventListener("input", () => {
        brightnessFireValue.textContent = brightnessFireSlider.value;
        if (effectData) effectData.firebrightness = parseInt(brightnessFireSlider.value, 10);
    });
    wavePalette.addEventListener("change", () => {
        if (effectData) effectData.wavepalette = wavePalette.value;
    });
    waveSpeedSlider.addEventListener("input", () => {
        waveSpeedValue.textContent = waveSpeedSlider.value;
        if (effectData) effectData.wavespeed = parseInt(waveSpeedSlider.value, 10);
    });
    waveScrollSlider.addEventListener("input", () => {
        waveScrollValue.textContent = waveScrollSlider.value;
        if (effectData) effectData.wavescroll = parseInt(waveScrollSlider.value, 10);
    });
    waveColorSpeedSlider.addEventListener("input", () => {
        waveColorSpeedValue.textContent = waveColorSpeedSlider.value;
        if (effectData) effectData.wavecolorspeed = parseInt(waveColorSpeedSlider.value, 10);
    });
    brightnessWaveSlider.addEventListener("input", () => {
        brightnessWaveValue.textContent = brightnessWaveSlider.value;
        if (effectData) effectData.wavebrightness = parseInt(brightnessWaveSlider.value, 10);
    });
    plasmaPalette.addEventListener("change", () => {
        if (effectData) effectData.plasmapalette = plasmaPalette.value;
    });
    plasmaSpeedSlider.addEventListener("input", () => {
        plasmaSpeedValue.textContent = plasmaSpeedSlider.value;
        if (effectData) effectData.plasmaspeed = parseInt(plasmaSpeedSlider.value, 10);
    });
    plasmaScaleSlider.addEventListener("input", () => {
        plasmaScaleValue.textContent = plasmaScaleSlider.value;
        if (effectData) effectData.plasmascale = parseInt(plasmaScaleSlider.value, 10);
    });
    brightnessPlasmaSlider.addEventListener("input", () => {
        brightnessPlasmaValue.textContent = brightnessPlasmaSlider.value;
        if (effectData) effectData.plasmabrightness = parseInt(brightnessPlasmaSlider.value, 10);
    });

    snowSpeedSlider.addEventListener("input", () => {
        snowSpeedValue.textContent = snowSpeedSlider.value;
        if (effectData) effectData.snowspeed = parseInt(snowSpeedSlider.value, 10);
    });
    snowCountSlider.addEventListener("input", () => {
        snowCountValue.textContent = snowCountSlider.value;
        if (effectData) effectData.snowcount = parseInt(snowCountSlider.value, 10);
    });
    snowWindSlider.addEventListener("input", () => {
        snowWindValue.textContent = snowWindSlider.value;
        if (effectData) effectData.snowwind = parseInt(snowWindSlider.value, 10);
    });
    brightnessSnowSlider.addEventListener("input", () => {
        brightnessSnowValue.textContent = brightnessSnowSlider.value;
        if (effectData) effectData.snowbrightness = parseInt(brightnessSnowSlider.value, 10);
    });

    starsCountSlider.addEventListener("input", () => {
        starsCountValue.textContent = starsCountSlider.value;
        if (effectData) effectData.starscount = parseInt(starsCountSlider.value, 10);
    });
    starsDimTimeSlider.addEventListener("input", () => {
        starsDimTimeValue.textContent = starsDimTimeSlider.value;
        if (effectData) effectData.starsdimtime = parseInt(starsDimTimeSlider.value, 10);
    });
    starsAppSpeedSlider.addEventListener("input", () => {
        starsAppSpeedValue.textContent = starsAppSpeedSlider.value;
        if (effectData) effectData.starsappspeed = parseInt(starsAppSpeedSlider.value, 10);
    });
    starsColorModeSlider.addEventListener("input", () => {
        starsColorModeValue.textContent = starsColorModeSlider.value;
        if (effectData) effectData.starscolormode = parseInt(starsColorModeSlider.value, 10);
    });
    brightnessStarsSlider.addEventListener("input", () => {
        brightnessStarsValue.textContent = brightnessStarsSlider.value;
        if (effectData) effectData.starsbrightness = parseInt(brightnessStarsSlider.value, 10);
    });

    warpPalette.addEventListener("change", () => {
        if (effectData) effectData.warppalette = warpPalette.value;
    });
    warpSpeedSlider.addEventListener("input", () => {
        warpSpeedValue.textContent = warpSpeedSlider.value;
        if (effectData) effectData.warpspeed = parseInt(warpSpeedSlider.value, 10);
    });
    brightnessWarpSlider.addEventListener("input", () => {
        brightnessWarpValue.textContent = brightnessWarpSlider.value;
        if (effectData) effectData.warpbrightness = parseInt(brightnessWarpSlider.value, 10);
    });
    warpAngleStepSlider.addEventListener("input", () => {
        warpAngleStepValue.textContent = warpAngleStepSlider.value;
        if (effectData) effectData.warpanglestep = parseInt(warpAngleStepSlider.value, 10);
    });
    warpColorStepSlider.addEventListener("input", () => {
        warpColorStepValue.textContent = warpColorStepSlider.value;
        if (effectData) effectData.warpcolorstep = parseInt(warpColorStepSlider.value, 10);
    });
    warpDirectionSlider.addEventListener("change", () => {
        const dir = warpDirectionSlider.checked ? 1 : -1;
        if (effectData) effectData.warpdirection = dir;
    });
    warpMode.addEventListener("change", () => {
        if (effectData) effectData.warpmode = parseInt(warpMode.value, 10);
    });

    fwCountSlider.addEventListener("input", () => {
        fwCountValue.textContent = fwCountSlider.value;
        if (effectData) effectData.fwcount = parseInt(fwCountSlider.value, 10);
    });
    fwSpeedSlider.addEventListener("input", () => {
        fwSpeedValue.textContent = fwSpeedSlider.value;
        if (effectData) effectData.fwspeed = parseInt(fwSpeedSlider.value, 10);
    });
    fwFadeSpeedSlider.addEventListener("input", () => {
        fwFadeSpeedValue.textContent = fwFadeSpeedSlider.value;
        if (effectData) effectData.fwfadespeed = parseInt(fwFadeSpeedSlider.value, 10);
    });
    fwTwinkleSlider.addEventListener("input", () => {
        fwTwinkleValue.textContent = fwTwinkleSlider.value;
        if (effectData) effectData.fwtwinkle = parseInt(fwTwinkleSlider.value, 10);
    });
    fwCometSlider.addEventListener("input", () => {
        fwCometValue.textContent = fwCometSlider.value;
        if (effectData) effectData.fwcomet = parseInt(fwCometSlider.value, 10);
    });
    fwBurstSlider.addEventListener("input", () => {
        fwBurstValue.textContent = fwBurstSlider.value;
        if (effectData) effectData.fwburst = parseInt(fwBurstSlider.value, 10);
    });

    auPalette.addEventListener("change", () => {
        if (effectData) effectData.aupalette = auPalette.value;
    });
    auTimeSlider.addEventListener("input", () => {
        auTimeValue.textContent = auTimeSlider.value;
        if (effectData) effectData.autime = parseInt(auTimeSlider.value, 10);
    });
    auSpeedSlider.addEventListener("input", () => {
        auSpeedValue.textContent = auSpeedSlider.value;
        if (effectData) effectData.auspeed = parseInt(auSpeedSlider.value, 10);
    });
    auScaleSlider.addEventListener("input", () => {
        auScaleValue.textContent = auScaleSlider.value;
        if (effectData) effectData.auscale = parseInt(auScaleSlider.value, 10);
    });
    auYoffsetSlider.addEventListener("input", () => {
        auYoffsetValue.textContent = auYoffsetSlider.value;
        if (effectData) effectData.auyoffset = parseInt(auYoffsetSlider.value, 10);
    });
    brightnessAuSlider.addEventListener("input", () => {
        brightnessAuValue.textContent = brightnessAuSlider.value;
        if (effectData) effectData.aubrightness = parseInt(brightnessAuSlider.value, 10);
    });

    confDensitySlider.addEventListener("input", () => {
        confDensityValue.textContent = confDensitySlider.value;
        if (effectData) effectData.confdensity = parseInt(confDensitySlider.value, 10);
    });
    confSpeedSlider.addEventListener("input", () => {
        confSpeedValue.textContent = confSpeedSlider.value;
        if (effectData) effectData.confspeed = parseInt(confSpeedSlider.value, 10);
    });
    confFadeSlider.addEventListener("input", () => {
        confFadeValue.textContent = confFadeSlider.value;
        if (effectData) effectData.conffade = parseInt(confFadeSlider.value, 10);
    });
    confSatSlider.addEventListener("input", () => {
        confSatValue.textContent = confSatSlider.value;
        if (effectData) effectData.confsat = parseInt(confSatSlider.value, 10);
    });
    brightnessConfSlider.addEventListener("input", () => {
        brightnessConfValue.textContent = brightnessConfSlider.value;
        if (effectData) effectData.confbrightness = parseInt(brightnessConfSlider.value, 10);
    });
    // Snake slider updates
    snakeLengthModeSlider.addEventListener("input", () => {
        snakeLengthModeValue.textContent = snakeLengthModeSlider.value;
        if (effectData) effectData.snakelengthmode = parseInt(snakeLengthModeSlider.value, 10);
    });

    brightnessSnakeSlider.addEventListener("input", () => {
        brightnessSnakeValue.textContent = brightnessSnakeSlider.value;
        if (effectData) effectData.snakebrightness = parseInt(brightnessSnakeSlider.value, 10);
    });

    snakeTargetsSlider.addEventListener("input", () => {
        snakeTargetsValue.textContent = snakeTargetsSlider.value;
        if (effectData) effectData.snaketargetcount = parseInt(snakeTargetsSlider.value, 10);
});

    // Effect selectie
    effectSelect.addEventListener("change", function () {
        const effect = this.value;
        wordclockControls.style.display = effect === "WORDCLOCK" ? "flex" : "none";
        scrollOptions.style.display = effect === "SCROLLMESSAGE" ? "flex" : "none";
        rainbowControls.style.display = effect === "RAINBOW" ? "flex" : "none";
        matrixControls.style.display = effect === "MATRIX_RAIN" ? "flex" : "none";
        fireControls.style.display = effect === "FIRE" ? "flex" : "none";
        wavesControls.style.display = effect === "WAVES" ? "flex" : "none";
        plasmaControls.style.display = effect === "PLASMA" ? "flex" : "none";
        snowControls.style.display = effect === "SNOW" ? "flex" : "none";
        starsControls.style.display = effect === "STARS" ? "flex" : "none";
        warpControls.style.display = effect === "WARP" ? "flex" : "none";
        fwControls.style.display = effect === "FIREWORK" ? "flex" : "none";
        auControls.style.display = effect === "AURORA" ? "flex" : "none";
        confControls.style.display = effect === "CONFETTI" ? "flex" : "none";
        snakeControls.style.display = effect === "SNAKE" ? "flex" : "none";

        // Waarden uit effectData zetten
        if (effectData) {
            if (effect === "WORDCLOCK") { 
                HETISynSlider.checked = (effectData.hetisyn === 1);
            }
            if (effect === "SCROLLMESSAGE") {
                scrollText.value = effectData.scrtext;
                scrollDuration.value = effectData.scrduration;
                scrollSpeedSlider.value = effectData.scrspeed;
                scrollSpeedValue.textContent = scrollSpeedSlider.value;
            }
            if (effect === "RAINBOW") {
                rainbowSpeedSlider.value = effectData.rnbspeed;
                rainbowSpeedValue.textContent = rainbowSpeedSlider.value;
                brightnessRainbowSlider.value = effectData.rnbbrightness;
                brightnessRainbowValue.textContent = brightnessRainbowSlider.value;
            }
            if (effect === "MATRIX_RAIN") {
                matrixSpeedSlider.value = effectData.mtrxspeed;
                matrixSpeedValue.textContent = matrixSpeedSlider.value;
                brightnessMatrixSlider.value = effectData.mtrxbrightness;
                brightnessMatrixValue.textContent = brightnessMatrixSlider.value;
                matrixTrail.textContent = effectData.mtrxtrail;
            }
            if (effect === "FIRE") {
                fireSpeedSlider.value = effectData.firespeed;
                fireSpeedValue.textContent = fireSpeedSlider.value;
                fireIntensitySlider.value = effectData.fireintensity;
                fireIntensityValue.textContent = fireIntensitySlider.value;
                brightnessFireSlider.value = effectData.firebrightness;
                brightnessFireValue.textContent = brightnessFireSlider.value;
            }
            if (effect === "WAVES") {
                wavePalette.value = effectData.wavepalette;
                waveSpeedSlider.value = effectData.wavespeed;
                waveSpeedValue.textContent = waveSpeedSlider.value;
                waveScrollSlider.value = effectData.wavescroll;
                waveScrollValue.textContent = waveScrollSlider.value;
                waveColorSpeedSlider.value = effectData.wavecolorspeed;
                waveColorSpeedValue.textContent = waveColorSpeedSlider.value;
                brightnessWaveSlider.value = effectData.wavebrightness;
                brightnessWaveValue.textContent = brightnessWaveSlider.value;
            }
            if (effect === "PLASMA") {
                plasmaPalette.value = effectData.plasmapalette;
                plasmaSpeedSlider.value = effectData.plasmaspeed;
                plasmaSpeedValue.textContent = plasmaSpeedSlider.value;
                plasmaScaleSlider.value = effectData.plasmascale;
                plasmaScaleValue.textContent = plasmaScaleSlider.value;
                brightnessPlasmaSlider.value = effectData.plasmabrightness;
                brightnessPlasmaValue.textContent = brightnessPlasmaSlider.value;
            }
            if (effect === "SNOW") {
                snowSpeedSlider.value = effectData.snowspeed;
                snowSpeedValue.textContent = snowSpeedSlider.value;
                snowCountSlider.value = effectData.snowcount;
                snowCountValue.textContent = snowCountSlider.value;
                snowWindSlider.value = effectData.snowwind;
                snowWindValue.textContent = snowWindSlider.value;
                brightnessSnowSlider.value = effectData.snowbrightness;
                brightnessSnowValue.textContent = brightnessSnowSlider.value;
            }
            if (effect === "STARS") {
                starsCountSlider.value = effectData.starscount;
                starsCountValue.textContent = starsCountSlider.value;
                starsDimTimeSlider.value = effectData.starsdimtime;
                starsDimTimeValue.textContent = starsDimTimeSlider.value;
                starsAppSpeedSlider.value = effectData.starsappspeed;
                starsAppSpeedValue.textContent = starsAppSpeedSlider.value;
                starsColorModeSlider.value = effectData.starscolormode;
                starsColorModeValue.textContent = starsColorModeSlider.value;
                brightnessStarsSlider.value = effectData.starsbrightness;
                brightnessStarsValue.textContent = brightnessStarsSlider.value;
            }
            if (effect === "WARP") {
                warpPalette.value = effectData.warppalette;
                warpSpeedSlider.value = effectData.warpspeed;
                warpSpeedValue.textContent = warpSpeedSlider.value;
                brightnessWarpSlider.value = effectData.warpbrightness;
                brightnessWarpValue.textContent = brightnessWarpSlider.value;
                warpAngleStepSlider.value = effectData.warpanglestep;
                warpAngleStepValue.textContent = warpAngleStepSlider.value;
                warpColorStepSlider.value = effectData.warpcolorstep;
                warpColorStepValue.textContent = warpColorStepSlider.value;
                warpDirectionSlider.checked = (effectData.warpdirection === 1);
                warpMode.value = effectData.warpmode;
            }
            if (effect === "FIREWORK") {
                fwCountSlider.value = effectData.fwcount;
                fwCountValue.textContent = fwCountSlider.value;
                fwSpeedSlider.value = effectData.fwspeed;
                fwSpeedValue.textContent = fwSpeedSlider.value;
                fwFadeSpeedSlider.value = effectData.fwfadespeed;
                fwFadeSpeedValue.textContent = fwFadeSpeedSlider.value;
                fwTwinkleSlider.value = effectData.fwtwinkle;
                fwTwinkleValue.textContent = fwTwinkleSlider.value;
                fwCometSlider.value = effectData.fwcomet;
                fwCometValue.textContent = fwCometSlider.value;
                fwBurstSlider.value = effectData.fwburst;
                fwBurstValue.textContent = fwBurstSlider.value;
            }
            if (effect === "AURORA") {
                auPalette.value = effectData.aupalette;
                auTimeSlider.value = effectData.autime;
                auTimeValue.textContent = auTimeSlider.value;
                auSpeedSlider.value = effectData.auspeed;
                auSpeedValue.textContent = auSpeedSlider.value;     
                auScaleSlider.value = effectData.auscale;
                auScaleValue.textContent = auScaleSlider.value;
                auYoffsetSlider.value = effectData.auyoffset;
                auYoffsetValue.textContent = auYoffsetSlider.value;
                brightnessAuSlider.value = effectData.aubrightness;
                brightnessAuValue.textContent = brightnessAuSlider.value;
            }
            if (effect === "CONFETTI") {
                confDensitySlider.value = effectData.confdensity;
                confDensityValue.textContent = confDensitySlider.value;
                confSpeedSlider.value = effectData.confspeed;
                confSpeedValue.textContent = confSpeedSlider.value;
                confFadeSlider.value = effectData.conffade;
                confFadeValue.textContent = confFadeSlider.value;
                confSatSlider.value = effectData.confsat;
                confSatValue.textContent = confSatSlider.value;
                brightnessConfSlider.value = effectData.confbrightness;
                brightnessConfValue.textContent = brightnessConfSlider.value;
            }
            if (effect === "SNAKE") {
                snakeLengthModeSlider.value = effectData.snakelengthmode;
                snakeLengthModeValue.textContent = snakeLengthModeSlider.value;
                brightnessSnakeSlider.value = effectData.snakebrightness;
                brightnessSnakeValue.textContent = brightnessSnakeSlider.value;
                snakeTargetsSlider.value = effectData.snaketargetcount;
                snakeTargetsValue.textContent = snakeTargetsSlider.value;
            }
        }
        // Debug: toon hele object in console
        // console.log("EffectData na change:", effectData);
        console.table(effectData);
    });

    // Startknop
    startButton.addEventListener("click", function () {
        const effect = effectSelect.value;
        let url = `/seteffect?effect=${effect}`;

        if (effect === "WORDCLOCK") {
            const yn = HETISynSlider.checked ? 1 : -1;
            url += `&hetisyn=${yn}`
        }
        if (effect === "SCROLLMESSAGE") {
            url += `&scrtext=${encodeURIComponent(scrollText.value)}&scrduration=${scrollDuration.value}&scrspeed=${scrollSpeedSlider.value}`;
        }
        if (effect === "RAINBOW") {
            url += `&rnbspeed=${rainbowSpeedSlider.value}&rnbbrightness=${brightnessRainbowSlider.value}`;
        }
        if (effect === "MATRIX_RAIN") {
            url += `&mtrxbrightness=${brightnessMatrixSlider.value}&mtrxspeed=${matrixSpeedSlider.value}&mtrxtrail=${matrixTrail.value}`;
        }
        if (effect === "FIRE") {
            url += `&firespeed=${fireSpeedSlider.value}&fireintensity=${fireIntensitySlider.value}&firebrightness=${brightnessFireSlider.value}`;
        }
        if (effect === "WAVES") {
            url += `&wavepalette=${wavePalette.value}&wavespeed=${waveSpeedSlider.value}&wavescroll=${waveScrollSlider.value}&waveColorSpeed=${waveColorSpeedSlider.value}&wavebrightness=${brightnessWaveSlider.value}`;
        }
        if (effect === "PLASMA") {
            url += `&plasmapalette=${plasmaPalette.value}&plasmaspeed=${plasmaSpeedSlider.value}&plasmascale=${plasmaScaleSlider.value}&plasmabrightness=${brightnessPlasmaSlider.value}`;
        }
        if (effect === "SNOW") {
            url += `&snowspeed=${snowSpeedSlider.value}&snowcount=${snowCountSlider.value}&snowwind=${snowWindSlider.value}&snowbrightness=${brightnessSnowSlider.value}`;
        }
        if (effect === "STARS") {
            url += `&starscount=${starsCountSlider.value}&starsdimtime=${starsDimTimeSlider.value}&starsappspeed=${starsAppSpeedSlider.value}&starscolormode=${starsColorModeSlider.value}&starsbrightness=${brightnessStarsSlider.value}`;
        }
        if (effect === "WARP") {
            const dir = warpDirectionSlider.checked ? 1 : -1;
            
            url += `&warppalette=${warpPalette.value}`
                + `&warpspeed=${warpSpeedSlider.value}`
                + `&warpbrightness=${brightnessWarpSlider.value}`
                + `&warpanglestep=${warpAngleStepSlider.value}`
                + `&warpcolorstep=${warpColorStepSlider.value}`
                + `&warpdirection=${dir}`
                + `&warpmode=${warpMode.value}`;
        }
        if (effect === "FIREWORK") {
            url += `&fwcount=${fwCountSlider.value}`
                + `&fwspeed=${fwSpeedSlider.value}`
                + `&fwfadespeed=${fwFadeSpeedSlider.value}`
                + `&fwtwinkle=${fwTwinkleSlider.value}`
                + `&fwcomet=${fwCometSlider.value}`
                + `&fwburst=${fwBurstSlider.value}`;
        }
        if (effect === "AURORA") {
            url += `&aupalette=${auPalette.value}`
                + `&autime=${auTimeSlider.value}`
                + `&auspeed=${auSpeedSlider.value}`
                + `&auscale=${auScaleSlider.value}`
                + `&auyoffset=${auYoffsetSlider.value}`
                + `&aubrightness=${brightnessAuSlider.value}`;
        }  
        if (effect === "CONFETTI") {
            url += `&confdensity=${confDensitySlider.value}`
                + `&confspeed=${confSpeedSlider.value}`
                + `&conffade=${confFadeSlider.value}`
                + `&confsat=${confSatSlider.value}`
                + `&confbrightness=${brightnessConfSlider.value}`;
        }
        if (effect === "SNAKE") {
            url += `&snakelengthMode=${snakeLengthModeSlider.value}`
                + `&snakeBrightness=${brightnessSnakeSlider.value}`
                + `&snakeTargetCount=${snakeTargetsSlider.value}`;
        }

        fetch(url)
            .then(res => { if (!res.ok) console.error("Effect verzenden mislukt"); })
            .catch(err => console.error("Netwerkfout bij effect:", err));
    });
});
// Vul de selects met opties uit het template
    function fillPaletteSelect(selectElement) {
        paletteOptions.forEach(opt => {
            const option = document.createElement("option");
            option.value = opt.value;
            option.textContent = opt.label;
            selectElement.appendChild(option);
        });
    }
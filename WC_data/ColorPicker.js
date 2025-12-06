document.addEventListener("DOMContentLoaded", function () {
    // ===========================
    // Globals and helpers
    // ===========================
    let wsEffect;
    let effectData = null;

    function wsSendText(text) {
        if (wsEffect && wsEffect.readyState === WebSocket.OPEN) {
            wsEffect.send(text);
        } else {
            console.warn("WebSocket not connected, cannot send:", text);
        }
    }

    function wsSendJSON(payload) {
        if (wsEffect && wsEffect.readyState === WebSocket.OPEN) {
            wsEffect.send(JSON.stringify(payload));
        } else {
            console.error("WebSocket not connected, cannot send JSON:", payload);
        }
    }

    // ===========================
    // DOM elements
    // ===========================
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

    const snakeControls = document.getElementById("snakeControls");
    const snakeLengthModeSlider = document.getElementById("snake-lengthmode");
    const snakeLengthModeValue = document.getElementById("snake-lengthmode-value");
    const brightnessSnakeSlider = document.getElementById("brightness-snake");
    const brightnessSnakeValue = document.getElementById("brightness-snake-value");
    const snakeTargetsSlider = document.getElementById("snake-targets");
    const snakeTargetsValue = document.getElementById("snake-targets-value");

    const effectSelect = document.getElementById("effect");
    const startButton = document.getElementById("start-effect");

    // ===========================
    // Palettes
    // ===========================
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
        { value: "vintage_57", label: "vintage_57" },
    ];

    function fillPaletteSelect(selectElement) {
        paletteOptions.forEach((opt) => {
            const option = document.createElement("option");
            option.value = opt.value;
            option.textContent = opt.label;
            selectElement.appendChild(option);
        });
    }

    fillPaletteSelect(wavePalette);
    fillPaletteSelect(plasmaPalette);
    fillPaletteSelect(warpPalette);
    fillPaletteSelect(auPalette);

    // ===========================
    // Wrapper activator
    // ===========================
    function toggleControls(effect) {
        const wordclockControls = document.getElementById("wordclockControls");
        if (wordclockControls) wordclockControls.style.display = effect === "WORDCLOCK" ? "flex" : "none";
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
    }

    // ===========================
    // Slider helper
    // ===========================
    function attachSlider(slider, valueEl, key) {
        slider.addEventListener("input", () => {
            valueEl.textContent = slider.value;
            if (effectData) effectData[key] = parseInt(slider.value, 10);
            wsSendText(`${key}:${slider.value}`);
        });
    }

    // ===========================
    // Event bindings (voorbeeld)
    // ===========================
    window.sendSnakeCmd = function (cmd) {
        wsSendText(`${cmd}:1`);
    };

    HETISynSlider.addEventListener("change", () => {
        const yn = HETISynSlider.checked ? 1 : -1;
        if (effectData) effectData.hetisyn = yn;
        wsSendText(`hetisyn:${yn}`);
    });

    // Alleen wanneer op start gedrukt wordt en niet bij iedere letter.
    //scrollText.addEventListener("input", () => {
    //    if (effectData) effectData.scrtext = scrollText.value;
    //    wsSendText(`scrtext:${encodeURIComponent(scrollText.value)}`);
    //});
    scrollDuration.addEventListener("input", () => {
        const v = parseInt(scrollDuration.value, 10);
        if (effectData) effectData.scrduration = v;
        wsSendText(`scrduration:${v}`);
    });
    attachSlider(scrollSpeedSlider, scrollSpeedValue, "scrspeed");

    attachSlider(rainbowSpeedSlider, rainbowSpeedValue, "rnbspeed");
    attachSlider(brightnessRainbowSlider, brightnessRainbowValue, "rnbbright");

    attachSlider(matrixSpeedSlider, matrixSpeedValue, "mtrxspeed");
    attachSlider(brightnessMatrixSlider, brightnessMatrixValue, "mtrxbright");
    matrixTrail.addEventListener("input", () => {
        const v = parseInt(matrixTrail.value, 10);
        if (effectData) effectData.mtrxtrail = v;
        wsSendText(`mtrxtrail:${v}`);
    });

    attachSlider(fireSpeedSlider, fireSpeedValue, "firespeed");
    attachSlider(fireIntensitySlider, fireIntensityValue, "fireintensity");
    attachSlider(brightnessFireSlider, brightnessFireValue, "firebright");
    ``    // WAVES
    wavePalette.addEventListener("change", () => {
        if (effectData) effectData.wavepalette = wavePalette.value;
        wsSendText(`wavepalette:${wavePalette.value}`);
    });
    attachSlider(waveSpeedSlider, waveSpeedValue, "wavespeed");
    attachSlider(waveScrollSlider, waveScrollValue, "wavescroll");
    attachSlider(waveColorSpeedSlider, waveColorSpeedValue, "wavecolorspeed");
    attachSlider(brightnessWaveSlider, brightnessWaveValue, "wavebright");

    // PLASMA
    plasmaPalette.addEventListener("change", () => {
        if (effectData) effectData.plasmapalette = plasmaPalette.value;
        wsSendText(`plasmapalette:${plasmaPalette.value}`);
    });
    attachSlider(plasmaSpeedSlider, plasmaSpeedValue, "plasmaspeed");
    attachSlider(plasmaScaleSlider, plasmaScaleValue, "plasmascale");
    attachSlider(brightnessPlasmaSlider, brightnessPlasmaValue, "plasmabright");

    // SNOW
    attachSlider(snowSpeedSlider, snowSpeedValue, "snowspeed");
    attachSlider(snowCountSlider, snowCountValue, "snowcount");
    attachSlider(snowWindSlider, snowWindValue, "snowwind");
    attachSlider(brightnessSnowSlider, brightnessSnowValue, "snowbright");

    // STARS
    attachSlider(starsCountSlider, starsCountValue, "starscount");
    attachSlider(starsDimTimeSlider, starsDimTimeValue, "starsdimtime");
    attachSlider(starsAppSpeedSlider, starsAppSpeedValue, "starsappspeed");
    attachSlider(starsColorModeSlider, starsColorModeValue, "starscolormode");
    attachSlider(brightnessStarsSlider, brightnessStarsValue, "starsbright");

    // WARP
    warpPalette.addEventListener("change", () => {
        if (effectData) effectData.warppalette = warpPalette.value;
        wsSendText(`warppalette:${warpPalette.value}`);
    });
    attachSlider(warpSpeedSlider, warpSpeedValue, "warpspeed");
    attachSlider(brightnessWarpSlider, brightnessWarpValue, "warpbright");
    attachSlider(warpAngleStepSlider, warpAngleStepValue, "warpanglestep");
    attachSlider(warpColorStepSlider, warpColorStepValue, "warpcolorstep");
    warpDirectionSlider.addEventListener("change", () => {
        const dir = warpDirectionSlider.checked ? 1 : -1;
        if (effectData) effectData.warpdir = dir;
        wsSendText(`warpdir:${dir}`);
    });
    warpMode.addEventListener("change", () => {
        const v = parseInt(warpMode.value, 10);
        if (effectData) effectData.warpmode = v;
        wsSendText(`warpmode:${v}`);
    });

    // FIREWORK
    attachSlider(fwCountSlider, fwCountValue, "fwcount");
    attachSlider(fwSpeedSlider, fwSpeedValue, "fwspeed");
    attachSlider(fwFadeSpeedSlider, fwFadeSpeedValue, "fwfadespeed");
    attachSlider(fwTwinkleSlider, fwTwinkleValue, "fwtwinkle");
    attachSlider(fwCometSlider, fwCometValue, "fwcomet");
    attachSlider(fwBurstSlider, fwBurstValue, "fwburst");

    // AURORA
    auPalette.addEventListener("change", () => {
        if (effectData) effectData.aupalette = auPalette.value;
        wsSendText(`aupalette:${auPalette.value}`);
    });
    attachSlider(auTimeSlider, auTimeValue, "autime");
    attachSlider(auSpeedSlider, auSpeedValue, "auspeed");
    attachSlider(auScaleSlider, auScaleValue, "auscale");
    attachSlider(auYoffsetSlider, auYoffsetValue, "auyoffset");
    attachSlider(brightnessAuSlider, brightnessAuValue, "aubright");

    // CONFETTI
    attachSlider(confDensitySlider, confDensityValue, "confdensity");
    attachSlider(confSpeedSlider, confSpeedValue, "confspeed");
    attachSlider(confFadeSlider, confFadeValue, "conffade");
    attachSlider(confSatSlider, confSatValue, "confsat");
    attachSlider(brightnessConfSlider, brightnessConfValue, "confbright");

    // SNAKE
    attachSlider(snakeLengthModeSlider, snakeLengthModeValue, "snlengthmode");
    attachSlider(brightnessSnakeSlider, brightnessSnakeValue, "snbrightness");
    attachSlider(snakeTargetsSlider, snakeTargetsValue, "sntargetcount");

    // ===========================
    // Effect selection and toggling
    // ===========================
    effectSelect.addEventListener("change", function () {
        const effect = this.value;
        toggleControls(effect);
        wsSendText(`effect:${effect}`);
        // forceer lokaal dat effectData.effect verandert
        if (effectData) {
            effectData.effect = effect;
            syncUIFromEffectData();
        }
    });

    // ===========================
    // UI sync helper from effectData
    // ===========================
    function syncUIFromEffectData() {
        if (!effectData) return;

        // dropdown zetten en wrappers tonen
        effectSelect.value = effectData.effect;
        const effect = effectData.effect;
        toggleControls(effect);

        // WORDCLOCK
        if (effect === "WORDCLOCK") {
            HETISynSlider.checked = (effectData.hetisyn === 1);
        }

        // SCROLLMESSAGE
        if (effect === "SCROLLMESSAGE") {
            scrollText.value = effectData.scrtext || "";
            scrollDuration.value = effectData.scrduration;
            scrollSpeedSlider.value = effectData.scrspeed;
            scrollSpeedValue.textContent = scrollSpeedSlider.value;
        }

        // RAINBOW
        if (effect === "RAINBOW") {
            rainbowSpeedSlider.value = effectData.rnbspeed;
            rainbowSpeedValue.textContent = rainbowSpeedSlider.value;
            brightnessRainbowSlider.value = effectData.rnbbright;
            brightnessRainbowValue.textContent = brightnessRainbowSlider.value;
        }

        // MATRIX_RAIN
        if (effect === "MATRIX_RAIN") {
            matrixSpeedSlider.value = effectData.mtrxspeed;
            matrixSpeedValue.textContent = matrixSpeedSlider.value;
            brightnessMatrixSlider.value = effectData.mtrxbright;
            brightnessMatrixValue.textContent = brightnessMatrixSlider.value;
            matrixTrail.value = effectData.mtrxtrail;
        }

        // FIRE
        if (effect === "FIRE") {
            fireSpeedSlider.value = effectData.firespeed;
            fireSpeedValue.textContent = fireSpeedSlider.value;
            fireIntensitySlider.value = effectData.fireintensity;
            fireIntensityValue.textContent = fireIntensitySlider.value;
            brightnessFireSlider.value = effectData.firebright;
            brightnessFireValue.textContent = brightnessFireSlider.value;
        }

        // WAVES
        if (effect === "WAVES") {
            wavePalette.value = effectData.wavepalette;
            waveSpeedSlider.value = effectData.wavespeed;
            waveSpeedValue.textContent = waveSpeedSlider.value;
            waveScrollSlider.value = effectData.wavescroll;
            waveScrollValue.textContent = waveScrollSlider.value;
            waveColorSpeedSlider.value = effectData.wavecolorspeed;
            waveColorSpeedValue.textContent = waveColorSpeedSlider.value;
            brightnessWaveSlider.value = effectData.wavebright;
            brightnessWaveValue.textContent = brightnessWaveSlider.value;
        }

        // PLASMA
        if (effect === "PLASMA") {
            plasmaPalette.value = effectData.plasmapalette;
            plasmaSpeedSlider.value = effectData.plasmaspeed;
            plasmaSpeedValue.textContent = plasmaSpeedSlider.value;
            plasmaScaleSlider.value = effectData.plasmascale;
            plasmaScaleValue.textContent = plasmaScaleSlider.value;
            brightnessPlasmaSlider.value = effectData.plasmabright;
            brightnessPlasmaValue.textContent = brightnessPlasmaSlider.value;
        }

        // SNOW
        if (effect === "SNOW") {
            snowSpeedSlider.value = effectData.snowspeed;
            snowSpeedValue.textContent = snowSpeedSlider.value;
            snowCountSlider.value = effectData.snowcount;
            snowCountValue.textContent = snowCountSlider.value;
            snowWindSlider.value = effectData.snowwind;
            snowWindValue.textContent = snowWindSlider.value;
            brightnessSnowSlider.value = effectData.snowbright;
            brightnessSnowValue.textContent = brightnessSnowSlider.value;
        }

        // STARS
        if (effect === "STARS") {
            starsCountSlider.value = effectData.starscount;
            starsCountValue.textContent = starsCountSlider.value;
            starsDimTimeSlider.value = effectData.starsdimtime;
            starsDimTimeValue.textContent = starsDimTimeSlider.value;
            starsAppSpeedSlider.value = effectData.starsappspeed;
            starsAppSpeedValue.textContent = starsAppSpeedSlider.value;
            starsColorModeSlider.value = effectData.starscolormode;
            starsColorModeValue.textContent = starsColorModeSlider.value;
            brightnessStarsSlider.value = effectData.starsbright;
            brightnessStarsValue.textContent = brightnessStarsSlider.value;
        }

        // WARP
        if (effect === "WARP") {
            warpPalette.value = effectData.warppalette;
            warpSpeedSlider.value = effectData.warpspeed;
            warpSpeedValue.textContent = warpSpeedSlider.value;
            brightnessWarpSlider.value = effectData.warpbright;
            brightnessWarpValue.textContent = brightnessWarpSlider.value;
            warpAngleStepSlider.value = effectData.warpanglestep;
            warpAngleStepValue.textContent = warpAngleStepSlider.value;
            warpColorStepSlider.value = effectData.warpcolorstep;
            warpColorStepValue.textContent = warpColorStepSlider.value;
            warpDirectionSlider.checked = (effectData.warpdir === 1);
            warpMode.value = effectData.warpmode;
        }

        // FIREWORK
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

        // AURORA
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
            brightnessAuSlider.value = effectData.aubright;
            brightnessAuValue.textContent = brightnessAuSlider.value;
        }

        // CONFETTI
        if (effect === "CONFETTI") {
            confDensitySlider.value = effectData.confdensity;
            confDensityValue.textContent = confDensitySlider.value;
            confSpeedSlider.value = effectData.confspeed;
            confSpeedValue.textContent = confSpeedSlider.value;
            confFadeSlider.value = effectData.conffade;
            confFadeValue.textContent = confFadeSlider.value;
            confSatSlider.value = effectData.confsat;
            confSatValue.textContent = confSatSlider.value;
            brightnessConfSlider.value = effectData.confbright;
            brightnessConfValue.textContent = brightnessConfSlider.value;
        }

        // SNAKE
        if (effect === "SNAKE") {
            snakeLengthModeSlider.value = effectData.snlengthmode;
            snakeLengthModeValue.textContent = snakeLengthModeSlider.value;
            brightnessSnakeSlider.value = effectData.snbrightness;
            brightnessSnakeValue.textContent = brightnessSnakeSlider.value;
            snakeTargetsSlider.value = effectData.sntargetcount;
            snakeTargetsValue.textContent = snakeTargetsSlider.value;
        }
    }


    // ===========================
    // Start button → send JSON payload
    // ===========================
    startButton.addEventListener("click", function () {
        const effect = effectSelect.value;
        const payload = { effect };

        if (effect === "WORDCLOCK") {
            payload.hetisyn = HETISynSlider.checked ? 1 : -1;
        }
        if (effect === "SCROLLMESSAGE") {
            payload.scrtext = scrollText.value;
            payload.scrduration = parseInt(scrollDuration.value, 10);
            payload.scrspeed = parseInt(scrollSpeedSlider.value, 10);
        }
        if (effect === "RAINBOW") {
            payload.rnbspeed = parseInt(rainbowSpeedSlider.value, 10);
            payload.rnbbright = parseInt(brightnessRainbowSlider.value, 10);
        }
        if (effect === "MATRIX_RAIN") {
            payload.mtrxspeed = parseInt(matrixSpeedSlider.value, 10);
            payload.mtrxbright = parseInt(brightnessMatrixSlider.value, 10);
            payload.mtrxtrail = parseInt(matrixTrail.value, 10);
        }
        if (effect === "FIRE") {
            payload.firespeed = parseInt(fireSpeedSlider.value, 10);
            payload.fireintensity = parseInt(fireIntensitySlider.value, 10);
            payload.firebright = parseInt(brightnessFireSlider.value, 10);
        }
        if (effect === "WAVES") {
            payload.wavepalette = wavePalette.value;
            payload.wavespeed = parseInt(waveSpeedSlider.value, 10);
            payload.wavescroll = parseInt(waveScrollSlider.value, 10);
            payload.wavecolorspeed = parseInt(waveColorSpeedSlider.value, 10);
            payload.wavebright = parseInt(brightnessWaveSlider.value, 10);
        }
        if (effect === "PLASMA") {
            payload.plasmapalette = plasmaPalette.value;
            payload.plasmaspeed = parseInt(plasmaSpeedSlider.value, 10);
            payload.plasmascale = parseInt(plasmaScaleSlider.value, 10);
            payload.plasmabright = parseInt(brightnessPlasmaSlider.value, 10);
        }
        if (effect === "SNOW") {
            payload.snowspeed = parseInt(snowSpeedSlider.value, 10);
            payload.snowcount = parseInt(snowCountSlider.value, 10);
            payload.snowwind = parseInt(snowWindSlider.value, 10);
            payload.snowbright = parseInt(brightnessSnowSlider.value, 10);
        }
        if (effect === "STARS") {
            payload.starscount = parseInt(starsCountSlider.value, 10);
            payload.starsdimtime = parseInt(starsDimTimeSlider.value, 10);
            payload.starsappspeed = parseInt(starsAppSpeedSlider.value, 10);
            payload.starscolormode = parseInt(starsColorModeSlider.value, 10);
            payload.starsbright = parseInt(brightnessStarsSlider.value, 10);
        }
        if (effect === "WARP") {
            payload.warppalette = warpPalette.value;
            payload.warpspeed = parseInt(warpSpeedSlider.value, 10);
            payload.warpbright = parseInt(brightnessWarpSlider.value, 10);
            payload.warpanglestep = parseInt(warpAngleStepSlider.value, 10);
            payload.warpcolorstep = parseInt(warpColorStepSlider.value, 10);
            payload.warpdir = warpDirectionSlider.checked ? 1 : -1;
            payload.warpmode = parseInt(warpMode.value, 10);
        }
        if (effect === "FIREWORK") {
            payload.fwcount = parseInt(fwCountSlider.value, 10);
            payload.fwspeed = parseInt(fwSpeedSlider.value, 10);
            payload.fwfadespeed = parseInt(fwFadeSpeedSlider.value, 10);
            payload.fwtwinkle = parseInt(fwTwinkleSlider.value, 10);
            payload.fwcomet = parseInt(fwCometSlider.value, 10);
            payload.fwburst = parseInt(fwBurstSlider.value, 10);
        }
        if (effect === "AURORA") {
            payload.aupalette = auPalette.value;
            payload.autime = parseInt(auTimeSlider.value, 10);
            payload.auspeed = parseInt(auSpeedSlider.value, 10);
            payload.auscale = parseInt(auScaleSlider.value, 10);
            payload.auyoffset = parseInt(auYoffsetSlider.value, 10);
            payload.aubright = parseInt(brightnessAuSlider.value, 10);
        }
        if (effect === "CONFETTI") {
            payload.confdensity = parseInt(confDensitySlider.value, 10);
            payload.confspeed = parseInt(confSpeedSlider.value, 10);
            payload.conffade = parseInt(confFadeSlider.value, 10);
            payload.confsat = parseInt(confSatSlider.value, 10);
            payload.confbright = parseInt(brightnessConfSlider.value, 10);
        }
        if (effect === "SNAKE") {
            payload.snlengthmode = parseInt(snakeLengthModeSlider.value, 10);
            payload.snbrightness = parseInt(brightnessSnakeSlider.value, 10);
            payload.sntargetcount = parseInt(snakeTargetsSlider.value, 10);
        }

        wsSendJSON(payload);
        console.log("Effect payload sent:", payload);
    });

    // ===========================
    // Color picker
    // ===========================
    const MAX_SIZE = 500;
    const size = Math.min(window.innerWidth, window.innerHeight, MAX_SIZE) * 0.8;

    const colorPicker = new iro.ColorPicker("#picker", {
        width: size,
        color: "#ffffff",
        layout: [
            { component: iro.ui.Wheel },
            { component: iro.ui.Slider, options: { sliderType: "value" } },
        ],
    });

    window.addEventListener("resize", () => {
        const newSize = Math.min(window.innerWidth, window.innerHeight, MAX_SIZE) * 0.8;
        colorPicker.resize(newSize);
    });

    colorPicker.on("color:change", function (color) {
        const { r, g, b } = color.rgb;
        document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        wsSendText(`color:${r},${g},${b}`);
    });

    // ===========================
    // WebSocket setup
    // ===========================
    function connectEffect() {
        wsEffect = new WebSocket("ws://" + window.location.host + "/effect");

        wsEffect.onopen = () => {
            console.log("WebSocket connected");
            const scoreEl = document.getElementById("snake-score");
            if (scoreEl) scoreEl.textContent = "Score: 0 (connected)";
            try { wsEffect.send("getstate"); } catch (e) { }
        };

        wsEffect.onclose = () => {
            console.log("WebSocket disconnected");
            const scoreEl = document.getElementById("snake-score");
            if (scoreEl) scoreEl.textContent = "Score: ? (disconnected)";
            setTimeout(connectEffect, 3000);
        };

        wsEffect.onmessage = (event) => {
            const msg = event.data;
            if (typeof msg === "string" && msg.startsWith("score:")) {
                const scoreEl = document.getElementById("snake-score");
                if (scoreEl) scoreEl.textContent = "Score: " + msg.split(":")[1];
                return;
            }
            try {
                const data = JSON.parse(msg);
                effectData = data;
                console.log("Got effectData:", effectData);
                syncUIFromEffectData();
            } catch (e) {
                console.log("Server message:", msg);
            }
        };
    }

    // ===========================
    // Start
    // ===========================
    connectEffect();
});

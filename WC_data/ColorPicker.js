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

    effectSelect.addEventListener("change", function () {
        const effect = this.value;

        // Show/hide controls
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

        // Push effect selection to server
        wsSendText(`effect:${effect}`);

        // Sync UI values from effectData if available
        syncUIFromEffectData();
    });

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
    // UI event bindings
    // ===========================
    window.sendSnakeCmd = function (cmd) {
        wsSendText(cmd);
    };

    // WORDCLOCK
    HETISynSlider.addEventListener("change", () => {
        const yn = HETISynSlider.checked ? 1 : -1;
        if (effectData) effectData.hetisyn = yn;
        wsSendText(`hetisyn:${yn}`);
    });

    // SCROLLMESSAGE
    scrollText.addEventListener("input", () => {
        if (effectData) effectData.scrtext = scrollText.value;
        wsSendText(`scrtext:${encodeURIComponent(scrollText.value)}`);
    });
    scrollDuration.addEventListener("input", () => {
        const v = parseInt(scrollDuration.value, 10);
        if (effectData) effectData.scrduration = v;
        wsSendText(`scrduration:${v}`);
    });
    attachSlider(scrollSpeedSlider, scrollSpeedValue, "scrspeed");

    // RAINBOW (match server keys: rnbspeed, rnbbright)
    attachSlider(rainbowSpeedSlider, rainbowSpeedValue, "rnbspeed");
    attachSlider(brightnessRainbowSlider, brightnessRainbowValue, "rnbbright");

    // MATRIX_RAIN (match server keys: mtrxspeed, mtrxbright, mtrxtrail)
    attachSlider(matrixSpeedSlider, matrixSpeedValue, "mtrxspeed");
    attachSlider(brightnessMatrixSlider, brightnessMatrixValue, "mtrxbright");
    matrixTrail.addEventListener("input", () => {
        const v = parseInt(matrixTrail.value, 10);
        if (effectData) effectData.mtrxtrail = v;
        wsSendText(`mtrxtrail:${v}`);
    });

    // FIRE (match: firespeed, fireintensity, firebright)
    attachSlider(fireSpeedSlider, fireSpeedValue, "firespeed");
    attachSlider(fireIntensitySlider, fireIntensityValue, "fireintensity");
    attachSlider(brightnessFireSlider, brightnessFireValue, "firebright");

    // WAVES (match: wavepalette, wavespeed, wavescroll, wavecolorspeed, wavebright)
    wavePalette.addEventListener("change", () => {
        if (effectData) effectData.wavepalette = wavePalette.value;
        wsSendText(`wavepalette:${wavePalette.value}`);
    });
    attachSlider(waveSpeedSlider, waveSpeedValue, "wavespeed");
    attachSlider(waveScrollSlider, waveScrollValue, "wavescroll");
    attachSlider(waveColorSpeedSlider, waveColorSpeedValue, "wavecolorspeed");
    attachSlider(brightnessWaveSlider, brightnessWaveValue, "wavebright");

    // PLASMA (match: plasmapalette, plasmaspeed, plasmascale, plasmabright)
    plasmaPalette.addEventListener("change", () => {
        if (effectData) effectData.plasmapalette = plasmaPalette.value;
        wsSendText(`plasmapalette:${plasmaPalette.value}`);
    });
    attachSlider(plasmaSpeedSlider, plasmaSpeedValue, "plasmaspeed");
    attachSlider(plasmaScaleSlider, plasmaScaleValue, "plasmascale");
    attachSlider(brightnessPlasmaSlider, brightnessPlasmaValue, "plasmabright");

    // SNOW (match: snowspeed, snowcount, snowwind, snowbright)
    attachSlider(snowSpeedSlider, snowSpeedValue, "snowspeed");
    attachSlider(snowCountSlider, snowCountValue, "snowcount");
    attachSlider(snowWindSlider, snowWindValue, "snowwind");
    attachSlider(brightnessSnowSlider, brightnessSnowValue, "snowbright");

    // STARS (match: starscount, starsdimtime, starsappspeed, starscolormode, starsbright)
    attachSlider(starsCountSlider, starsCountValue, "starscount");
    attachSlider(starsDimTimeSlider, starsDimTimeValue, "starsdimtime");
    attachSlider(starsAppSpeedSlider, starsAppSpeedValue, "starsappspeed");
    attachSlider(starsColorModeSlider, starsColorModeValue, "starscolormode");
    attachSlider(brightnessStarsSlider, brightnessStarsValue, "starsbright");

    // WARP (match: warppalette, warpspeed, warpbright, warpanglestep, warpcolorstep, warpdir, warpmode)
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

    // FIREWORK (match: fwcount, fwspeed, fwfadespeed, fwtwinkle, fwcomet, fwburst)
    attachSlider(fwCountSlider, fwCountValue, "fwcount");
    attachSlider(fwSpeedSlider, fwSpeedValue, "fwspeed");
    attachSlider(fwFadeSpeedSlider, fwFadeSpeedValue, "fwfadespeed");
    attachSlider(fwTwinkleSlider, fwTwinkleValue, "fwtwinkle");
    attachSlider(fwCometSlider, fwCometValue, "fwcomet");
    attachSlider(fwBurstSlider, fwBurstValue, "fwburst");

    // AURORA (match: aupalette, autime, auspeed, auscale, auyoffset, aubright)
    auPalette.addEventListener("change", () => {
        if (effectData) effectData.aupalette = auPalette.value;
        wsSendText(`aupalette:${auPalette.value}`);
    });
    attachSlider(auTimeSlider, auTimeValue, "autime");
    attachSlider(auSpeedSlider, auSpeedValue, "auspeed");
    attachSlider(auScaleSlider, auScaleValue, "auscale");
    attachSlider(auYoffsetSlider, auYoffsetValue, "auyoffset");
    attachSlider(brightnessAuSlider, brightnessAuValue, "aubright");

    // CONFETTI (match: confdensity, confspeed, conffade, confsat, confbright)
    attachSlider(confDensitySlider, confDensityValue, "confdensity");
    attachSlider(confSpeedSlider, confSpeedValue, "confspeed");
    attachSlider(confFadeSlider, confFadeValue, "conffade");
    attachSlider(confSatSlider, confSatValue, "confsat");
    attachSlider(brightnessConfSlider, brightnessConfValue, "confbright");

    // SNAKE (match: snlengthmode, snbrightness, sntargetcount)
    attachSlider(snakeLengthModeSlider, snakeLengthModeValue, "snlengthmode");
    attachSlider(brightnessSnakeSlider, brightnessSnakeValue, "snbrightness");
    attachSlider(snakeTargetsSlider, snakeTargetsValue, "sntargetcount");

    // ===========================
    // UI sync from effectData
    // ===========================
    function syncUIFromEffectData() {
        if (!effectData) return;

        // dropdown
        effectSelect.value = effectData.effect;
        const effect = effectData.effect;

        // trigger de change-event → wrappers tonen
        const evt = new Event("change");
        effectSelect.dispatchEvent(evt);

        if (effect === "WORDCLOCK") {
            HETISynSlider.checked = (effectData.hetisyn === 1);
        }
        if (effect === "SCROLLMESSAGE") {
            scrollText.value = effectData.scrtext ?? scrollText.value;
            scrollDuration.value = effectData.scrduration ?? scrollDuration.value;
            scrollSpeedSlider.value = effectData.scrspeed ?? scrollSpeedSlider.value;
            scrollSpeedValue.textContent = scrollSpeedSlider.value;
        }
        if (effect === "RAINBOW") {
            rainbowSpeedSlider.value = effectData.rnbspeed ?? rainbowSpeedSlider.value;
            rainbowSpeedValue.textContent = rainbowSpeedSlider.value;
            brightnessRainbowSlider.value = effectData.rnbbright ?? brightnessRainbowSlider.value;
            brightnessRainbowValue.textContent = brightnessRainbowSlider.value;
        }
        if (effect === "MATRIX_RAIN") {
            matrixSpeedSlider.value = effectData.mtrxspeed ?? matrixSpeedSlider.value;
            matrixSpeedValue.textContent = matrixSpeedSlider.value;
            brightnessMatrixSlider.value = effectData.mtrxbright ?? brightnessMatrixSlider.value;
            brightnessMatrixValue.textContent = brightnessMatrixSlider.value;
            matrixTrail.value = effectData.mtrxtrail ?? matrixTrail.value;
        }
        if (effect === "FIRE") {
            fireSpeedSlider.value = effectData.firespeed ?? fireSpeedSlider.value;
            fireSpeedValue.textContent = fireSpeedSlider.value;
            fireIntensitySlider.value = effectData.fireintensity ?? fireIntensitySlider.value;
            fireIntensityValue.textContent = fireIntensitySlider.value;
            brightnessFireSlider.value = effectData.firebright ?? brightnessFireSlider.value;
            brightnessFireValue.textContent = brightnessFireSlider.value;
        }
        if (effect === "WAVES") {
            wavePalette.value = effectData.wavepalette ?? wavePalette.value;
            waveSpeedSlider.value = effectData.wavespeed ?? waveSpeedSlider.value;
            waveSpeedValue.textContent = waveSpeedSlider.value;
            waveScrollSlider.value = effectData.wavescroll ?? waveScrollSlider.value;
            waveScrollValue.textContent = waveScrollSlider.value;
            waveColorSpeedSlider.value = effectData.wavecolorspeed ?? waveColorSpeedSlider.value;
            waveColorSpeedValue.textContent = waveColorSpeedSlider.value;
            brightnessWaveSlider.value = effectData.wavebright ?? brightnessWaveSlider.value;
            brightnessWaveValue.textContent = brightnessWaveSlider.value;
        }
        if (effect === "PLASMA") {
            plasmaPalette.value = effectData.plasmapalette ?? plasmaPalette.value;
            plasmaSpeedSlider.value = effectData.plasmaspeed ?? plasmaSpeedSlider.value;
            plasmaSpeedValue.textContent = plasmaSpeedSlider.value;
            plasmaScaleSlider.value = effectData.plasmascale ?? plasmaScaleSlider.value;
            plasmaScaleValue.textContent = plasmaScaleSlider.value;
            brightnessPlasmaSlider.value = effectData.plasmabright ?? brightnessPlasmaSlider.value;
            brightnessPlasmaValue.textContent = brightnessPlasmaSlider.value;
        }
        if (effect === "SNOW") {
            snowSpeedSlider.value = effectData.snowspeed ?? snowSpeedSlider.value;
            snowSpeedValue.textContent = snowSpeedSlider.value;
            snowCountSlider.value = effectData.snowcount ?? snowCountSlider.value;
            snowCountValue.textContent = snowCountSlider.value;
            snowWindSlider.value = effectData.snowwind ?? snowWindSlider.value;
            snowWindValue.textContent = snowWindSlider.value;
            brightnessSnowSlider.value = effectData.snowbright ?? brightnessSnowSlider.value;
            brightnessSnowValue.textContent = brightnessSnowSlider.value;
        }
        if (effect === "STARS") {
            starsCountSlider.value = effectData.starscount ?? starsCountSlider.value;
            starsCountValue.textContent = starsCountSlider.value;
            starsDimTimeSlider.value = effectData.starsdimtime ?? starsDimTimeSlider.value;
            starsDimTimeValue.textContent = starsDimTimeSlider.value;
            starsAppSpeedSlider.value = effectData.starsappspeed ?? starsAppSpeedSlider.value;
            starsAppSpeedValue.textContent = starsAppSpeedSlider.value;
            starsColorModeSlider.value = effectData.starscolormode ?? starsColorModeSlider.value;
            starsColorModeValue.textContent = starsColorModeSlider.value;
            brightnessStarsSlider.value = effectData.starsbright ?? brightnessStarsSlider.value;
            brightnessStarsValue.textContent = brightnessStarsSlider.value;
        }
        if (effect === "WARP") {
            warpPalette.value = effectData.warppalette ?? warpPalette.value;
            warpSpeedSlider.value = effectData.warpspeed ?? warpSpeedSlider.value;
            warpSpeedValue.textContent = warpSpeedSlider.value;
            brightnessWarpSlider.value = effectData.warpbright ?? brightnessWarpSlider.value;
            brightnessWarpValue.textContent = brightnessWarpSlider.value;
            warpAngleStepSlider.value = effectData.warpanglestep ?? warpAngleStepSlider.value;
            warpAngleStepValue.textContent = warpAngleStepSlider.value;
            warpColorStepSlider.value = effectData.warpcolorstep ?? warpColorStepSlider.value;
            warpColorStepValue.textContent = warpColorStepSlider.value;
            warpDirectionSlider.checked = (effectData.warpdir === 1) ?? warpDirectionSlider.checked;
            warpMode.value = effectData.warpmode ?? warpMode.value;
        }
        if (effect === "FIREWORK") {
            fwCountSlider.value = effectData.fwcount ?? fwCountSlider.value;
            fwCountValue.textContent = fwCountSlider.value;
            fwSpeedSlider.value = effectData.fwspeed ?? fwSpeedSlider.value;
            fwSpeedValue.textContent = fwSpeedSlider.value;
            fwFadeSpeedSlider.value = effectData.fwfadespeed ?? fwFadeSpeedSlider.value;
            fwFadeSpeedValue.textContent = fwFadeSpeedSlider.value;
            fwTwinkleSlider.value = effectData.fwtwinkle ?? fwTwinkleSlider.value;
            fwTwinkleValue.textContent = fwTwinkleSlider.value;
            fwCometSlider.value = effectData.fwcomet ?? fwCometSlider.value;
            fwCometValue.textContent = fwCometSlider.value;
            fwBurstSlider.value = effectData.fwburst ?? fwBurstSlider.value;
            fwBurstValue.textContent = fwBurstSlider.value;
        }
        if (effect === "AURORA") {
            auPalette.value = effectData.aupalette ?? auPalette.value;
            auTimeSlider.value = effectData.autime ?? auTimeSlider.value;
            auTimeValue.textContent = auTimeSlider.value;
            auSpeedSlider.value = effectData.auspeed ?? auSpeedSlider.value;
            auSpeedValue.textContent = auSpeedSlider.value;
            auScaleSlider.value = effectData.auscale ?? auScaleSlider.value;
            auScaleValue.textContent = auScaleSlider.value;
            auYoffsetSlider.value = effectData.auyoffset ?? auYoffsetSlider.value;
            auYoffsetValue.textContent = auYoffsetSlider.value;
            brightnessAuSlider.value = effectData.aubright ?? brightnessAuSlider.value;
            brightnessAuValue.textContent = brightnessAuSlider.value;
        }
        if (effect === "CONFETTI") {
            confDensitySlider.value = effectData.confdensity ?? confDensitySlider.value;
            confDensityValue.textContent = confDensitySlider.value;
            confSpeedSlider.value = effectData.confspeed ?? confSpeedSlider.value;
            confSpeedValue.textContent = confSpeedSlider.value;
            confFadeSlider.value = effectData.conffade ?? confFadeSlider.value;
            confFadeValue.textContent = confFadeSlider.value;
            confSatSlider.value = effectData.confsat ?? confSatSlider.value;
            confSatValue.textContent = confSatSlider.value;
            brightnessConfSlider.value = effectData.confbright ?? brightnessConfSlider.value;
            brightnessConfValue.textContent = brightnessConfSlider.value;
        }
        if (effect === "SNAKE") {
            snakeLengthModeSlider.value = effectData.snlengthmode ?? snakeLengthModeSlider.value;
            snakeLengthModeValue.textContent = snakeLengthModeSlider.value;
            brightnessSnakeSlider.value = effectData.snbrightness ?? brightnessSnakeSlider.value;
            brightnessSnakeValue.textContent = brightnessSnakeSlider.value;
            snakeTargetsSlider.value = effectData.sntargetcount ?? snakeTargetsSlider.value;
            snakeTargetsValue.textContent = snakeTargetsSlider.value;
        }
    }

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
            try { wsEffect.send("getstate"); } catch (e) {}
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
